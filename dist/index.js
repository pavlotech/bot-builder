"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const telegraf_1 = require("telegraf");
const logger_class_1 = __importDefault(require("./src/types/logger.class"));
const config_service_1 = require("./src/config/config.service");
const events_class_1 = require("./src/types/events.class");
const module_class_1 = require("./src/types/module.class");
class App {
    constructor() {
        this.logger = new logger_class_1.default();
        this.config = new config_service_1.ConfigService();
        this.bot = new telegraf_1.Telegraf(this.config.get('TOKEN'));
        this.modules = [];
        this.main();
    }
    importModules(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fs_1.default.promises.readdir(dir);
            const modules = [];
            for (const file of files) {
                if (file.endsWith(".js")) { // Импортируем .js файлы напрямую (скомпилированный вывод)
                    const modulePath = path_1.default.join(dir, file);
                    try {
                        // Динамический импорт с использованием import() для лучшей обработки путей
                        const importedModule = yield Promise.resolve(`${modulePath}`).then(s => __importStar(require(s)));
                        if (importedModule.default instanceof module_class_1.ModuleBuilder) {
                            modules.push(importedModule.default);
                            this.logger.info(`module loaded: ${modulePath}`);
                        }
                    }
                    catch (err) {
                        this.logger.error(`module import error ${modulePath}:`, err);
                    }
                }
            }
            this.logger.info(`loaded ${modules.length} modules from ${dir}`);
            return modules;
        });
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            const moduleBuilders = yield this.importModules(path_1.default.join(__dirname, 'src', 'modules'));
            for (const moduleBuilder of moduleBuilders) {
                const telegramModule = new module_class_1.Module(this, this.logger, []);
                yield moduleBuilder.build(telegramModule); // Вызываем метод build у экземпляра moduleBuilder
                this.modules.push(telegramModule);
                // Добавление обработчиков команд и сцен
                for (const event of telegramModule.getEvents()) {
                    if (event instanceof events_class_1.CommandEvent) {
                        this.bot.command(event.command, event.handler);
                    }
                }
            }
            this.bot.launch();
            this.logger.info('bot started');
        });
    }
}
exports.default = App;
new App();
