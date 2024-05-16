"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// ./example.module.ts
const events_class_1 = require("../types/events.class");
const module_class_1 = require("../types/module.class"); // Import the ModuleBuilder class
exports.default = new module_class_1.ModuleBuilder("example", (module) => {
    module.addEvent(new events_class_1.CommandEvent("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.reply("Hello, world!");
    })));
    return module;
});
