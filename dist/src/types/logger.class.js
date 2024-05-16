"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `\x1b[90m[${hours}:${minutes}:${seconds}]\x1b[0m`; // Серый цвет для времени
    }
    static message(level, message, color) {
        console.log(`${Logger.getCurrentTime()}${color} [${level}]`, message, '\x1b[37m');
    }
    log(...message) {
        message.map(m => {
            Logger.message('LOG', m, '\x1b[37m'); // Белый цвет для LOG      
        });
    }
    debug(...message) {
        message.map(m => {
            Logger.message('DEBUG', m, '\x1b[32m'); // Зеленый цвет для DEBUG
        });
    }
    info(...message) {
        message.map(m => {
            Logger.message('INFO', m, '\x1b[32m'); // Зеленый цвет для INFO
        });
    }
    warn(...message) {
        message.map(m => {
            Logger.message('WARN', m, '\x1b[33m'); // Желтый цвет для WARN
        });
    }
    error(...error) {
        error.map(e => {
            Logger.message('ERROR', e, '\x1b[31m');
        });
    }
}
exports.default = Logger;
