"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = exports.ModuleBuilder = void 0;
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
class ModuleBuilder {
    constructor(name, build) {
        this.name = name;
        this.build = build;
    }
}
exports.ModuleBuilder = ModuleBuilder;
class Module {
    constructor(app, logger, events) {
        this.app = app;
        this.logger = logger;
        this.events = events;
        this.prisma = new client_1.PrismaClient();
        this.config = new config_service_1.ConfigService();
    }
    addEvent(...event) {
        this.events.push(...event);
    }
    getEvents() {
        return this.events;
    }
}
exports.Module = Module;
