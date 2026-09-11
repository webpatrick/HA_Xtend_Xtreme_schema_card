const XTEND_XTREME_I18N = {
  nl: {
    entities: "Entiteiten",
    labels: "Labels",
    colors: "Kleuren",
    indoor_temperature: "Binnen temp",
    xtreme_dhw_flowrate: "DHW flow",
    ch_flow: "CH flow",
    indoor_requested_temperature: "Verlangde temp",
    room_set_temperature: "Ruimte setpoint",
    outdoor_temperature: "Buiten temp",
    xtreme_supply_temperature: "Xtreme toevoer",
    xtreme_delta_t: "Xtreme ΔT",
    xtreme_return_temperature: "Xtreme retour",
    xtreme_active_check: "Xtreme actief",
    xtend_supply_temperature: "Xtend toevoer",
    xtend_delta_t: "Xtend ΔT",
    xtend_return_temperature: "Xtend retour",
    xtend_active_check: "Xtend actief",
    burner_active: "Brander actief",
    odu_gas_temperature: "ODU gas",
    odu_liquid_temperature: "ODU vloeistof",
    fan_speed: "Ventilator snelheid",
    indoorTitle: "Binnen titel",
    outdoorTitle: "Buiten titel",
    oduTitle: "ODU titel",
    xtremeTitle: "Xtreme titel",
    xtendTitle: "Xtend titel",
    heatDistributionLabel: "Warmte label",
    iconActive: "Actieve icoon",
    iconInactive: "Inactieve icoon",
    heatActive: "Actieve warmte",
    coolActive: "Actieve kou",
  },
  en: {
    entities: "Entities",
    labels: "Labels",
    colors: "Colors",
    indoor_temperature: "Indoor temp",
    xtreme_dhw_flowrate: "DHW flow",
    ch_flow: "CH flow",
    indoor_requested_temperature: "Requested temp",
    room_set_temperature: "Room setpoint",
    outdoor_temperature: "Outdoor temp",
    xtreme_supply_temperature: "Xtreme supply",
    xtreme_delta_t: "Xtreme ΔT",
    xtreme_return_temperature: "Xtreme return",
    xtreme_active_check: "Xtreme active",
    xtend_supply_temperature: "Xtend supply",
    xtend_delta_t: "Xtend ΔT",
    xtend_return_temperature: "Xtend return",
    xtend_active_check: "Xtend active",
    burner_active: "Burner active",
    odu_gas_temperature: "ODU gas",
    odu_liquid_temperature: "ODU liquid",
    fan_speed: "Fan speed",
    indoorTitle: "Indoor title",
    outdoorTitle: "Outdoor title",
    oduTitle: "ODU title",
    xtremeTitle: "Xtreme title",
    xtendTitle: "Xtend title",
    heatDistributionLabel: "Heat label",
    iconActive: "Active icon",
    iconInactive: "Inactive icon",
    heatActive: "Active heat",
    coolActive: "Active cool",
  },
};

class XtendXtremeSchemaCardEditor extends HTMLElement {
  constructor() {
    super();
    this._configChangeTimeout = null;
  }

  setConfig(config) {
    this._config = config || {};
    
    // Only render if shadowRoot doesn't exist yet
    if (!this.shadowRoot) {
      this._render();
    } else {
      // Update entity pickers if hass is available
      this._updateEntityPickers();
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._updateEntityPickers();
  }

  _getLocale() {
    const navigatorLocale = typeof navigator !== "undefined" ? navigator.language || navigator.languages?.[0] : "";
    const currentLocale = typeof document !== "undefined" ? (document.documentElement?.lang || "") : "";
    const locale = (navigatorLocale || currentLocale || "en").toLowerCase();
    return locale.startsWith("nl") ? "nl" : "en";
  }

  _t(key) {
    const locale = this._getLocale();
    const dictionary = XTEND_XTREME_I18N[locale] || XTEND_XTREME_I18N.en;
    return dictionary[key] || XTEND_XTREME_I18N.en[key] || key;
  }

  _render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    const config = this._config || {};
    
    // Apply defaults for labels and colors
    const defaultLabels = {
      indoorTitle: "Binnen",
      outdoorTitle: "Buiten",
      oduTitle: "ODU",
      xtremeTitle: "Xtreme",
      xtendTitle: "Xtend",
      heatDistributionLabel: "~ Warmteverdeelsysteem ~",
    };
    
    const defaultColors = {
      iconActive: "#f1c40f",
      iconInactive: "gray",
      heatActive: "#ff8c00",
      coolActive: "#3498db",
    };
    
    const entities = config.entities || {};
    const labels = { ...defaultLabels, ...config.labels };
    const colors = { ...defaultColors, ...config.colors };
    const t = (key) => this._t(key);

    const entityFields = [
      ["indoor_temperature", t("indoor_temperature")],
      ["xtreme_dhw_flowrate", t("xtreme_dhw_flowrate")],
      ["ch_flow", t("ch_flow")],
      ["indoor_requested_temperature", t("indoor_requested_temperature")],
      ["room_set_temperature", t("room_set_temperature")],
      ["outdoor_temperature", t("outdoor_temperature")],
      ["xtreme_supply_temperature", t("xtreme_supply_temperature")],
      ["xtreme_delta_t", t("xtreme_delta_t")],
      ["xtreme_return_temperature", t("xtreme_return_temperature")],
      ["xtreme_active_check", t("xtreme_active_check")],
      ["xtend_supply_temperature", t("xtend_supply_temperature")],
      ["xtend_delta_t", t("xtend_delta_t")],
      ["xtend_return_temperature", t("xtend_return_temperature")],
      ["xtend_active_check", t("xtend_active_check")],
      ["burner_active", t("burner_active")],
      ["odu_gas_temperature", t("odu_gas_temperature")],
      ["odu_liquid_temperature", t("odu_liquid_temperature")],
      ["fan_speed", t("fan_speed")],
    ];

    const labelFields = [
      ["indoorTitle", t("indoorTitle")],
      ["outdoorTitle", t("outdoorTitle")],
      ["oduTitle", t("oduTitle")],
      ["xtremeTitle", t("xtremeTitle")],
      ["xtendTitle", t("xtendTitle")],
      ["heatDistributionLabel", t("heatDistributionLabel")],
    ];

    const colorFields = [
      ["iconActive", t("iconActive")],
      ["iconInactive", t("iconInactive")],
      ["heatActive", t("heatActive")],
      ["coolActive", t("coolActive")],
    ];

    const renderEntityRows = (rows) => rows
      .map(([key, label]) => {
        return `
          <div class="row">
            <label>${label}</label>
            <ha-entity-picker 
              data-key="${key}"
              allow-custom-entity>
            </ha-entity-picker>
          </div>
        `;
      })
      .join("");

    const renderLabelRows = (rows) => rows
      .map(([key, label]) => {
        const value = labels[key] || "";
        return `
          <div class="row">
            <label>${label}</label>
            <input type="text" data-group="labels" data-key="${key}" value="${this._escape(value)}" />
          </div>
        `;
      })
      .join("");

    const renderColorRows = (rows) => rows
      .map(([key, label]) => {
        const value = colors[key] || "#000000";
        return `
          <div class="row">
            <label>${label}</label>
            <input type="color" data-group="colors" data-key="${key}" value="${this._escape(value)}" />
          </div>
        `;
      })
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          color: var(--primary-text-color);
          font-family: var(--paper-font-body1_-_font-family);
        }
        .section {
          border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
          overflow-x: auto;
        }
        .section h3 {
          margin: 0 0 12px;
          font-size: 1rem;
        }
        .row {
          display: grid;
          grid-template-columns: minmax(150px, 200px) 1fr;
          gap: 12px;
          align-items: center;
          margin-bottom: 12px;
        }
        label {
          font-size: 0.9rem;
          color: var(--primary-text-color);
          font-weight: 500;
          word-break: break-word;
        }
        input {
          width: 100%;
          box-sizing: border-box;
          padding: 8px 10px;
          border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
          border-radius: 4px;
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color);
          min-width: 0;
        }
        input[type="color"] {
          height: 40px;
          cursor: pointer;
        }
        ha-entity-picker {
          width: 100%;
          min-width: 0;
        }
      </style>

      <div class="section">
        <h3>${t("entities")}</h3>
        ${renderEntityRows(entityFields)}
      </div>
      <div class="section">
        <h3>${t("labels")}</h3>
        ${renderLabelRows(labelFields)}
      </div>
      <div class="section">
        <h3>${t("colors")}</h3>
        ${renderColorRows(colorFields)}
      </div>
    `;

    this._attachEventListeners();
    this._updateEntityPickers();
  }

  _updateEntityPickers() {
    if (!this._hass) return;
    
    const entityPickers = this.shadowRoot?.querySelectorAll("ha-entity-picker");
    if (!entityPickers) return;

    const config = this._config || {};
    const entities = config.entities || {};

    entityPickers.forEach((picker) => {
      picker.hass = this._hass;
      const key = picker.dataset.key;
      if (key && entities[key]) {
        picker.value = entities[key];
      }
    });
  }

  _attachEventListeners() {
    const entityPickers = this.shadowRoot.querySelectorAll("ha-entity-picker");
    entityPickers.forEach((picker) => {
      picker.addEventListener("value-changed", (e) => {
        this._scheduleConfigChanged();
      });
    });

    const inputs = this.shadowRoot.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._scheduleConfigChanged();
      });
    });
  }

  _scheduleConfigChanged() {
    if (this._configChangeTimeout) {
      clearTimeout(this._configChangeTimeout);
    }
    this._configChangeTimeout = setTimeout(() => {
      this._fireConfigChanged();
      this._configChangeTimeout = null;
    }, 300);
  }

  _fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this.getConfig() },
      bubbles: true,
      composed: true,
    }));
  }

  _escape(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  getConfig() {
    const config = {
      type: "custom:intergas-local-flow-card",
      entities: {},
      labels: {},
      colors: {},
    };

    const entityPickers = this.shadowRoot.querySelectorAll("ha-entity-picker");
    entityPickers.forEach((picker) => {
      const key = picker.dataset.key;
      const value = picker.value || "";
      if (key && value) {
        config.entities[key] = value;
      }
    });

    const labelInputs = this.shadowRoot.querySelectorAll("input[data-group='labels']");
    labelInputs.forEach((input) => {
      const key = input.dataset.key;
      const value = input.value.trim();
      if (key && value) {
        config.labels[key] = value;
      }
    });

    const colorInputs = this.shadowRoot.querySelectorAll("input[data-group='colors']");
    colorInputs.forEach((input) => {
      const key = input.dataset.key;
      const value = input.value.trim();
      if (key && value) {
        config.colors[key] = value;
      }
    });

    return config;
  }
}

class XtendXtremeSchemaCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("intergas-local-flow-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:intergas-local-flow-card",
    };
  }

  setConfig(config) {
    if (!config || typeof config !== "object") {
      throw new Error("Invalid configuration");
    }

    this._config = {
      colors: {
        iconActive: "#f1c40f",
        iconInactive: "var(--secondary-text-color)",
        heatActive: "#ff8c00",
        coolActive: "#3498db",
        ...config.colors,
      },
      labels: {
        indoorTitle: "Binnen",
        outdoorTitle: "Buiten",
        oduTitle: "ODU",
        xtremeTitle: "Xtreme",
        xtendTitle: "Xtend",
        heatDistributionLabel: "~ Warmteverdeelsysteem ~",
        ...config.labels,
      },
      entities: {
        indoor_temperature: "sensor.intergas_xtend_room_temperature",
        ch_flow: "sensor.intergas_xtend_f_system",
        indoor_flow: "sensor.intergas_xtend_f_system",
        indoor_requested_temperature: "sensor.intergas_xtend_requested_temperature",
        room_set_temperature: "sensor.intergas_xtend_room_temperature_set",
        outdoor_temperature: "sensor.intergas_xtend_outdoor_temperature",
        xtreme_supply_temperature: "sensor.intergas_xtreme_t_boiler_supply",
        xtreme_delta_t: "sensor.intergas_xtreme_delta_t",
        xtreme_return_temperature: "sensor.intergas_xtreme_t_boiler_return",
        xtreme_active_check: "binary_sensor.intergas_xtreme_active_check",
        xtreme_is_active: "binary_sensor.intergas_xtreme_is_active",
        xtreme_active: "binary_sensor.intergas_xtreme_active_check",
        xtreme_dhw_flowrate: "sensor.intergas_xtreme_boiler_ot_dhw_flowrate",
        xtend_supply_temperature: "sensor.intergas_xtend_t_heat_pump_supply",
        xtend_delta_t: "sensor.intergas_xtend_delta_t",
        xtend_return_temperature: "sensor.intergas_xtend_t_heat_pump_return",
        xtend_active_check: "binary_sensor.intergas_xtend_active_check",
        xtend_is_active: "binary_sensor.intergas_xtend_is_active",
        xtend_active: "binary_sensor.intergas_xtend_active_check",
        burner_active: "binary_sensor.boiler_burner",
        odu_gas_temperature: "sensor.intergas_xtend_temperature_condensor_refrigrerant_gas",
        odu_liquid_temperature: "sensor.intergas_xtend_temperature_condensor_refrigrerant_liquid",
        fan_speed: "sensor.intergas_xtend_actual_fan_speed",
        ...config.entities,
      },
    };

    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  getCardSize() {
    return 8;
  }

  _getState(entityId) {
    if (!this._hass || !entityId) return undefined;
    return this._hass.states[entityId];
  }

  _isOn(entityId) {
    return this._getState(entityId)?.state === "on";
  }

  _asNumber(entityId, fallback = 0) {
    const state = this._getState(entityId)?.state;
    const value = Number.parseFloat(state);
    return Number.isFinite(value) ? value : fallback;
  }

  _formatState(entityId, fallback = "—") {
    const state = this._getState(entityId);
    if (!state || ["unknown", "unavailable", "none"].includes(state.state)) {
      return fallback;
    }

    const num = Number.parseFloat(state.state);
    if (Number.isFinite(num)) {
      const fixed = Number.isInteger(num) ? `${num}` : `${num.toFixed(1)}`;
      const localized = fixed.replace(".", ",");
      return state.attributes.unit_of_measurement
        ? `${localized} ${state.attributes.unit_of_measurement}`
        : localized;
    }

    return state.state;
  }

  _openMoreInfo(entityId) {
    if (!entityId) return;
    const event = new Event("hass-more-info", {
      bubbles: true,
      composed: true,
    });
    event.detail = { entityId };
    this.dispatchEvent(event);
  }

  _setTapTarget(selector, entityId) {
    const el = this.content?.querySelector(selector);
    if (!el) return;

    if (!entityId) {
      el.onclick = null;
      el.style.cursor = "";
      el.style.pointerEvents = "";
      return;
    }

    el.style.cursor = "pointer";
    el.style.pointerEvents = "auto";
    el.onclick = () => this._openMoreInfo(entityId);
  }

  _setIconColor(iconEl, color) {
    iconEl.style.color = color;
    iconEl.style.setProperty("--paper-item-icon-color", color);
    iconEl.style.setProperty("--icon-primary-color", color);
    iconEl.style.fill = color;
  }

  _render() {
    if (this.content) return;

    this.innerHTML = `
      <ha-card>
        <div class="schema-wrap">
          <svg class="bg" viewBox="0 0 800 800" aria-hidden="true">
            <defs>
              <pattern id="diag" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(-45)">
                <line x1="0" y1="0" x2="0" y2="10" stroke="gray" stroke-width="15" opacity="0.1"></line>
              </pattern>
            </defs>
            <rect x="10" y="720" width="780" height="40" fill="url(#diag)"></rect>
            <rect x="580" y="15" width="40" height="705" fill="url(#diag)"></rect>
            <rect x="50" y="40" width="200" height="350" rx="20" fill="gray" opacity="0.1"></rect>
            <rect x="270" y="40" width="200" height="350" rx="20" fill="gray" opacity="0.1"></rect>
            <rect x="380" y="450" width="40" height="80" rx="20" fill="gray" opacity="0.1"></rect>
            <rect x="480" y="400" width="90" height="100" rx="20" fill="gray" opacity="0.1"></rect>
            <rect x="100" y="720" width="340" height="30" rx="20" fill="gray" opacity="0.1"></rect>
            <rect x="630" y="400" width="160" height="310" rx="20" fill="gray" opacity="0.1"></rect>
          </svg>

          <svg class="pipes" viewBox="0 0 800 800" aria-hidden="true">
            <path d="M190 390 v85 h190"></path>
            <path d="M380 505 h-260 v-115"></path>
            <path d="M155 390 v85 h-91 v30"></path>
            <path d="M400 390 v60"></path>
            <path d="M400 530 v190"></path>
            <path d="M330 720 v-330"></path>
            <path d="M470 190 h250 v210"></path>
            <path d="M470 215 h225 v185"></path>
          </svg>

          <svg id="flow-dhw" class="flow flow-dhw" viewBox="0 0 800 800" aria-hidden="true">
            <path d="M155 390 v85 h-91 v30"></path>
          </svg>

          <svg id="flow-xtreme" class="flow flow-main" viewBox="0 0 800 800" aria-hidden="true">
            <path d="M190 390 v85 h190"></path>
            <path d="M380 505 h-260 v-115"></path>
          </svg>

          <svg id="flow-xtend" class="flow flow-main" viewBox="0 0 800 800" aria-hidden="true">
            <path class="heat" d="M400 390 v60"></path>
            <path class="cool" d="M400 530 v190"></path>
            <path class="cool" d="M330 720 v-330"></path>
          </svg>

          <svg id="flow-fan" class="flow flow-fan" viewBox="0 0 800 800" aria-hidden="true">
            <path d="M470 190 h250 v210" class="forward"></path>
            <path d="M470 215 h225 v185" class="backward"></path>
          </svg>

          <div class="txt heat-label" id="heatLabel"></div>

          <div class="txt indoor-title" id="indoorTitle"></div>
          <div class="txt indoor-temp" id="indoorTemp"></div>
          <div class="txt dhw-flow" id="dhwFlow"></div>
          <div class="txt ch-flow" id="chFlow"></div>

          <div class="txt xtreme-title" id="xtremeTitle"></div>
          <div class="txt xtreme-supply value-hot" id="xtremeSupply"></div>
          <div class="txt xtreme-delta value-muted" id="xtremeDelta"></div>
          <div class="txt xtreme-return value-cold" id="xtremeReturn"></div>
          <ha-icon class="icon xtreme-icon" id="xtremeIcon"></ha-icon>
          <ha-icon class="icon shower-icon" id="showerIcon" icon="mdi:shower-head"></ha-icon>

          <div class="txt xtend-title" id="xtendTitle"></div>
          <div class="txt xtend-supply value-hot" id="xtendSupply"></div>
          <div class="txt xtend-delta value-muted" id="xtendDelta"></div>
          <div class="txt xtend-return value-cold" id="xtendReturn"></div>
          <ha-icon class="icon xtend-icon" id="xtendIcon"></ha-icon>

          <div class="txt room-set" id="roomSet"></div>
          <div class="txt room-adjust">− . +</div>
          <div class="txt req-temp" id="requestedTemp"></div>

          <div class="txt outdoor-title" id="outdoorTitle"></div>
          <div class="txt outdoor-temp" id="outdoorTemp"></div>

          <div class="txt odu-title" id="oduTitle"></div>
          <div class="txt odu-gas value-hot" id="oduGas"></div>
          <div class="txt odu-liquid value-cold" id="oduLiquid"></div>
          <div class="fan-icon-wrap" id="fanWrap">
            <svg class="fan-icon" id="fanIcon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z"></path>
            </svg>
          </div>
          <div class="txt fan-speed" id="fanSpeed"></div>
        </div>
      </ha-card>
    `;

    const style = document.createElement("style");
    style.textContent = `
      ha-card {
        border-radius: 12px;
        overflow: hidden;
      }
      .schema-wrap {
        position: relative;
        width: 100%;
        aspect-ratio: 1 / 1;
        background: var(--ha-card-background, var(--card-background-color));
        color: var(--primary-text-color);
        font-family: Roboto, Arial, sans-serif;
      }
      svg, .txt, .icon {
        position: absolute;
      }
      .bg, .pipes, .flow {
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .pipes path {
        fill: none;
        stroke: gray;
        stroke-width: 4;
        opacity: 0.2;
      }
      .flow {
        display: none;
      }
      .flow path {
        fill: none;
      }
      .flow-dhw path {
        stroke: #ff8c00;
        stroke-width: 4;
        stroke-dasharray: 4 6;
        animation: dash-backward 0.6s linear infinite;
      }
      .flow-main path {
        stroke-dasharray: 4 6;
        animation: dash-forward 1s linear infinite;
      }
      .flow-main path:nth-child(odd) {
        stroke: #3498db;
        stroke-width: 6;
      }
      .flow-main path:nth-child(even) {
        stroke: #ff8c00;
        stroke-width: 6;
      }
      .flow-main path.heat {
        stroke: #ff8c00 !important;
      }
      .flow-main path.cool {
        stroke: #3498db !important;
      }
      .flow-fan .forward {
        stroke: #3498db;
        stroke-width: 6;
        stroke-dasharray: 4 6;
        animation: dash-backward 1s linear infinite;
      }
      .flow-fan .backward {
        stroke: #ff8c00;
        stroke-width: 4;
        stroke-dasharray: 4 6;
        animation: dash-forward 1s linear infinite;
      }
      .txt {
        transform: translate(-50%, -50%);
        white-space: nowrap;
      }
      .value-hot {
        color: var(--xtx-heat-active, #ff8c00);
        font-weight: 700;
      }
      .value-cold {
        color: var(--xtx-cool-active, #3498db);
        font-weight: 700;
      }
      .value-muted {
        color: var(--secondary-text-color);
      }
      .heat-label { left: 35%; top: 92%; color: gray; opacity: 0.9; font-size: 0.7rem; }
      .indoor-title { left: 8%; top: 78%; font-size: 1rem; font-weight: 700; }
      .indoor-temp { left: 8%; top: 84%; font-size: 0.9rem; }
      .dhw-flow { left: 28%; top: 79.7%; color: var(--secondary-text-color); font-size: 0.8rem; display: none; }
      .ch-flow { left: 28%; top: 86%; color: var(--secondary-text-color); font-size: 0.8rem; display: none; }

      .xtreme-title { left: 19%; top: 10%; font-size: 1rem; font-weight: 700; }
      .xtreme-supply { left: 19%; top: 16%; font-size: 1rem; }
      .xtreme-delta { left: 19%; top: 25%; font-size: 1rem; }
      .xtreme-return { left: 19%; top: 34%; font-size: 1rem; }
      .xtreme-icon { left: 19%; top: 42%; color: var(--xtx-icon-inactive, var(--secondary-text-color)); }
      .shower-icon {
        left: 8.8%;
        top: 65%;
        width: 28px;
        height: 28px;
        color: var(--xtx-icon-inactive, var(--secondary-text-color));
        opacity: 0.50;
      }

      .xtend-title { left: 46%; top: 10%; font-size: 1rem; font-weight: 700; }
      .xtend-supply { left: 46%; top: 16%; font-size: 1rem; }
      .xtend-delta { left: 46%; top: 25%; font-size: 1rem; }
      .xtend-return { left: 46%; top: 34%; font-size: 1rem; }
      .xtend-icon { left: 46%; top: 42%; color: var(--xtx-icon-inactive, var(--secondary-text-color)); }
      .room-set { left: 66%; top: 54.5%; font-size: 0.8rem; }
      .room-adjust { left: 66%; top: 59%; font-size: 0.8rem; font-weight: 700; }
      .req-temp { left: 61%; top: 86%; color: var(--secondary-text-color); font-size: 0.8rem; display: none; }

      .outdoor-title { left: 89%; top: 5%; font-size: 1rem; font-weight: 700; }
      .outdoor-temp { left: 89%; top: 11%; font-size: 0.9rem; }
      .odu-title { left: 89%; top: 55%; font-size: 1rem; font-weight: 700; }
      .odu-gas { left: 89%; top: 61%; font-size: 1rem; }
      .odu-liquid { left: 89%; top: 70%; font-size: 1rem; }
      .fan-icon-wrap {
        position: absolute;
        left: 89%;
        top: 78%;
        width: 32px;
        height: 32px;
        transform: translate(-50%, -50%);
      }
      .fan-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 78%;
        height: 78%;
        display: block;
        transform: translate(-50%, -50%);
        transform-origin: 50% 50%;
        transform-box: border-box;
        line-height: 0;
        fill: currentColor;
      }
      .fan-speed { left: 89%; top: 86%; color: var(--secondary-text-color); font-size: 0.8rem; }

      .icon {
        width: 32px;
        height: 32px;
        transform: translate(-50%, -50%);
      }
      .pulse {
        animation: pulse 2s ease-in-out infinite;
      }
      .rotate {
        animation-name: spin;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      @keyframes pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.4); }
      }
      @keyframes spin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes dash-forward {
        from { stroke-dashoffset: 0; }
        to { stroke-dashoffset: 20; }
      }
      @keyframes dash-backward {
        from { stroke-dashoffset: 20; }
        to { stroke-dashoffset: 0; }
      }
    `;

    this.appendChild(style);
    this.content = this.querySelector(".schema-wrap");
  }

  _update() {
    if (!this._hass || !this._config || !this.content) return;

    const entities = this._config.entities;
    const labels = this._config.labels;
    const colors = this._config.colors;

    this.style.setProperty("--xtx-icon-active", colors.iconActive);
    this.style.setProperty("--xtx-icon-inactive", colors.iconInactive);
    this.style.setProperty("--xtx-heat-active", colors.heatActive);
    this.style.setProperty("--xtx-cool-active", colors.coolActive);

    const xtremeActiveCheck = this._isOn(entities.xtreme_active_check || entities.xtreme_active);
    const xtremeIsActive = this._isOn(entities.xtreme_is_active || entities.xtreme_active_check || entities.xtreme_active);
    const xtendActiveCheck = this._isOn(entities.xtend_active_check || entities.xtend_active);
    const xtendIsActive = this._isOn(entities.xtend_is_active || entities.xtend_active_check || entities.xtend_active);
    const burnerActive = this._isOn(entities.burner_active);
    const dhwFlow = this._asNumber(entities.xtreme_dhw_flowrate);
    const fanSpeed = this._asNumber(entities.fan_speed);
    const chFlow = this._asNumber(entities.ch_flow || entities.indoor_flow);

    this.content.querySelector("#heatLabel").textContent = labels.heatDistributionLabel;
    this.content.querySelector("#indoorTitle").textContent = labels.indoorTitle;
    this.content.querySelector("#indoorTemp").textContent = this._formatState(entities.indoor_temperature);
    this.content.querySelector("#dhwFlow").textContent = `DHW: ${this._formatState(entities.xtreme_dhw_flowrate)}`;
    this.content.querySelector("#chFlow").textContent = `CH: ${this._formatState(entities.ch_flow || entities.indoor_flow)}`;
    this.content.querySelector("#requestedTemp").textContent = `T: ${this._formatState(entities.indoor_requested_temperature)}`;

    this.content.querySelector("#xtremeTitle").textContent = labels.xtremeTitle;
    this.content.querySelector("#xtremeSupply").textContent = this._formatState(entities.xtreme_supply_temperature);
    this.content.querySelector("#xtremeDelta").textContent = `ΔT: ${this._formatState(entities.xtreme_delta_t)}`;
    this.content.querySelector("#xtremeReturn").textContent = this._formatState(entities.xtreme_return_temperature);

    this.content.querySelector("#xtendTitle").textContent = labels.xtendTitle;
    this.content.querySelector("#xtendSupply").textContent = this._formatState(entities.xtend_supply_temperature);
    this.content.querySelector("#xtendDelta").textContent = `ΔT: ${this._formatState(entities.xtend_delta_t)}`;
    this.content.querySelector("#xtendReturn").textContent = this._formatState(entities.xtend_return_temperature);

    this.content.querySelector("#roomSet").textContent = this._formatState(entities.room_set_temperature);

    this.content.querySelector("#outdoorTitle").textContent = labels.outdoorTitle;
    this.content.querySelector("#outdoorTemp").textContent = this._formatState(entities.outdoor_temperature);
    this.content.querySelector("#oduTitle").textContent = labels.oduTitle;
    this.content.querySelector("#oduGas").textContent = this._formatState(entities.odu_gas_temperature);
    this.content.querySelector("#oduLiquid").textContent = this._formatState(entities.odu_liquid_temperature);
    this.content.querySelector("#fanSpeed").textContent = this._formatState(entities.fan_speed);

    const xtremeSupply = this.content.querySelector("#xtremeSupply");
    const xtremeReturn = this.content.querySelector("#xtremeReturn");
    xtremeSupply.style.color = xtremeActiveCheck ? colors.heatActive : "gray";
    xtremeReturn.style.color = xtremeActiveCheck ? colors.coolActive : "gray";

    const xtendSupply = this.content.querySelector("#xtendSupply");
    const xtendReturn = this.content.querySelector("#xtendReturn");
    xtendSupply.style.color = burnerActive ? colors.heatActive : "gray";
    xtendReturn.style.color = burnerActive ? colors.coolActive : "gray";

    const oduGas = this.content.querySelector("#oduGas");
    const oduLiquid = this.content.querySelector("#oduLiquid");
    const fanEnabled = fanSpeed > 0;
    oduGas.style.color = fanEnabled ? colors.heatActive : "gray";
    oduLiquid.style.color = fanEnabled ? colors.coolActive : "gray";

    const xtremeIcon = this.content.querySelector("#xtremeIcon");
    xtremeIcon.icon = xtremeIsActive ? "mdi:fire" : "mdi:fire-off";
    xtremeIcon.classList.toggle("pulse", xtremeIsActive);
    this._setIconColor(xtremeIcon, xtremeIsActive ? colors.iconActive : colors.iconInactive);

    const xtendIcon = this.content.querySelector("#xtendIcon");
    xtendIcon.icon = xtendIsActive ? "mdi:fire" : "mdi:fire-off";
    xtendIcon.classList.toggle("pulse", xtendIsActive);
    this._setIconColor(xtendIcon, xtendIsActive ? colors.iconActive : colors.iconInactive);

    const fanIcon = this.content.querySelector("#fanIcon");
    fanIcon.classList.toggle("rotate", fanEnabled);
    this._setIconColor(fanIcon, fanEnabled ? colors.iconActive : colors.iconInactive);
    fanIcon.style.animationDuration = `${500 / Math.max(fanSpeed, 0.1)}s`;

    this.content.querySelector("#dhwFlow").style.display = dhwFlow > 0 ? "block" : "none";
    this.content.querySelector("#chFlow").style.display = chFlow > 0 ? "block" : "none";
    this.content.querySelector("#requestedTemp").style.display = chFlow > 0 ? "block" : "none";
    this.content.querySelector("#flow-dhw").style.display = dhwFlow > 0 ? "block" : "none";
    this.content.querySelector("#flow-xtreme").style.display = chFlow > 0 ? "block" : "none";
    this.content.querySelector("#flow-xtreme").style.filter = xtremeActiveCheck ? "none" : "grayscale(100%) opacity(0.5)";
    this.content.querySelector("#flow-xtend").style.display = chFlow > 0 ? "block" : "none";
    this.content.querySelector("#flow-xtend").style.filter = xtendActiveCheck ? "none" : "grayscale(100%) opacity(0.5)";
    this.content.querySelector("#flow-fan").style.display = fanEnabled ? "block" : "none";

    const showerIcon = this.content.querySelector("#showerIcon");
    showerIcon.icon = "mdi:shower-head";
    this._setIconColor(showerIcon, dhwFlow > 0 ? colors.iconActive : colors.iconInactive);
    showerIcon.style.opacity = dhwFlow > 0 ? "1" : "0.50";
    
    this._setTapTarget("#indoorTemp", entities.indoor_temperature);
    this._setTapTarget("#dhwFlow", entities.xtreme_dhw_flowrate);
    this._setTapTarget("#chFlow", entities.ch_flow || entities.indoor_flow);
    this._setTapTarget("#requestedTemp", entities.indoor_requested_temperature);

    this._setTapTarget("#xtremeSupply", entities.xtreme_supply_temperature);
    this._setTapTarget("#xtremeDelta", entities.xtreme_delta_t);
    this._setTapTarget("#xtremeReturn", entities.xtreme_return_temperature);
    this._setTapTarget("#xtremeIcon", entities.xtreme_is_active || entities.xtreme_active_check || entities.xtreme_active);

    this._setTapTarget("#xtendSupply", entities.xtend_supply_temperature);
    this._setTapTarget("#xtendDelta", entities.xtend_delta_t);
    this._setTapTarget("#xtendReturn", entities.xtend_return_temperature);
    this._setTapTarget("#xtendIcon", entities.xtend_is_active || entities.xtend_active_check || entities.xtend_active);

    this._setTapTarget("#roomSet", entities.room_set_temperature);
    this._setTapTarget("#outdoorTemp", entities.outdoor_temperature);
    this._setTapTarget("#oduGas", entities.odu_gas_temperature);
    this._setTapTarget("#oduLiquid", entities.odu_liquid_temperature);
    this._setTapTarget("#fanWrap", entities.ch_flow || entities.indoor_flow);
    this._setTapTarget("#fanSpeed", entities.fan_speed);
    this._setTapTarget("#showerIcon", entities.xtreme_dhw_flowrate);
  }
}

customElements.define("intergas-local-flow-card-editor", XtendXtremeSchemaCardEditor);
customElements.define("intergas-local-flow-card", XtendXtremeSchemaCard);
customElements.define("xtend-xtreme-schema-card", XtendXtremeSchemaCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "intergas-local-flow-card",
  name: "HA Intergas Local Flow Card",
  description: "Intergas Xtend/Xtreme schema card with configurable entities.",
});
