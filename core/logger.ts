export class Logger {
  private static instance: Logger;
  private debugMode = false;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setDebugMode(mode: boolean) {
    this.debugMode = mode;
  }

  public info(message: string, ...args: any[]) {
    if (this.debugMode) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  public warn(message: string, ...args: any[]) {
    if (this.debugMode) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  public error(message: string, ...args: any[]) {
    console.error(`[ERROR] ${message}`, ...args);
  }
}
