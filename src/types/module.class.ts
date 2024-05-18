import App from "../../index";
import Logger from "./logger.class";
import { PrismaClient } from "@prisma/client";
import { ConfigService } from "../config/config.service";
import { ModuleEvent } from "./events.class";
import { IBotContext } from "../context/context.interface";
import { Scenes, Telegraf } from "telegraf";

export default class ModuleBuilder {
  constructor(
    public readonly name: string,
    public readonly build: (module: Module) => Module | Promise<Module>
  ) {}
}

export class Module {
  public prisma: PrismaClient;
  public config: ConfigService;

  public addEvent(...event: ModuleEvent[]) { this.events.push(...event) }
  public getEvents() { return this.events }
  
  constructor(
    public app: App,
    public bot: Telegraf<IBotContext>,
    public logger: Logger,
    private events: ModuleEvent[],
    public scene?: Scenes.BaseScene<IBotContext>
  ) {
    this.prisma = new PrismaClient();
    this.config = new ConfigService();
  }
}
