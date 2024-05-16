import { IBotContext } from "../context/context.interface";

export default class ModuleEvent {
  constructor (public readonly type: string) {}
}

export class CommandEvent extends ModuleEvent {
  public readonly command: string;
  public readonly handler: (ctx: IBotContext) => void | Promise<void>;

  constructor(command: string, handler: (ctx: IBotContext) => void | Promise<void>) {
    super("telegram");
    this.command = command;
    this.handler = handler;
  }
}

export class SceneEvent extends ModuleEvent {
  public readonly scene: string;
  public readonly handler: (ctx: IBotContext) => void | Promise<void>;

  constructor(scene: string, handler: (ctx: IBotContext) => void | Promise<void>) {
    super("telegram");
    this.scene = scene;
    this.handler = handler;
  }
}