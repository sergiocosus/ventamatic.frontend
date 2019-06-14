import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { includes } from 'lodash';
//import enUS from '../../../assets/i18n/en-US.json';
import esMX from '../../../assets/i18n/es-MX.json';
import { LocalStorageService } from '@app/api/services/local-storage.service';

const languageKey = 'language';

/**
 * Pass-through function to mark a string for translation extraction.
 * Running `npm translations:extract` will include the given string by using this.
 * @param {string} s The string to extract for translation.
 * @return {string} The same string.
 */
export function extract(s: string) {
  return s;
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  defaultLanguage: string;
  supportedLanguages: string[];

  constructor(private translateService: TranslateService,
              private localStorageService: LocalStorageService) {
    // Embed languages to avoid extra HTTP requests
    // translateService.setTranslation('en-US', enUS);
    translateService.setTranslation('es-MX', esMX);
  }

  /**
   * Gets the current language.
   * @return {string} The current language code.
   */
  get language(): string {
    return this.translateService.currentLang;
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param {string} language The IETF language code to set.
   */
  set language(language: string) {
    language = language || this.localStorageService.get(languageKey);
    const isSupportedLanguage = includes(this.supportedLanguages, language);

    // Fallback if language is not supported
    if (!isSupportedLanguage) {
      language = this.defaultLanguage;
    }

    this.translateService.use(language);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param {!string} defaultLanguage The default language to use.
   * @param {Array.<String>} supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.translateService.setDefaultLang('en-US');
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.language = null;

    this.translateService.onLangChange
      .subscribe((event: LangChangeEvent) => {
        console.error(event);
        this.localStorageService.set(languageKey, event.lang);
      });
  }

}
