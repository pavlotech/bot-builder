import { Scenes, Telegraf } from "telegraf";
import { IBotContext } from "../../context/context.interface";
import { IConfigService } from "../../config/config.interface";
import Logger from "../logger.class";
import App from "../../..";

export interface ModuleOptions {
  app: App
  bot: Telegraf<IBotContext>;
  config: IConfigService
  logger: Logger;
  scene?: Scenes.BaseScene<IBotContext>;
}