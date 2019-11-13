import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {AppLocalizeBehavior} from '@polymer/app-localize-behavior/app-localize-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js'
import {} from '@polymer/polymer/lib/utils/resolve-url.js';

export class SMAMLocalize extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
  
  static get properties() {
    return {
      language: { 
        type: String,
        value: function() {
          let languageCode = navigator.language || navigator.userLanguage;
          let language = languageCode.split('-')[0];
      
          if (language !== 'es' && language !== 'en') {
            return 'en';
          }
          return language;
        }
      }
    };
  }
  
  ready() {
    super.ready();
    let loadResource = this.loadResources(this.resolveUrl(`${this.rootPath}src/locales.json`));
    if (loadResource === undefined) {
      this.loadResources(this.resolveUrl('/src/locales.json'));
    }
  }
}