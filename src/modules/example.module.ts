// ./example.module.ts
import { SceneEvent, CommandEvent } from "../types/events.class";
import { ModuleBuilder, Module } from "../types/module.class"; // Import the ModuleBuilder class

export default new ModuleBuilder("example", (module: Module) => {
  module.addEvent(
    new CommandEvent("start", async (ctx) => {
      await ctx.reply("Hello, world!");
    })
  );
  return module;
});