# HA_Xtend_Xtreme_schema_card

Work in progress...

I made myself a Home Assistant card based on the schema below and on the REST connection described in https://github.com/DSchoutsen/HA_connection_Xtend and I would like to share this with every other user of the integration and own an Intergas Xtend and Xtreme.

<img width="600" alt="image" src="https://github.com/user-attachments/assets/e9b59994-9793-4d80-b700-e1c60cc90c96" />

The card is an <a href="https://www.home-assistant.io/dashboards/picture-elements/">picture-elements</a> card an I made it dark-light thema proof.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/fe342971-5dcc-4d94-8af6-02391534e7d1" /> <img width="300" alt="image" src="https://github.com/user-attachments/assets/65d592a5-cb51-40be-8bc3-16a5003da638" />

It also has color and animation for state and flow.

<img width="450" alt="image" src="animation.gif" />

## Installation

Copy the code from the xtend_xtreme_schema_card.yaml into an empty card.

### Dependencies
- <a href="https://github.com/DSchoutsen/HA_connection_Xtend">HA_connection_Xtend</a> for the connection to and sensors from Xtend and Xtreme
- <a href="https://github.com/thomasloven/lovelace-card-mod">Card Mod (HACS)</a> for animation and styling
- <a href="https://github.com/piitaya/lovelace-mushroom">Mushroom Title Card (HACS)</a> for some headers


In addition to the Xtend and Xtreme template sensors (from DSchouten HA_connection_Xtend) I added some extra calculated sensors I use in this card:

### Xtend
```yaml
- binary_sensor:
    - name: xtend_actief_check
      unique_id: xtend_actief_check
      state: "{{ states('sensor.xtend_heatpumpmode') == 'Heating' }}"
      icon: >
        {% if states('sensor.xtend_heatpumpmode') == 'Heating' %}
          mdi:fire
        {% else %}
          mdi:fire-off
        {% endif %}
```

### Xtreme
```yaml
# Custom calculated xtreme entities
- sensor:
    - name: xtreme_deltaT
      unique_id: 11932596-f4ae-4c89-9dad-2163f442711c
      unit_of_measurement: "°C"
      device_class: temperature
      state_class: measurement
      state: >
        {{ (states('sensor.xtreme_tBoilerSupply') | int - states('sensor.xtreme_tBoilerReturn') | int) | float | round(1) }}
      icon: mdi:thermometer-check

- binary_sensor:
    - name: "Xtreme Actief Check"
      unique_id: 0e3bae55-3c03-4722-a306-b919c78f0cb8
      state: "{{ states('sensor.xtreme_deltat') | float(0) > 0.5 }}"
      icon: >
        {% if states('sensor.xtreme_deltat') | float(0) > 0.5 %}
          mdi:fire
        {% else %}
          mdi:fire-off
        {% endif %}
```
