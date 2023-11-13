// Wait for the DOM to be ready
$(document).ready(function () {
    // Create a Leaflet map centered at a default location (e.g., the USA)
    const map = L.map('map').setView([38.27312, -98.5821872], 4);

    // Create OpenStreetMap layer
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    });

    // Add OpenStreetMap layer to the map
    osmLayer.addTo(map);

    // Load JSON data using d3.json
    d3.json("savedata_records.json").then(function (data) {
        // Layer for circle markers
        const markersLayer = L.layerGroup();

        // Custom marker icon
        const customIcon = L.icon({
            iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/marker-icon-2x.png',
            iconSize: [25, 41], // size of the icon
            iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
        });

        // Loop through the data and add circle markers to the map
        data.forEach(function (state) {
            // Create a marker with custom icon
            const marker = L.marker([state.latitude, state.longitude], {
                icon: customIcon
            });

            // Add state information to the marker
            marker.stateInfo = {
                stateName: state.state_name,
                counts: state.counts,
                dataValue: state.data_value
            };

            // Add a popup on click to show state information
            marker.bindPopup(`<b>${marker.stateInfo.stateName}</b><br>Counts: ${marker.stateInfo.counts}<br>Data Value: ${marker.stateInfo.dataValue}`);

            // Add a tooltip on mouseover to show state information
            marker.on('mouseover', function (e) {
                this.bindTooltip(`<b>${this.stateInfo.stateName}</b><br>Counts: ${this.stateInfo.counts}<br>Data Value: ${this.stateInfo.dataValue}`).openTooltip();
            });

            // Close the tooltip on mouseout
            marker.on('mouseout', function (e) {
                this.closeTooltip();
            });

            // Add the marker to the layer
            markersLayer.addLayer(marker);

            // Add state name next to the marker in blue
            const stateNameIcon = L.divIcon({
                className: 'state-name-label',
                html: `<div style="color: blue;">${state.state_name}</div>`
            });

            // Create a marker with the state name
            const stateNameMarker = L.marker([state.latitude, state.longitude], {
                icon: stateNameIcon
            });

            // Add the state name marker to the layer
            markersLayer.addLayer(stateNameMarker);
        });

        // Calculate the min and max data_value to normalize the colors
        const minDataValue = Math.min(...data.map(state => state.data_value));
        const maxDataValue = Math.max(...data.map(state => state.data_value));

        // Create a heatmap layer for obesity using Leaflet.heat
        const heatLayer = new L.HeatLayer(data.map(state => [state.latitude, state.longitude, state.data_value]), {
            radius: 20,
            blur: 5,
            maxZoom: 10,
            gradient: calculateGradient(minDataValue, maxDataValue) // Adjust the color gradient
        });

        // Function to calculate gradient based on data_value range
        function calculateGradient(min, max) {
            const range = max - min;
            return {
                0: 'blue',
                0.3: 'cyan',
                0.6: 'white',
                1: 'red'
            };
        }

        // Define an overlay layer group
        const overlayLayers = {
            "Markers": markersLayer,
            "Obesity Heatmap": heatLayer
        };

        // Define a base layer group
        const baseLayers = {
            "OpenStreetMap": osmLayer
        };

        // Add title to the top-left corner
        const titleControl = L.control({
            position: 'topleft'
        });
        titleControl.onAdd = function (map) {
            const titleDiv = L.DomUtil.create('div', 'map-title');
            titleDiv.innerHTML = '<h2>Fastfood Restaurants vs Overweight and Obesity Rates in 2019</h2>';
            return titleDiv;
        };
        titleControl.addTo(map);

        // Create a custom control to add the <canvas> element
        const customControl = L.control({
            position: 'topright'
        });
        customControl.onAdd = function (map) {
            const canvasDiv = L.DomUtil.create('div', 'leaflet-control-custom');
            canvasDiv.innerHTML = '<canvas class="leaflet-heatmap-layer leaflet-layer leaflet-zoom-animated" width="602" height="739" style="transform-origin: 50% 50%; transform: translate3d(456.002px, 0px, 0px);"></canvas>';
            return canvasDiv;
        };
        customControl.addTo(map);

        // Create a layer control with both base and overlay layers and add it to the map
        L.control.layers(baseLayers, overlayLayers, {
            collapsed: false
        }).addTo(map); // Open the layer control by default
        osmLayer.addTo(map); // Add the OpenStreetMap layer by default
        markersLayer.addTo(map); // Add the markers layer by default
    }).catch(function (error) {
        // Display error message
        console.error("Error loading JSON data:", error);
    });
});
