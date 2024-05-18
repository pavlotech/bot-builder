// ./example.scene.ts
import ModuleBuilder, { Module } from '../types/module.class';

export default new ModuleBuilder('scene_test', (module: Module) => {
  module.logger.log(module.scene)
  module.scene?.enter(async (ctx) => { 
    await ctx.reply('scene test')
  });
  module.scene?.leave(async (ctx) => {
    await ctx.reply('scene leave')
  });
  module.scene?.on('text', async (ctx) => {
    await ctx.reply(ctx.message.text)
    ctx.scene.leave()
  });
  module.bot.command('scene', async (ctx) => {
    await ctx.scene.enter('scene_test')
  })
  return module;
});