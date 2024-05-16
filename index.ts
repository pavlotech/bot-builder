import { IBotContext } from './src/context/context.interface';
import fs from "fs";
import path from "path";
import { Scenes, Telegraf } from "telegraf";
import Logger from "./src/types/logger.class";
import { ConfigService } from "./src/config/config.service";
import { CommandEvent, SceneEvent } from './src/types/events.class';
import { ModuleBuilder, Module } from './src/types/module.class';

export default class App {
  private logger: Logger;
  private config: ConfigService;
  private bot: Telegraf<IBotContext>;
  private modules: Module[];

  constructor() {
    this.logger = new Logger();
    this.config = new ConfigService();
    this.bot = new Telegraf(this.config.get('TOKEN'));
    this.modules = [];

    this.main();
  }

  private async importModules(dir: string): Promise<ModuleBuilder[]> {
    const files = await fs.promises.readdir(dir);
    const modules: ModuleBuilder[] = [];

    for (const file of files) {
      if (file.endsWith(".js")) { // Импортируем .js файлы напрямую (скомпилированный вывод)
        const modulePath = path.join(dir, file);
        try {
          // Динамический импорт с использованием import() для лучшей обработки путей
          const importedModule = await import(modulePath); 
          if (importedModule.default instanceof ModuleBuilder) {
            modules.push(importedModule.default);
            this.logger.info(`module loaded: ${modulePath}`);
          }
        } catch (err) {
          this.logger.error(`module import error ${modulePath}:`, err);
        }
      }
    }
    this.logger.info(`loaded ${modules.length} modules from ${dir}`);
    return modules;
  }
  async main() {
    const moduleBuilders = await this.importModules(path.join(__dirname, 'src', 'modules'));
    for (const moduleBuilder of moduleBuilders) {
      const telegramModule = new Module(this, this.logger, []); 
      await moduleBuilder.build(telegramModule); // Вызываем метод build у экземпляра moduleBuilder
      this.modules.push(telegramModule);

      // Добавление обработчиков команд и сцен
      for (const event of telegramModule.getEvents()) {
        if (event instanceof CommandEvent) {
          this.bot.command(event.command, event.handler);
        }
      }
    }
    this.bot.launch()
    this.logger.info('bot started')
  }
}
new App();