import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

class SMAMEmailNotifier extends PolymerElement {
    static get template() {
        return html `
        <iron-ajax id="emailAjax"
            method="POST"
            content-type="application/json"
            url="https://naht-redn-dev.cloud.tyk.io/smam-email-notification"
            on-response="_handleEmailResponse">
        </iron-ajax>
        `
    }

    sendNotification(subject, from, to, data) {
        this.$.emailAjax.body = {
            "subject": subject,
            "from": from,
            "to": to,
            "data": data
        }
        this.$.emailAjax.generateRequest();
    }

    _handleEmailResponse() {
        this.dispatchEvent(new CustomEvent('email-sent', {bubbles: true, composed: true}));
    }
}

window.customElements.define('smam-email-notifier', SMAMEmailNotifier);