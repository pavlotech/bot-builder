// app.ts
import tgconfig from './../tgconfig';
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
    const sceneModuleBuilders = await this.importModules(path.join(__dirname, 'modules', 'scenes'));
    const moduleBuilders = await this.importModules(path.join(__dirname, 'modules'));

    const scenes = await this.buildScenes(sceneModuleBuilders);
    const stage = new Scenes.Stage<IBotContext>(scenes, tgconfig.stage);
    
    this.bot.use(session());
    this.bot.use(stage.middleware());
    this.bot.telegram.setMyCommands(tgconfig.commands);
    
    await this.buildModules(moduleBuilders);

    const launchOptions: Telegraf.LaunchOptions = {
      // launch options
    };
    this.bot.launch(launchOptions, () => this.logger.info('bot started successfully'))
      .catch(error => this.logger.error(error));
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
  private async importModules(dir: string): Promise<ModuleBuilder[]> {
    const files = (await fs.promises.readdir(dir)).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
    const modules: ModuleBuilder[] = [];

    for (const file of files) {
      const modulePath = path.join(dir, file);
      const { default: importedModule } = await import(modulePath);
      if (importedModule instanceof ModuleBuilder) {
        modules.push(importedModule);
        this.logger.info(`module '${importedModule.name}' loaded from ${file}`);
      }
    }
    return modules;
  }
}