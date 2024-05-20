// ./example.module.ts
import ModuleBuilder, { Module } from '../types/module.class';

export default new ModuleBuilder('translate', (module: Module) => {
  module.bot.start(async (ctx) => {
    const locale = await module.locale.get('translate', ctx.from.language_code)
    await ctx.reply(locale.reply)
  })
  module.bot.command('translate', async (ctx) => {
    await ctx.scene.enter('translate');
  })
  return module;
});