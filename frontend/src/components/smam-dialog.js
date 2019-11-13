import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-dialog/paper-dialog.js';

import {SMAMLocalize} from './smam-localize.js';

class SMAMDialog extends SMAMLocalize {
  static get template() {
    return html`
      <style>
        .horizontal {
            @apply --layout-horizontal;
        }
        
        .center {
            @apply --layout-center-justified;
        }
        
        .vertical {
            @apply --layout-vertical;
        }
        
        .center-v {
            margin: auto;
        }
        
        .start {
            @apply --layout-start-justified;
        }
        
        .end {
            @apply --layout-end-justified;
        }
        
        .wrap {
            white-space: normal;
        }
        
        .flex {
            @apply --layout-flex;
        }
            
        .margin-10 {
            margin: 10px;
        }
        
        .m-top {
            margin-top: 15px;
        }
            
        .normal {
            background-color: var(--paper-teal-700);
            padding: 5px 20px;
            border-radius: 10px;
            color: var(--paper-grey-50);
            cursor: pointer;
        }
            
        .action {
            padding: 5px 20px;
            color: var(--paper-red-500);
            cursor: pointer;
        }
            
        .title {
            @apply --paper-font-headline;
            color: var(--paper-grey-900);
        }
        
        .subtitle {
            @apply --paper-font-common-base;
            @apply --paper-font-common-nowrap;
            font-size: 18px;
            font-weight: 550;
            line-height: 28px;
            color: var(--paper-grey-800);
        }
            
        .max-w {
            max-width: 600px;
        }
            
        .w-100 {
            width: 100%;
        }
        
        .w-150 {
            width: 150px;
        }
            
        .h-100 {
            height: 100%;
        }
        
        .description {
            @apply --paper-font-common-base;
            @apply --paper-font-common-nowrap;
            font-size: 20px;
            font-weight: 400;
            line-height: 28px;
            color: var(--paper-grey-900);
        }
        
        .about {
            @apply --paper-font-common-base;
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            color: var(--paper-grey-800);
        }
        
        .button-text {
            @apply --paper-font-body2;
            font-weight: bold;
        }
        
        paper-dialog {
            padding: 15px;
            border-radius: 10px;
        }
        
        .icon {
            width: 25px;
            height: 25px;
            margin-right: 15px;
        }
        
        .back {
            background: rgba(0, 0, 0, 0.5);;
            transform: translateZ(0);
            position: fixed;
            width: 100%;
            z-index: 80;
            height: 100%;
            top: 0;
            left: 0;
        }
            
        .no-visible {
            display: none;
        }
      </style>
      
      <div class$="back {{clazz}}">
      </div>
      
      <paper-dialog id="dialog" no-cancel-on-outside-click no-cancel-on-esc-key>
        <div class="horizontal">

          <div class="vertical flex">
            <div class="horizontal start">
              <span class="title">[[title]]</span>
            </div>
          </div>
        </div>
        <div class="horizontal max-w">
          <span class="about wrap">[[message]]</span>
        </div>
        <div class="horizontal center m-top">
          <div 
            on-click="_close"
            class="normal">
            <span class="button-text">
              {{ localize('DIALOG_ACCEPT', 'type', 'title') }}
            </span>
          </div>
        </div>
      </paper-dialog>
    `;
  }
  
  static get properties() {
    return {
      title: {
        type: String,
        value: 'Título'
      },
      message: {
        type: String,
        value: 'Mensaje'
      },
      clazz: {
        type: String,
        value: "no-visible"
      }
    };
  }
  
  open(){
    this.clazz = "";
    this.$.dialog.open();
  }
  
  _close(){
    this.clazz = "no-visible";
    this.$.dialog.close();
  }
  
  _launchCustomEvent(type, data){
    this.dispatchEvent(new CustomEvent(type, {detail: data, bubbles: true, composed: true}));
  }
}

window.customElements.define('smam-dialog', SMAMDialog);