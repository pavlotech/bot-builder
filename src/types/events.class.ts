import { IBotContext } from "../context/context.interface";

export class ModuleEvent {
  constructor(public readonly type: string, public readonly handler: (ctx: any) => void | Promise<void>) {}
}
export class CommandEvent extends ModuleEvent {
  constructor(public readonly name: string, handler: CommandEvent["handler"]) {
    super("telegram", handler);
  }
}
export class ActionEvent extends ModuleEvent {
  constructor(public readonly name: string, handler: ActionEvent["handler"]) {
    super("telegram", handler);
  }
}
export class HearsEvent extends ModuleEvent {
  constructor(public readonly name: string, handler: HearsEvent["handler"]) {
    super("telegram", handler);
  }
}
export class TelegramEvent extends ModuleEvent {
  constructor(public readonly name: string, handler: TelegramEvent["handler"]) {
    super("telegram", handler);
  }
}
export class SceneEvent extends ModuleEvent {
  constructor(public readonly name: string, handler: SceneEvent["handler"]) {
    super("telegram", handler);
  }
}