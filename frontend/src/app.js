/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';

import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import 'underscore/underscore-min.js';

import './styles/global.js';

setPassiveTouchGestures(true);

setRootPath(MyAppGlobals.rootPath);

class SMAMApp extends PolymerElement {
  static get template() {
    return html`
    <style include="global">
      :host {
        --app-primary-color: var(--paper-red-900);
        --primary-color: var(--paper-red-900);
        --app-secondary-color: var(--paper-grey-900);

        display: block;
      }

      .main {
      --primary-color: var(--paper-blue-700);
        height: 100vh;
      }
    </style>
    
    <app-localstorage-document
      id="storage"
      key="user-session"
      data="{{user}}"
      session-only="true">
    </app-localstorage-document>

    <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
    </app-location>

    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
    </app-route>

    <div class="main">
      <iron-pages 
        selected="[[page]]" 
        attr-for-selected="name" 
        role="main" 
        class="h-100">
        
        <main-view
          id="mainApp"
          name="web"
          user="{{user}}">
        </main-view>
        
        <login-view 
          id="loginView"
          name="login"
          class="h-100">
        </login-view>

      </iron-pages>
    </div>
    `;
  }

  ready() {
    super.ready();
    this._checkUser();
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      user: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _checkUser(){
    this.$.storage.getStoredValue('user-session').then((result) => {
      if(!_.isEmpty(this.user)){
        this.page = 'web';
      } else {
        this.page = 'login';
      }
    });
  }

  _routePageChanged(page) {
    if (page !== "" && page !== undefined && page !== null) {
      this.page = page;
    }
  }

  _pageChanged(page) {
    switch (page) {
      case 'login':
        import('./pages/login.js');
        break;
      case 'web':
        import('./pages/main.js');
        break;
    }
  }
}

window.customElements.define('smam-app', SMAMApp);