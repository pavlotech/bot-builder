export default class Logger {
  private static getCurrentTime (): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `\x1b[90m[${hours}:${minutes}:${seconds}]\x1b[0m`; // Серый цвет для времени
  }
  private static message (level: string, message: any, color: string) {
    console.log(`${Logger.getCurrentTime()}${color} [${level}]`, message, '\x1b[37m');
  }
  public log (...message: any[]) {
    message.map(m => {
      Logger.message('LOG', m, '\x1b[37m'); // Белый цвет для LOG      
    })
  }
  public debug (...message: any[]) {
    message.map(m => {
      Logger.message('DEBUG', m, '\x1b[32m'); // Зеленый цвет для DEBUG
    })
  }
  public info (...message: any[]) {
    message.map(m => {
      Logger.message('INFO', m, '\x1b[32m'); // Зеленый цвет для INFO
    })
  }
  public warn (...message: any[]) {
    message.map(m => {
      Logger.message('WARN', m, '\x1b[33m'); // Желтый цвет для WARN
    })
  }
  public error (...error: any[]) {
    error.map(e => {
      Logger.message('ERROR', e, '\x1b[31m');
    })
  }
}