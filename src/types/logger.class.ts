// logger.class.ts
import { LoggerOptions } from './interfaces/logger.interface';
import fs from 'fs';
import path from 'path';
import util from 'util';
import { Color, Level } from './enums/logger.enum';

export default class Logger {
  private currentLogFileName: string = "";
  private nextSaveTime: number = 0;

  constructor(private options: LoggerOptions) {
    this.options.logDirectory = path.resolve(this.options.logDirectory);
    fs.mkdirSync(this.options.logDirectory, { recursive: true });
    this.calculateNextSaveTime();
  }

  public log = (...message: any[]) => this.output(Level.LOG, Color.WHITE, message);
  public debug = (...message: any[]) => this.output(Level.DEBUG, Color.GREEN, message);
  public info = (...message: any[]) => this.output(Level.INFO, Color.GREEN, message);
  public warn = (...message: any[]) => this.output(Level.WARN, Color.YELLOW, message);
  public error = (...message: any[]) => this.output(Level.ERROR, Color.RED, message);

  private output(level: Level, color: string, message: any[]) {
    const formattedMessage = message.map(item =>
      typeof item === 'object' ? util.inspect(item, { depth: null, colors: this.options.colorizeObjects }) : item
    ).join(' ');

    this.logToFile(level, formattedMessage); // Log to file without colors
    console.log(`${this.getCurrentTime()}${color} [${level}]`, formattedMessage, Color.WHITE);
  }

  private getCurrentTime(): string {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const offsetHours = String(Math.abs(offset / 60)).padStart(2, "0");
    const offsetMinutes = String(Math.abs(offset % 60)).padStart(2, "0");
    return `${Color.GRAY}[${offset < 0 ? "+" : "-"}${offsetHours}:${offsetMinutes} ${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString()}]\x1b[0m`;
  }

  private calculateNextSaveTime() {
    const now = Date.now();
    const intervalMs = this.options.saveIntervalHours ? this.options.saveIntervalHours * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    this.nextSaveTime = now + intervalMs;
  }

  private logToFile(level: Level, message: string) {
    const now = Date.now();
    if (now >= this.nextSaveTime || !this.currentLogFileName) {
      this.calculateNextSaveTime();
      this.currentLogFileName = path.join(this.options.logDirectory, `${new Date(now).toISOString().replace(/[:.]/g, "-").slice(0, 13)}.log`);
    }

    fs.appendFileSync(this.currentLogFileName, `${this.getCurrentTime().replace(/\x1b\[[0-9;]*m/g, "")} [${level}] ${message}\n`);
  }
}