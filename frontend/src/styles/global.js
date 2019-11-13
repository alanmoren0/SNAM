import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/paper-styles.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="global">
  <template>
    <style>
    
      a {
        text-decoration: none;
        font-size: inherit;
        color: var(--paper-grey-50);
      }
        
      .toolbar {
        @apply --layout-horizontal;
        @apply --layout-end-justified;
        background-color: var(--paper-teal-700);
      }
      
      .tabs {
        height: 100%;
        @apply --layout-horizontal;
      }
      
      .tabs > a {
        @apply --layout-vertical;
        @apply --layout-center-center;
        margin: 12px 16px 12px;
        border-bottom: 1px solid var(--paper-grey-50);
      }
      
      .header {
        @apply --layout-vertical;
        @apply --layout-center-center;
        height: 100vh;
        padding: 0 16px;
        background-image: url('https://i.imgur.com/WBujYwZ.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        color: white;
        text-align: left;
      }
      
      .container {
        @apply --layout-horizontal;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .container > * {
        @apply --layout-flex;
      }
      
      .container img {
        max-width: 100%;
        max-height: 100%;
      }
      
      .container h3 {
        font-size: 32px;
        font-weight: 300;
        margin: 24px 0;
      }
      
      .container p {
        line-height: 1.5;
      }
      
      @media (max-width: 600px) {
        .container {
          @apply --layout-vertical;
        }
      }
      
      .main-title {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;
        font-size: 80px;
        font-weight: 500;
        letter-spacing: -.030em;
        line-height: 70px;
      
        color: var(--paper-grey-50);
      }
      
      .main-title-dashboard {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;
        font-size: 40px;
        font-weight: 400;
        letter-spacing: -.026em;
        line-height: 60px;
        color: var(--paper-teal-700);
      }

      .main-title-section-dashboard {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;
        font-size: 30px;
        font-weight: 300;
        letter-spacing: -.026em;
        line-height: 60px;
        color: var(--paper-grey-900);
      }
      
      .main-description {
        @apply --paper-font-body2;
        color: var(--paper-grey-50);
      }

      .main-description-dashboard {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;
        font-size: 18px;
        font-weight: 450;
        letter-spacing: -.026em;
        line-height: 60px;
        color: var(--paper-grey-900);
      }
        
      .main-wrap {
        white-space: normal;
      }
      
      .max-w {
        max-width: 400px;
        margin: 15px 0px 0px 0px;
      }
      
      .card {
        margin: 24px;
        padding: 16px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      .card-size {
        margin: 24px;
        padding: 16px;
      }
      
      .horizontal {
        @apply --layout-horizontal;
      }
      
      .vertical {
        @apply --layout-vertical;
      }
      
      .start {
        @apply --layout-start-justified;
      }
      
      .end {
        @apply --layout-end-justified;
      }
      
      .center {
        @apply --layout-center-justified;
      }

      .center-v {
        margin: auto;
      }
      
      .flex {
        @apply --layout-flex;
      }
      
      .wrap {
        @apply --layout-wrap;
      }
      
      .title {
        @apply --paper-font-title;
        color: var(--paper-grey-900);
      }
      
      paper-button {
        background: var(--paper-teal-700);
        color: var(--paper-grey-50);
      }
      
      .m-bottom {
        margin: 15px 0px;
      }

      .w-100 {
        width: 100%;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);