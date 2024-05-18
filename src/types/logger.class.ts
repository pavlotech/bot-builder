import fs from 'fs';
import path from 'path';

enum Level {
  LOG = 'LOG',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}
enum Color {
  WHITE = '\x1b[37m',
  GREEN = '\x1b[32m',
  YELLOW = '\x1b[33m',
  RED = '\x1b[31m',
}
interface LoggerOptions {
  logDirectory: string;
  saveIntervalHours?: number;
}

export default class Logger {
  private static cachedTimestamp: { timeString: string; expires: number } = {
    timeString: "",
    expires: 0,
  };
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
    this.logToFile(level, ...message);
    console.log(`${Logger.getCurrentTime()}${color} [${level}]`, message.join(' '), '\x1b[37m');
  }
  private static getCurrentTime(): string {
    const now = new Date();
    if (this.cachedTimestamp.expires > now.getTime()) {
      return this.cachedTimestamp.timeString;
    }
    const offset = now.getTimezoneOffset();
    const offsetHours = String(Math.abs(offset / 60)).padStart(2, "0");
    const offsetMinutes = String(Math.abs(offset % 60)).padStart(2, "0");
    const timeString = `\x1b[90m[${
      offset < 0 ? "+" : "-"
    }${offsetHours}:${offsetMinutes} ${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString()}]\x1b[0m`;

    this.cachedTimestamp = { timeString, expires: now.getTime() + 1000 };
    return timeString;
  }
  private calculateNextSaveTime() {
    const now = Date.now();
    const intervalMs =
      this.options.saveIntervalHours !== undefined
        ? this.options.saveIntervalHours * 60 * 60 * 1000
        : 24; // Если saveIntervalHours не задан, интервал равен 0 (нет ротации)
    this.nextSaveTime = now + intervalMs;
  }
  private logToFile(level: Level, ...message: any[]) {
    const now = Date.now();

    if (now >= this.nextSaveTime || this.currentLogFileName === "") {
      this.calculateNextSaveTime();
      this.currentLogFileName = path.join(
        this.options.logDirectory,
        `${new Date(now).toISOString().replace(/[:.]/g, "-").slice(0, 13)}.log`
      );
    }
    const logEntry = `${this.getCurrentTimeWithoutColor()} [${level}] ${message.join(" ")}\n`;
    try {
      fs.appendFileSync(this.currentLogFileName, logEntry);
    } catch (error) {
      this.error("Error logging to file:", error);
    }
  }
  private getCurrentTimeWithoutColor(): string {
    return Logger.getCurrentTime().replace(/\x1b\[[0-9;]*m/g, "");
  }
}