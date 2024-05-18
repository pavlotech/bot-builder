// ./example.module.ts
import ModuleBuilder, { Module } from '../types/module.class';

export default new ModuleBuilder('example', (module: Module) => {
  module.bot.start(async (ctx) => {  
    await ctx.reply('start')
    module.logger.log(ctx.from.id)
    throw new Error('test error')
  })
  return module;
});