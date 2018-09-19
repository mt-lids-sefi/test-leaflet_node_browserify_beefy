// Initialize leaflet.js
var L = require('leaflet');
var request = new XMLHttpRequest();


var mymap = L.map('mymap').setView([-34.587997, -58.466492], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        id: 'mapbox.streets'
}).addTo(mymap);



var mutuales = require('./mutuales.json')
/*var dire = mutuales["mutuales"][0];
console.log(dire)


request.open('POST', 'https://apis.datos.gob.ar/georef/api/direcciones', true);
	request.onload = function () {

	// Begin accessing JSON data here
	var resp = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) {
		console.log(resp);
	} else {
		console.log('error');
	}
	}
	request.setRequestHeader("Content-Type", "application/json");
	var data = {
		"direcciones": [
			{
				"direccion": dire["Direccion"],
				"campos": "id, nombre, altura, ubicacion.lat, ubicacion.lon, provincia.nombre,  departamento.nombre"
				,"provincia": dire["Provincia"] 
			}
		]
	}
	request.send(JSON.stringify(data));*/
var data= {"direcciones": []}

for (let index = 0; index < mutuales["mutuales"].length; index++) {
	const element = mutuales["mutuales"][index];

	var dire = 
		{
			"direccion": element["Direccion"],
			"campos": "id, nombre, altura, ubicacion.lat, ubicacion.lon, provincia.nombre,  departamento.nombre"
			,"provincia": element["Provincia"] 
		}
	
	data.direcciones.push(dire);
	

}

//console.log(data);


var myJsonString = JSON.stringify(data);
console.log(myJsonString);
request.open('POST', 'https://apis.datos.gob.ar/georef/api/direcciones', true);
request.setRequestHeader("Content-Type", "application/json");
request.onload = function () {

	// Begin accessing JSON data here
	var resp = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) {
		resp = resp["resultados"]
		resp.forEach(dire => {
			dire.direcciones.forEach(dir => {
				console.log(dir.ubicacion.lat, dir.ubicacion.lon)
				if (dir.ubicacion.lat){
					var marker = L.marker([dir.ubicacion.lat, dir.ubicacion.lon]).addTo(mymap);
				}
			});
		});
	} else {
		console.log('error');
	}
}

request.send(myJsonString);

/*


// Initialize the map
/*var map = L.map('map', {
  scrollWheelZoom: false
});*/
/*
// Set the position and zoom level of the map
map.setView([-34.587997, -58.466492], 4);

*/

/*	Variety of base layers */
/*var osm_mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var osm_bw_mapnik = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; OSM Black and White Mapnik<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var osm_de = L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; OSM Deutschland <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var osm_fr = L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; OSM France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var osm_hot = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; OSM Hot <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
});

var osm_topo = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var stamen_TonerBackground = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var stamen_Watercolor = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'png'
});

var stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});

var stamen_TerrainBackground = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});

var esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var esri_WorldTerrain = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS',
	maxZoom: 13
});

var esri_NatGeoWorldMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});

// Create base layers group object
var baseLayers = {
	"OSM Mapnik": osm_mapnik,
	"OSM Black White Mapnik": osm_bw_mapnik,
	"OSM Germany": osm_de,
	"OSM France": osm_fr,
	"OSM Hot": osm_hot,
	"OSm Topo": osm_topo,
	"Stamen Toner": stamen_Toner,
	"Stamen Toner Background": stamen_TonerBackground,
	"Stamen Toner Lite": stamen_TonerLite,
	"Stamen Watercolor": stamen_Watercolor,
	"Stamen Terrain": stamen_Terrain,
	"Stamen Terrain Background": stamen_TerrainBackground,
	"ESRI World Imagery": esri_WorldImagery,
	"ESRI World Terrain": esri_WorldTerrain,
	"ESRI National Geographic": esri_NatGeoWorldMap
};

// Add baseLayers to the map
L.control.layers(baseLayers, null).addTo(map);*/

