import { IBotContext } from './src/context/context.interface';
import fs from "fs";
import path from "path";
import { Scenes, Telegraf, session } from "telegraf";
import Logger from "./src/types/logger.class";
import { ConfigService } from "./src/config/config.service";
import ModuleBuilder, { Module } from './src/types/module.class';
import { IConfigService } from './src/config/config.interface';

export default class App {
  private logger: Logger;
  private bot: Telegraf<IBotContext>;

  private async importModules(dir: string): Promise<ModuleBuilder[]> {
    const files = (await fs.promises.readdir(dir)).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
    const modules: ModuleBuilder[] = [];

    for (const file of files) {
      const modulePath = path.join(dir, file);
      try {
        const { default: importedModule } = await import(modulePath); 
        if (importedModule instanceof ModuleBuilder) {
          modules.push(importedModule);
          this.logger.info(`module '${importedModule.name}' loaded from ${file}`);
        }
      } catch (error) {
        this.logger.error(`module import error ${file}:`, error);
      }
    }
    return modules;
  }
  private async main() {
    const scenes: Scenes.BaseScene<IBotContext>[] = []; // Правильный тип для массива сцен
    const moduleBuilders = await this.importModules(path.join(__dirname, 'src', 'modules'));
    this.logger.log(JSON.stringify(moduleBuilders, null, 2));
 
    for (const moduleBuilder of moduleBuilders) {
      const scene = new Scenes.BaseScene<IBotContext>(moduleBuilder.name);
      const module = new Module(this, this.bot, this.logger, [], scene);

      await moduleBuilder.build(module);
      scenes.push(scene); // Добавляем scene, а не module
    }
    const stage = new Scenes.Stage<IBotContext>(scenes, { ttl: 10 * 60 * 1000 });
    this.bot.use(session()); // Middleware session должен идти до stage
    this.bot.use(stage.middleware());

    const launchOptions: Telegraf.LaunchOptions = {};
    this.bot.launch(launchOptions, async () => {
      this.logger.info('bot started successfully');
    }).catch((error) => this.logger.error(error))
  }

  constructor(private readonly config: IConfigService) {
    this.logger = new Logger({
      logDirectory: 'logs',
      saveIntervalHours: 1
    });
    this.config = new ConfigService();
    this.bot = new Telegraf<IBotContext>(this.config.get('TOKEN'), {
      handlerTimeout: 60 * 60 * 1000
    });
    this.main();
  }
}
new App(new ConfigService());