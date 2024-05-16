"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneEvent = exports.CommandEvent = void 0;
class ModuleEvent {
    constructor(type) {
        this.type = type;
    }
}
exports.default = ModuleEvent;
class CommandEvent extends ModuleEvent {
    constructor(command, handler) {
        super("telegram");
        this.command = command;
        this.handler = handler;
    }
}
exports.CommandEvent = CommandEvent;
class SceneEvent extends ModuleEvent {
    constructor(scene, handler) {
        super("telegram");
        this.scene = scene;
        this.handler = handler;
    }
}
exports.SceneEvent = SceneEvent;
