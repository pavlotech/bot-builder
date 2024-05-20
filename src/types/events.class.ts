export class ModuleEvent {
  constructor(public readonly type: string, public readonly handler: (ctx: any) => void | Promise<void>) {}
}