"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv_1 = require("dotenv");
class ConfigService {
    constructor() {
        const { error, parsed } = (0, dotenv_1.config)();
        if (error)
            throw new Error('Не найден файл .env');
        if (!parsed)
            throw new Error('Пустой файл .env');
        this.config = parsed;
    }
    get(key) {
        const res = this.config[key];
        if (!res)
            throw new Error('Нет такого ключа');
        return res;
    }
}
exports.ConfigService = ConfigService;
