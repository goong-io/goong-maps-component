### GoongMapComponents

### Using with CDN
```js
<script src='https://cdn.jsdelivr.net/npm/@goong/map-component@1.1.3/dist/goong-maps-component.min.js'></script>
<link href="https://cdn.jsdelivr.net/npm/@goong/map-component@1.1.3/dist/goong-maps-component.min.css" rel="stylesheet" type="text/css"/>
```

#### Examples

[ Simple Map ](https://github.com/goong-io/goong-maps-component/blob/master/examples/simple.html)

[ Search Component ](https://github.com/goong-io/goong-maps-component/blob/master/examples/search-component.html)

[ Multi Markers ](https://github.com/goong-io/goong-maps-component/blob/master/examples/multi-markers.html)

[ Advance ](https://github.com/goong-io/goong-maps-component/blob/master/examples/advance.html)

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
import GoongMapComponent from "@goong/map-component";

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
    <GoongMapComponent
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
