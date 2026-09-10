# HA Intergas Local Flow Card

NOTE: this works for me, so I posible will not be updating this, but you can always fork this for your own setup.

I made myself a Home Assistant card based on the schema below and on the [HA Intergas Local integration](https://github.com/webpatrick/intergas_local) and I would like to share this with every other user of the integration and own an Intergas Xtend and Xtreme.

<img width="600" alt="image" src="https://github.com/user-attachments/assets/e9b59994-9793-4d80-b700-e1c60cc90c96" />

The card is an <a href="https://www.home-assistant.io/dashboards/picture-elements/">picture-elements</a> card an I made it dark-light thema proof.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/fe342971-5dcc-4d94-8af6-02391534e7d1" /> <img width="300" alt="image" src="https://github.com/user-attachments/assets/65d592a5-cb51-40be-8bc3-16a5003da638" />

It also has color and animation for state and flow.

<img width="450" alt="image" src="animation.gif" />

## Installation (HACS JavaScript card)

1. Add this repository as a custom repository in HACS (`Dashboard` category).
2. Install **Xtend Xtreme Schema Card**.
3. Add [xtend-xtreme-schema-card.js](./xtend-xtreme-schema-card.js) as a Lovelace resource if needed:
   - URL: `/hacsfiles/HA_Xtend_Xtreme_schema_card/xtend-xtreme-schema-card.js`
   - Type: `module`
4. Add a card:

```yaml
type: custom:xtend-xtreme-schema-card
entities:
  indoor_temperature: sensor.intergas_xtend_room_temperature
  ch_flow: sensor.intergas_xtend_f_system
  indoor_requested_temperature: sensor.intergas_xtend_requested_temperature
  room_set_temperature: sensor.intergas_xtend_room_temperature_set
  outdoor_temperature: sensor.intergas_xtend_outdoor_temperature
  xtreme_supply_temperature: sensor.intergas_xtreme_t_boiler_supply
  xtreme_delta_t: sensor.intergas_xtreme_delta_t
  xtreme_return_temperature: sensor.intergas_xtreme_t_boiler_return
  xtreme_active_check: binary_sensor.intergas_xtreme_active_check
  xtreme_is_active: binary_sensor.intergas_xtreme_is_active
  xtreme_dhw_flowrate: sensor.intergas_xtreme_boiler_ot_dhw_flowrate
  xtend_supply_temperature: sensor.intergas_xtend_t_heat_pump_supply
  xtend_delta_t: sensor.intergas_xtend_delta_t
  xtend_return_temperature: sensor.intergas_xtend_t_heat_pump_return
  xtend_active_check: binary_sensor.intergas_xtend_active_check
  xtend_is_active: binary_sensor.intergas_xtend_is_active
  burner_active: binary_sensor.boiler_burner
  odu_gas_temperature: sensor.intergas_xtend_temperature_condensor_refrigrerant_gas
  odu_liquid_temperature: sensor.intergas_xtend_temperature_condensor_refrigrerant_liquid
  fan_speed: sensor.intergas_xtend_actual_fan_speed
labels:
  indoorTitle: Binnen
  outdoorTitle: Buiten
  oduTitle: ODU
  xtremeTitle: Xtreme
  xtendTitle: Xtend
  heatDistributionLabel: "~ Warmteverdeelsysteem ~"
colors:
  iconActive: "#f1c40f"
  iconInactive: "var(--secondary-text-color)"
  heatActive: "#ff8c00"
  coolActive: "#3498db"
```

### Dependencies
- <a href="https://github.com/webpatrick/intergas_local">HA Intergas Local</a> for the connection to and sensors from Xtend and Xtreme

#### My dashboard for reference

<img width="2482" height="1376" alt="Screenshot 2026-03-27 115817" src="https://github.com/user-attachments/assets/07b61b86-9b9c-41f2-82df-9d52e2a83bff" />
