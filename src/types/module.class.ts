// ./Module.ts
import App from "../../index";
import Logger from "./logger.class";
import { PrismaClient } from "@prisma/client";
import { ConfigService } from "../config/config.service";
import { IBotContext } from "../context/context.interface";
import { CommandEvent, SceneEvent } from "./events.class";

export class ModuleBuilder { // Exporting the class instead of an instance
  constructor(
    public readonly name: string,
    public readonly build: (module: Module) => Module | Promise<Module>
  ) {}
}

export class Module {
  public prisma: PrismaClient;
  public config: ConfigService;
  public ctx!: IBotContext;

  constructor(
    public app: App,
    public logger: Logger,
    private events: (CommandEvent | SceneEvent)[]
  ) {
    this.prisma = new PrismaClient();
    this.config = new ConfigService();
  }

  public addEvent(...event: (CommandEvent | SceneEvent)[]) {
    this.events.push(...event);
  }

  public getEvents(): (CommandEvent | SceneEvent)[] {
    return this.events;
  }
}
