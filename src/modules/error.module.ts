// ./error.module.ts
import ModuleBuilder, { Module } from '../types/module.class';

export default new ModuleBuilder('error', (module: Module) => {
  module.bot.catch(async (error, ctx) => {
    module.logger.error(error);
  });
  return module;
});