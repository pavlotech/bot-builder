"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneEvent = exports.CommandEvent = void 0;
const ModuleEvent_1 = __importDefault(require("./ModuleEvent"));
class CommandEvent extends ModuleEvent_1.default {
    constructor(command, handler) {
        super("telegram");
        this.command = command;
        this.handler = handler;
    }
}
exports.CommandEvent = CommandEvent;
class SceneEvent extends ModuleEvent_1.default {
    constructor(scene, handler) {
        super("telegram");
        this.scene = scene;
        this.handler = handler;
    }
}
exports.SceneEvent = SceneEvent;
