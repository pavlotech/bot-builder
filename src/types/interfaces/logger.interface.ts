// logger.interface.ts
export interface LoggerOptions {
  logDirectory: string;
  saveIntervalHours?: number;
  colorizeObjects: boolean 
}
export interface CachedTimestamp {
  timeString: string;
  expires: number
}