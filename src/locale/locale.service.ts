import path from 'path';
import fs from "fs";
import { LocaleData } from './locale.interface';
import { translate } from 'bing-translate-api';

export class Locale {
  private cache: Map<string, LocaleData> = new Map();
  private localeDir: string = path.join(__dirname, 'lang');

  constructor(localeDir?: string) {
    this.localeDir = localeDir ?? this.localeDir;
  }
  public async get(key: string, lang: string = 'en') {
    const localeData = this.cache.get(lang) ?? await this.loadLocale(lang);
    return localeData[key] ?? localeData
  }
  public async translate(text: string, lang: string) {
    try {
      const translation = await translate(text, null, lang)
      return translation?.translation || text;
    } catch (error) {
      throw new Error(`Translate error: ${error}`)
    }
  }
  private async loadLocale(lang: string) {
    const supportedLanguages = (await fs.promises.readdir(this.localeDir))
      .map(file => file.split('.')[0]);

    lang = supportedLanguages.includes(lang) ? lang : 'en';

    const modulePath = path.join(this.localeDir, (await fs.promises.readdir(this.localeDir)).find(file => file.startsWith(lang))!);

    const { default: localeData } = await import(modulePath);
    this.cache.set(lang, localeData);
    return localeData;
  }
}