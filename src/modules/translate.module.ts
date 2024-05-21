// translate.module.ts
import ModuleBuilder, { Module } from '../types/module.class';

export default new ModuleBuilder('translate', (module: Module) => {
  module.bot.command('translate', async (ctx) => {
    await ctx.scene.enter('translate');
  })
  return module;
});