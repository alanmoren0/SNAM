import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {SMAMLocalize} from '../components/smam-localize.js';

import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import '../components/smam-connector.js';
import '../components/smam-email.js';
import '../components/smam-dialog.js';

class MainView extends SMAMLocalize {
  static get template() {
    return html`
      <style include="global">
        :host {
          display: block;
          padding: 10px;
          --iron-icon-fill-color: var(--paper-teal-700);
        }

        .chart {
          height: 500px;
        }
      </style>

      <app-localstorage-document
        id="storage"
        key="user-session"
        data="{{user}}"
        session-only="true">
      </app-localstorage-document>

      <div class="card-size">
        <div class="horizontal">
          <div class="vertical flex">
            <div class="vertical w-100 center-v">
              <div class="horizontal start">
                <spam class="main-title-dashboard">{{ localize('MONITOR', 'type', 'title') }}</spam>
              </div>
            </div>
          </div>
          <div class="vertical flex">
            <div class="vertical w-100 center-v">
              <div class="horizontal end">
              <paper-icon-button
                icon="{{icon}}"
                on-tap="_stopUpdate">
              </paper-icon-button>
                <paper-icon-button
                  icon="icons:help"
                  on-tap="_showHelp">
                </paper-icon-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <spam class="main-title-section-dashboard">{{ localize('TEMPERATURE', 'type', 'title') }}</spam>
        <div id="temperature" class="chart"></div>
      </div>

      <div class="card" hidden$="[[!showChartPreasure]]">
        <spam class="main-title-section-dashboard">{{ localize('PREASURE', 'type', 'title') }}</spam>
        <div id="preasure" class="chart"></div>
      </div>

      <div class="card" hidden$="[[!showChartRitmhyc]]">
        <spam class="main-title-section-dashboard">{{ localize('RHYTHM', 'type', 'title') }}</spam>
        <div id="rhythm" class="chart"></div>
      </div>

      <div class="card-size">
        <div class="horizontal">
          <div class="vertical flex">
            <div class="vertical w-100 center-v">
              <div class="horizontal start">
                <!--
                <paper-toggle-button>{{ localize('ENABLE_DEMO', 'type', 'title') }}</paper-toggle-button>
                -->
              </div>
            </div>
          </div>
          <div class="vertical flex">
            <div class="vertical w-100 center-v">
              <div class="horizontal end">
                <paper-button on-tap='_clear'>{{ localize('START_AGAIN', 'type', 'title') }}</paper-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <smam-connector id="connector"></smam-connector>
      <smam-email-notifier id="email"></smam-email-notifier>
      <paper-toast id="toast"></paper-toast>
      <smam-dialog id="dialog"></smam-dialog>
    `;
  }

  static get properties(){
    return {
      chartItems: {
        type: Array,
        value: []
      },
      chartTemp: {
        type: Array,
        value: []
      },
      chartRhythm: {
        type: Array,
        value: []
      },
      chartPreasure: {
        type: Array,
        value: []
      },
      user: Object,
      titleDate: String,
      titleTemperature: String,
      titlePreasure: String,
      titleRhythm: String,
      titleValue: String,
      titleRole: {
        type: String,
        value: '',
        notify: true
      },
      timeOut: Object,
      showChartPreasure: Boolean,
      showChartRitmhyc: Boolean,
      alerts: {
        type: Number,
        value: 0,
        observer: '_alertNotification'
      },
      icon: {
        type: String,
        value: 'icons:cloud-download'
      }
    };
  }

  ready(){
    super.ready();
    this.$.connector.addEventListener('data-received', e => this._handleDataRequest(e));
    this._loadLabels();
    this._defineAccess();
    this._generateGraphics();
  }

  _loadLabels(){
    this.async(function(){
      this.titleDate = this.localize('DATE', 'type', 'title');
      this.titleTemperature = this.localize('TEMPERATURE', 'type', 'title');
      this.titlePreasure = this.localize('PREASURE', 'type', 'title');
      this.titleRhythm = this.localize('RHYTHM', 'type', 'title');
      this.titleValue = this.localize('VALUE', 'type', 'title');
      this.titleRole = this.localize(this.user.role, 'type', 'title');
    }.bind(this), 100);
  }

  _defineAccess(){
    this.showChartPreasure = ['DOCTOR','NURSE'].indexOf(this.user.role) > -1;
    this.showChartRitmhyc = ['DOCTOR', 'SPECIALIST'].indexOf(this.user.role) > -1;
  }

  _getData(){
    this.$.connector.getTemperatureMessages();
  }

  _handleDataRequest(event){
    let dataReceived = event.detail;
    let data = _.map(dataReceived, (n) => this._formatData(n));
    let action = event.detail.action;
    switch(action){
      case 'getTemperatureMessages':
        this._loadDataTemperature(data, 'chartTemp');
        if(['DOCTOR','NURSE'].indexOf(this.user.role) > -1){
          this.$.connector.getPreasureMessages();
        } else {
          this.$.connector.getRhythmMessages();
        }
        break;
      case 'getPreasureMessages':
        this._loadDataPreasure(data, 'chartPreasure');
        if(['DOCTOR'].indexOf(this.user.role) > -1){
          this.$.connector.getRhythmMessages();
        }
        break;
      case 'getRhythmMessages':
        this._loadDataRhythm(data, 'chartRhythm');
        break;
    }
  }

  _loadDataTemperature(data, property){
    this._loadData(data, property);
    if(data.length > 0){
      this._initChartTemp();
    }
  }

  _loadDataPreasure(data, property){
    this._loadData(data, property);
    if(data.length > 0){
      this._initChartPreasure();
    }
  }

  _loadDataRhythm(data, property){
    this._loadData(data, property);
    if(data.length > 0){
      this._initChartRhythm();
    }
  }

  _loadData(data, property){
    for(let i = 0; i < data.length; i++){
      this.push(property, {
        value: data[i]['value'],
        date: new Date(data[i]['date'])
      });
      switch(property){
        case 'chartTemp':
          this._filterValue(data[i]['value'], 69);
          break;
        case 'chartPreasure':
          this._filterValue(data[i]['value'], 110);
          break;
        case 'chartRhythm':
          this._filterValue(data[i]['value'], 110);
          break;
      }
    }
  }

  _filterValue(value, maxValue){
    if(parseFloat(value) > maxValue){
      this.alerts += 1;
    }
  }

  _formatData(data){
    let payload = data.payload;
    let cleanPayload = payload.replace(/\'/g,'"');
    let jsonPayload = JSON.parse(cleanPayload);
    return jsonPayload;
  }

  _generateGraphics() {
    this.chartTemp = [];
    this.chartPreasure = [];
    this.chartRhythm = [];
    
    this._initChartTemp();
    this._initChartPreasure();
    this._initChartRhythm();
  }

  _initChartTemp(){
    let chart = am4core.create(this.$.temperature, am4charts.XYChart);
    chart.data = this.chartTemp;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.title.text = this.titleDate;

    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.dateFormats.setKey("second", "ss");
    dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
    dateAxis.renderer.inside = true;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = this.titleValue;
    valueAxis.tooltip.disabled = true;
    valueAxis.interpolationDuration = 500;
    valueAxis.rangeChangeDuration = 500;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.minLabelPosition = 0.05;
    valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    
    // Create series
    let temperatureSeries = chart.series.push(new am4charts.LineSeries());
    temperatureSeries.dataFields.valueY = "value";
    temperatureSeries.dataFields.dateX = "date";
    temperatureSeries.tooltipText = "{value}";
    temperatureSeries.name = this.titleTemperature;
    temperatureSeries.strokeWidth = 3;
    temperatureSeries.tooltip.pointerOrientation = "vertical";
    
    chart.cursor = new am4charts.XYCursor();
    
    chart.scrollbarX = new am4core.Scrollbar();
    chart.legend = new am4charts.Legend();
  }

  _initChartPreasure(){
    let chart = am4core.create(this.$.preasure, am4charts.XYChart);
    chart.data = this.chartPreasure;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.title.text = this.titleDate;

    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.dateFormats.setKey("second", "ss");
    dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
    dateAxis.renderer.inside = true;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = this.titleValue;
    valueAxis.tooltip.disabled = true;
    valueAxis.interpolationDuration = 500;
    valueAxis.rangeChangeDuration = 500;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.minLabelPosition = 0.05;
    valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    
    // Create series
    let preasureSeries = chart.series.push(new am4charts.LineSeries());
    preasureSeries.dataFields.valueY = "value";
    preasureSeries.dataFields.dateX = "date";
    preasureSeries.tooltipText = "{value}";
    preasureSeries.name = this.titlePreasure;
    preasureSeries.strokeWidth = 3;
    preasureSeries.tooltip.pointerOrientation = "vertical";
    
    chart.cursor = new am4charts.XYCursor();
    
    chart.scrollbarX = new am4core.Scrollbar();
    chart.legend = new am4charts.Legend();
  }

  _initChartRhythm(){
    let chart = am4core.create(this.$.rhythm, am4charts.XYChart);
    chart.data = this.chartRhythm;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.title.text = this.titleDate;

    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.dateFormats.setKey("second", "ss");
    dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
    dateAxis.renderer.inside = true;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = this.titleValue;
    valueAxis.tooltip.disabled = true;
    valueAxis.interpolationDuration = 500;
    valueAxis.rangeChangeDuration = 500;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.minLabelPosition = 0.05;
    valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    
    // Create series
    let rhythmSeries = chart.series.push(new am4charts.LineSeries());
    rhythmSeries.dataFields.valueY = "value";
    rhythmSeries.dataFields.dateX = "date";
    rhythmSeries.tooltipText = "{value}";
    rhythmSeries.name = this.titleRhythm;
    rhythmSeries.strokeWidth = 3;
    rhythmSeries.tooltip.pointerOrientation = "vertical";
    
    chart.cursor = new am4charts.XYCursor();
    
    chart.scrollbarX = new am4core.Scrollbar();
    chart.legend = new am4charts.Legend();
  }

  _clear(){
    clearInterval(this.timeOut);
    this.$.storage.destroy();
    window.location.href = `${this.rootPath}`;
  }

  _alertNotification(value){
    if(value >= 30){
      this.alerts = 0;
      this.async(function(){
        let subject = this.localize('SUBJECT', 'type', 'title');
        let from = 'SMAM <noreply@apadilla.page>';
        let to = this.user.email;
        let data = {
          title: this.localize('TITLE_NOTIFICATION', 'type', 'title'),
          message: this.localize('MESSAGE_NOTIFICATION', 'type', 'title'),
          rights: this.localize('RIGHTS', 'type', 'title')
        }
        this.$.email.sendNotification(subject, from, to, data);
        this._showToast('MESSAGE_TOAST');
      }.bind(this), 100);
    }
  }

  _showHelp(){
    this.async(function(){
      let t = this.localize('HELP_TITLE', 'type', 'title');
      let m = this.localize('HELP_MESSAGE', 'type', 'title');
      this.$.dialog.title = t;
      this.$.dialog.message = m;
      this.$.dialog.open();
    }, 100);
  }

  _stopUpdate(){
    if (this.icon === 'icons:cloud-off') {
      clearInterval(this.timeOut);
      this.icon = 'icons:cloud-download';
      this._showToast('DISCONNECTED');
    } else {
      this.icon = 'icons:cloud-off';
      this.timeOut = setInterval(this._getData.bind(this), 30000);
      this._showToast('CONNECTED');
    }
  }

  _showToast(message){
    this.async(function(){
      this.$.toast.text = this.localize(message, 'type', 'title');
      this.$.toast.open();
    }, 100);
  }

}

window.customElements.define('main-view', MainView);
