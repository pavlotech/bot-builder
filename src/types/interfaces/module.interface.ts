// module.interface.ts

import { Scenes, Telegraf } from "telegraf";
import { IBotContext } from "../../context/context.interface";
import { IConfigService } from "../../config/config.interface";
import Logger from "../logger.class";
import App from "../../app";

export interface ModuleOptions {
  app: App
  bot: Telegraf<IBotContext>;
  config: IConfigService
  logger: Logger;
  scene?: Scenes.BaseScene<IBotContext>;
}