// app.ts
import config from '../config';
import { IBotContext } from './context/context.interface';
import fs from "fs";
import path from "path";
import { Scenes, Telegraf, session } from "telegraf";
import Logger from "./types/logger.class";
import ModuleBuilder, { Module } from './types/module.class';
import { IConfigService } from './config/config.interface';
import { PrismaClient } from '@prisma/client';

export default class App {
  private readonly logger: Logger;
  private readonly bot: Telegraf<IBotContext>;
  public readonly prisma: PrismaClient;

  constructor(private readonly config: IConfigService) {
    this.prisma = new PrismaClient()
    this.logger = new Logger({
      logDirectory: 'logs',
      saveIntervalHours: 1,
      colorizeObjects: true
    });
    this.bot = new Telegraf<IBotContext>(this.config.get('TOKEN'), {
      handlerTimeout: 60 * 60 * 1000
    });
    this.main();
  }
  private async main() {
    const [sceneModuleBuilders, moduleBuilders] = await Promise.all([
      this.importModules('scene'),
      this.importModules('module')
    ]);

    const scenes = await this.buildScenes(sceneModuleBuilders);
    const stage = new Scenes.Stage<IBotContext>(scenes, config.stage);

    this.bot.use(session());
    this.bot.use(stage.middleware());
    this.bot.telegram.setMyCommands(config.commands);

    const launchOptions: Telegraf.LaunchOptions = {
      // launch options
    };
    await Promise.all([
      this.buildModules(moduleBuilders),
      this.bot.launch(launchOptions, () => this.logger.info(`${this.bot.botInfo?.username} started successfully`)),
    ]);
  }
  private async buildScenes(sceneModuleBuilders: ModuleBuilder[]) {
    return Promise.all(sceneModuleBuilders.map(async builder => {
      const scene = new Scenes.BaseScene<IBotContext>(builder.name);
      await builder.build(this.createModule(scene));
      return scene;
    }));
  }
  private async buildModules(moduleBuilders: ModuleBuilder[]) {
    return Promise.all(moduleBuilders.map(builder => builder.build(this.createModule())));
  }
  private createModule(scene?: Scenes.BaseScene<IBotContext>) {
    return new Module({
      app: this,
      config: this.config,
      bot: this.bot,
      logger: this.logger,
      scene
    });
  }
  private async importModules(keyword: string): Promise<ModuleBuilder[]> {
    const modules: ModuleBuilder[] = [];
    const searchPattern = new RegExp(`.*${keyword}.*\\.(js|ts)$`);
    const dirsToExplore: string[] = [path.join(__dirname, 'modules')];

    for (const currentDir of dirsToExplore) {
      try {
        const entries = await fs.promises.readdir(currentDir, { withFileTypes: true });
        const importPromises = entries.map(async (entry) => {
          const fullPath = path.join(currentDir, entry.name);
          if (entry.isFile() && entry.name.match(searchPattern)) {
            try {
              const { default: importedModule } = await import(fullPath);
              if (importedModule instanceof ModuleBuilder) {
                modules.push(importedModule);
                this.logger.info(`Module '${importedModule.name}' loaded from ${fullPath}`);
              }
            } catch (error) {
              this.logger.error(`Error loading module from ${fullPath}:`, error);
            }
          } else if (entry.isDirectory()) {
            dirsToExplore.push(fullPath);
          }
        });
        await Promise.all(importPromises);
      } catch (error) {
        this.logger.error(`Error reading directory ${currentDir}:`, error);
      }
    }
    return modules;
  }
}