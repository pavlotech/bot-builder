// index.ts
import { commands } from './commands.config';
import { IBotContext } from './src/context/context.interface';
import fs from "fs";
import path from "path";
import { Scenes, Telegraf, session } from "telegraf";
import Logger from "./src/types/logger.class";
import { ConfigService } from "./src/config/config.service";
import ModuleBuilder, { Module } from './src/types/module.class';
import { IConfigService } from './src/config/config.interface';
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
    const sceneModuleBuilders = await this.importModules(path.join(__dirname, 'src', 'modules', 'scenes'));
    const scenes: Scenes.BaseScene<IBotContext>[] = [];

    for (const moduleBuilder of sceneModuleBuilders) {
      const scene = new Scenes.BaseScene<IBotContext>(moduleBuilder.name);
      const module = new Module({
        app: this,
        config: this.config,
        bot: this.bot,
        logger: this.logger,
        scene: scene
      });
      moduleBuilder.build(module);
      if (module.scene) {
        scenes.push(module.scene);
      }
    }

    this.bot.use(session());
    const stage = new Scenes.Stage<IBotContext>(scenes, { ttl: 10 * 60 * 1000 });
    this.bot.use(stage.middleware());
    this.bot.telegram.setMyCommands(commands)

    const moduleBuilders = await this.importModules(path.join(__dirname, 'src', 'modules'));
    for (const moduleBuilder of moduleBuilders) {
      const module = new Module({
        app: this,
        config: this.config,
        bot: this.bot,
        logger: this.logger,
      });
      moduleBuilder.build(module);
    }

    const launchOptions: Telegraf.LaunchOptions = {};
    this.bot.launch(launchOptions, async () => {
      this.logger.info('bot started successfully');
    }).catch((error) => this.logger.error(error))
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
new App(new ConfigService());