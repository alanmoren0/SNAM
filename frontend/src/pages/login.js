import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {SMAMLocalize} from '../components/smam-localize.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import '@vaadin/vaadin-dropdown-menu/theme/material/vaadin-dropdown-menu.js';

import 'underscore/underscore-min.js';

import '../components/smam-dialog.js';

class LoginView extends SMAMLocalize {
  static get template() {
    return html`
    <style include="global">
      :host {
        display: block;
        --material-secondary-text-color: var(--paper-teal-700);
        --material-primary-color: var(--paper-teal-700);
        --material-primary-contrast-color: var(--paper-teal-700);
        --material-primary-text-color: var(--paper-teal-700);
      }
      
      paper-input {
        margin: 10px 0px;
        --paper-input-container-focus-color: var(--paper-teal-700);
        --paper-input-container-label-focus-color: var(--paper-teal-700);
        
        --paper-input-container-label: {
          color: var(--paper-teal-700);
        };
        
        --paper-input-container: { 
          padding: 10px;
          background: var(--paper-grey-50);
          border-radius: 5px;
        };
        
        --paper-input-container-underline: { 
          background: var(--paper-teal-700);
        };
        
        --paper-input-container-underline-focus: { 
          background: var(--paper-teal-700);
        };
        
        --paper-input-container-input: {
          color: var(--paper-grey-900);
        };
        
        --paper-input-container-label-floating: {
          color: var(--paper-teal-700);
        };
        
        --paper-input-container-input-invalid: {
          color: var(--paper-teal-700);
        };
      }

      .menu {
        background: var(--paper-grey-50);
        border-radius: 5px;
        padding: 0px 13px 0px 13px;
        margin-bottom: 10px;
      }

    </style>
    
    <app-localstorage-document
      id="storage"
      key="user-session"
      data="{{user}}"
      session-only="true">
    </app-localstorage-document>

    <div class="header">
      
        <span class="main-title">
          {{ localize('SMAM', 'type', 'title') }}
        </span>
        
        <paper-input
          id="email"
          type="email"
          label="{{ localize('EMAIL', 'type', 'title') }}"
          placeholder="{{ localize('EXAMPLE_EMAIL', 'type', 'title') }}"
          value="{{email}}"
          required>
        </paper-input>
        
        <vaadin-dropdown-menu 
          id="rol"
          class="menu"
          label="[[ localize('ROLE', 'type', 'title') ]]" 
          placeholder="[[ localize('SELECT_ROLE', 'type', 'title') ]]" 
          value="{{role}}" >
          <template>
            <vaadin-list-box>
              <vaadin-item value="NURSE">
                <div class="horizontal center">
                  <span class="caption">[[ localize('NURSE', 'type', 'title') ]]</span>
                </div>
              </vaadin-item>
              <vaadin-item value="SPECIALIST">
                <div class="horizontal center">
                  <span class="caption">[[ localize('SPECIALIST', 'type', 'title') ]]</span>
                </div>
              </vaadin-item>
              <vaadin-item value="DOCTOR">
                <div class="horizontal center">
                  <span class="caption">[[ localize('DOCTOR', 'type', 'title') ]]</span>
                </div>
              </vaadin-item>
            </vaadin-list-box>
          </template>
        </vaadin-dropdown-menu>
        
        <paper-button
          on-tap="_login">
          {{ localize('LOGIN_BUTTON', 'type', 'title') }}
        </paper-button>
        
        <div class="max-w">
          <span class="main-description main-wrap">
            {{ localize('MAIN_DESCRIPTION', 'type', 'title') }}
          </span>
        </div>
      </div>

      <smam-dialog id="dialog"></smam-dialog>
    `;
  }

  static get properties(){
    return {
      icon: {
        type: String,
        value: 'icons:visibility'
      },
      email: {
        type: String,
        value: ''
      },
      role: {
        type: String,
        value: 'DOCTOR'
      },
      user: Object
    };
  }

  ready(){
    super.ready();
    this._showAlert('TITLE_DIALOG', 'MESSAGE_DIALOG');
  }

  _login(){
    if(this.role !== '' && this.email !== ''){
      if(this.$.email.validate()){
        //this._showLoading("LOADING_DIALOG");
        this._saveCredentials();
      }
    } else {
      this._showAlert("ERROR_TITLE", "EMPTY_EMAIL");
    }
  }

  _saveCredentials(){
    this.user = {
      email: this.email,
      role: this.role
    };
    this.$.storage.saveValue('user-session');
    window.location.href = `${this.rootPath}web`;
  }

  _showAlert(title, message){
    this.async(function(){
      let t = this.localize(title, 'type', 'title');
      let m = this.localize(message, 'type', 'title');
      this.$.dialog.title = t;
      this.$.dialog.message = m;
      this.$.dialog.open();
    }, 200);
  }
}

window.customElements.define('login-view', LoginView);