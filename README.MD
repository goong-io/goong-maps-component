### GoongMapComponents

### Using with CDN
```js
<script src='https://cdn.jsdelivr.net/npm/@goong/map-component@1.1.4/dist/goong-maps-component.min.js'></script>
<link href="https://cdn.jsdelivr.net/npm/@goong/map-component@1.1.4/dist/goong-maps-component.min.css" rel="stylesheet" type="text/css"/>
```

#### Examples

[ Simple Map ](http://jsfiddle.net/buminta/8cfy296q)

[ Search Component ](http://jsfiddle.net/buminta/8cnv2xk4)

[ Multi Markers ](http://jsfiddle.net/buminta/k09bdnpv)

[ Advance ](http://jsfiddle.net/buminta/pg9ro8f3)

### React Component

### Install

```
yarn add @goong/map-component
```

Or

```
npm install @goong/map-component
```

#### Component Examples

```js
import * as GoongMap from "@goong/map-component";
import "@goong/map-component/dist/goong-maps-component.min.css";

function GoongComponentReact(props) {
  const markers = [
    {
      lngLat: [105.4, 21.3],
      name: "Hà Nội",
      description: "Thành phố Hà Nội, Việt Nam"
    },
    {
      lngLat: [105.1, 21.2],
      name: "Hà Nội",
      description: "Thành phố Hà Nội, Việt Nam"
    },
    {
      lngLat: [105.0, 21.0],
      name: "Hà Nội",
      description: "Thành phố Hà Nội, Việt Nam"
    }
  ];

  return (
    <GoongMap.Component
      accessToken="MAP LOAD API KEY",
      zoom={9}
      enabledSearch={false}
      onSearch={(marker) => {
        console.log(marker);
      }}
      apiKey="SERVICE API KEY"
      leftPane="false"
      center={[105.0,21.0]},
      markers={markers},
      control={true}
    /> 
  );
}
```

### Props

| Key         | Type - Description |
| ----------- | ----------- |
| accessToken | String - API Key for Mapload/Maptile   |
| zoom        | Number - Default Zoom for Init Map        |
| enabledSearch | Boolean - Enabled Search/Autocomplete on the Map, This requirement with apiKey |
| apiKey | String - API Key for call Resfult API |
| leftPane | Boolean - Using for having some markers, and you need show list marker then click to going it |
| center | LngLatArray - Default center for init Map |
| control | Boolean - Show or hidden button zoomin/zoomout in Map |
| markers | Array<Markers> - List of marker for show in Map |
| onSearch | Using only for React - handle poi when searching... |

### Events

> ES5 handle events with method .on("eventName", function(obj){ //... })

| Events | Object |
| ------ | ------ |
| search | MarkerObj |
