import * as goongjs from "@goongmaps/goong-js";
import { v4 as uuidv4 } from 'uuid';
import $ from "jquery";
import Autocomplete from "../utils/autocomplete.js";
import React, { useState, useEffect } from 'react';

const imageBase64 = "data:image/png;base64,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"

class GoongComponent {
  _handler = {};
  constructor(options) {
    this._options = {
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105, 21],
      zoom: 9,
      ...options
    }
    goongjs.accessToken = this._options.accessToken;

    this._container = $('<div/>', {
      "id": `${options.container}-${uuidv4()}`,
      "class": `map-container`
    });

    if(options.leftPane) {
      this._panel = $('<div/>', {
        "id": `${options.container}-panel-${uuidv4()}`,
        "class": "goong-map-component-panel"
      });
      this._panel.appendTo(`#${options.container}`);
    }
    $(`#${options.container}`).addClass(`goong-map-component ${options.leftPane ? 'has-left-pane' : ''}`);

    this._container.appendTo(`#${options.container}`);
    this._container.ready(() => {
      this.init();
    });
  }

  on(_event, callback) {
    this._handler[_event] = this._handler[_event] || [];
    this._handler[_event].push(callback);
  }

  onSearch(mk) {
    this._handler["search"].map(handle => {
      handle(mk);
    });
  }

  init() {
    this._map = new goongjs.Map({
      ...this._options,
      container: this._container.attr("id")
    });

    if(this._options.enabledSearch){
      this._searchBox = $('<div/>', {
        "id": `${this._options.container}-search-${uuidv4()}`,
        "class": "goong-map-search"
      });
      const searchId = `${this._options.container}-input-search-${uuidv4()}`;
      this._searchBox.html(`<div class="autocomplete" style="width:300px;">
        <input id="${searchId}" type="text" placeholder="Search by address...">
      </div>
      <span>Power by Goong <a href="https://goong.io" target="_blank">https://goong.io</a></span>`);

      this._searchBox.appendTo(this._container);
      this._searchBox.ready(() => {
        Autocomplete($(`#${searchId}`)[0], {apiKey: this._options.apiKey, component: this});
      });
    }

    if(this._options.leftPane)
    {
      (this._options.markers || []).map(marker => {
        const div = $(`<div class="marker-item"><h3>${marker.name || ""}</h3><p>${marker.description || ""}</p></div>`);
        div.on('click', (e) => {
          this.flyTo(marker);  
        });
        div.appendTo(this._panel);
      });
    }

    this._map.on("load", () => {
      this.onMapLoad()
    });
  }

  flyTo(marker) {
    if(!this._map) return;
    this._map.flyTo({
      center: marker.lngLat,
      zoom: 15
    });
    if(this._popup) {
      this._popup.setLngLat(marker.lngLat).setHTML(`<b>${marker.name}</b>${(marker.description ? `<br/>${marker.description}` : "")}`).setOffset({
        "bottom": [0, - (marker.fixOffset != undefined ? marker.fixOffset : (this._options.markerSize || 50))]
      }).addTo(this._map);
    }
  }

  onMapLoad() {
    if(this._options.control) this._map.addControl(new goongjs.NavigationControl());
    if(this._options.markers) this.createMarker(this._options.markers);
    this._popup = new goongjs.Popup({
      anchor: "bottom",
      offset: {"bottom":[0, - (this._options.markerSize || 50)]},
      closeButton: false,
      closeOnClick: false
    });

    this._map.on('mouseenter', 'places', (e) => {
      // Change the cursor style as a UI indicator.
      this._map.getCanvas().style.cursor = 'pointer';
       
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;
      var name = e.features[0].properties.name;
       
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
       
      // Populate the popup and set its coordinates
      // based on the feature found.
      this._popup.setLngLat(coordinates).setHTML(`<b>${name}</b>${(description ? `<br/>${description}` : "")}`).addTo(this._map);
    });
     
    this._map.on('mouseleave', 'places', () => {
      this._map.getCanvas().style.cursor = '';
      this._popup.remove();
    });
  }

  createMarker(markers) {
    var geojson = {
      'type': 'FeatureCollection',
      'features': markers.map(marker => {
        return {
          'type': 'Feature',
          'properties': {
            'name': marker.name,
            'description': marker.description
          },
          'geometry': {
            'type': 'Point',
            'coordinates': marker.lngLat
          }
        }
      })
    };
    this._map.addSource('places', {type: 'geojson', data: geojson});
    this._map.loadImage(this._options.markerIcon || imageBase64, (error, image) => {
      if (error) throw error;
      this._map.addImage('store-icon', image, { 'sdf': true });
      this._map.addLayer({
        'id': 'places',
        'source': 'places',
        'type': 'symbol',
        'layout': {
          'icon-image': 'store-icon',
          'icon-size': (this._options.markerSize || 50)/image.width,
          'icon-anchor': "bottom"
        },
        'paint': {
          'icon-color': this._options.markerColor || "#FF0000"
        }
      });
    });
  }
}

window.GoongComponent = GoongComponent;

function GoongComponentReact(props) {
  const id = uuidv4();
  
  useEffect(() => {
    var component = new GoongComponent({
        accessToken: props.accessToken,
        container: id,
        zoom: props.zoom, //default is 9,
        enabledSearch: props.enabledSearch, //Need apiKey
        apiKey: props.apiKey,
        leftPane: props.leftPane, //open  Left  Panel
        center: props.center,
        markers: props.markers,
        control: props.control
    });
    component.on('search', props.onSearch)
  });

  return (
    <div {...props} id={id}>
    </div>
  );
}
export default GoongComponentReact;
