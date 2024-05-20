// start.module.ts
import ModuleBuilder, { Module } from '../types/module.class';

export default new ModuleBuilder('start', (module: Module) => {
  module.bot.start(async (ctx) => {
    const locale = await module.locale.get('start', ctx.from.language_code)
    await ctx.reply(locale.reply, {
      parse_mode: 'Markdown'
    })
  })
  return module;
});