import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

class SMAMConnector extends PolymerElement {
    static get template() {
        return html `
        <iron-ajax id="createRequest"
            method="PUT"
            content-type="application/json"
            headers="{{authHeaders}}"
            url="https://naht-redn-dev.cloud.tyk.io/smam-notifications"
            on-response="_handleCreateRequest">
        </iron-ajax>
        `;
    }

    static get properties() {
        return {
            baseUrl: {
                type: String,
                value: "https://naht-redn-dev.cloud.tyk.io/smam-notifications", 
            },
            user: {
                type: String,
                value: 'oevvxuqp'
            },
            passwd: {
                type: String,
                value: 'D6vn6A9ErigVUrxOINL-ok-vdD610S_I'
            },
            authHeaders: {
                type: String,
                computed: '_computeHeaders(user, passwd)'
            },
            action: String
        };
    }

    getTemperatureMessages(){
        this.action = 'getTemperatureMessages';
        this._getMessages('temperature');
    }

    getPreasureMessages(){
        this.action = 'getPreasureMessages';
        this._getMessages('preasure');
    }

    getRhythmMessages(){
        this.action = 'getRhythmMessages';
        this._getMessages('rhythm');
    }

    _getMessages(queue){
        let url = `${this.baseUrl}/queues/${this.user}/${queue}/get`;
        
        this.$.createRequest.url = url;
        this.$.createRequest.method = "POST";
        this.$.createRequest.body = {
            "count": 1000,
            "requeue": false,
            "encoding": "auto"
        }
        
        this.$.createRequest.generateRequest();
    }

    publishToTemperature(data) {
        this.action = 'publishToTemperature';
        this._publish('temperature', data, 'temperature');
    }

    publishToPreasure(data) {
        this.action = 'publishToPreasure';
        this._publish('preasure', data, 'preasure');
    }

    publishToRhythm(data) {
        this.action = 'publishToRhythm';
        this._publish('rhythm', data, 'rhythm');
    }

    _publish(exchange, data, routing){
        let url = `${this.baseUrl}/exchanges/${this.user}/${exchange}/publish`;
        
        this.$.createRequest.url = url;
        this.$.createRequest.method = "POST";
        this.$.createRequest.body = {
            "properties":{
                "durable": true,
                "delivery_mode": 2,
                "headers": {}
            },
            "routing_key": routing,
            "payload": JSON.stringify(data),
            "payload_encoding": "string",
            "routed": true
        }
        
        this.$.createRequest.generateRequest();
    }

    _handleCreateRequest(event) {
        let data = event.detail.response || {};
        data['action'] = this.action;
        this.dispatchEvent(new CustomEvent('data-received', {bubbles: true, composed: true, detail: data}));
    }

    _computeHeaders(user, passwd) {
        return {"Authorization": "Basic " + window.btoa(user + ":" + passwd)};
    }

}

window.customElements.define('smam-connector', SMAMConnector);