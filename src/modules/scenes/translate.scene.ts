// ./example.scene.ts
import ModuleBuilder, { Module } from '../../types/module.class';

export default new ModuleBuilder('translate', (module: Module) => {
  module.scene?.enter(async (ctx) => {
    const locale = await module.locale.get('scene', ctx.from?.language_code)
    const inlineKeyboard = [
      [{ text: 'ru', callback_data: 'ru' }],
      [{ text: 'en', callback_data: 'en' }],
      [{ text: 'uk', callback_data: 'uk' }],
    ].filter(row => row[0].callback_data !== ctx.from?.language_code);
  
    await ctx.reply(locale.enter, {
      reply_markup: { inline_keyboard: inlineKeyboard },
      parse_mode: 'Markdown'
    });
  });
  module.scene?.leave(async (ctx) => {
    const locale = await module.locale.get('scene', ctx.from?.language_code)
    await ctx.reply(locale.leave, {
      parse_mode: 'Markdown'
    })
  });
  module.scene?.on('text', async (ctx) => {
    const lang = ctx.scene.session.state.lang
    await ctx.reply(await module.locale.translate(ctx.message.text, lang || 'en'), {
      parse_mode: 'Markdown'
    })
    ctx.scene.leave()
  });
  module.scene?.action(/^(ru|en|uk)$/, async (ctx) => {
    const locale = await module.locale.get('scene', ctx.from?.language_code)
    ctx.scene.session.state.lang = ctx.match[0];
    await ctx.reply(`${locale.lang} *${ctx.match[0].toLocaleUpperCase()}*`, {
      parse_mode: 'Markdown'
    })
  });
  return module;
});