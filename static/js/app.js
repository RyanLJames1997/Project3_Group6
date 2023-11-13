const fileUrl = "https://mlee22ph.github.io/project3_group6//savedata_records.json";
//const sqlite3 = require('sqlite3');

// Create a Leaflet map centered at a default location (e.g., the USA)
const map = L.map('map').setView([38.27312, -98.5821872], 4);

const idDropDown = document.getElementById("selDataset");
let selectedID = 'Alaska';
let selectedCode = 'AK';

// Initial global variables
let mainData = [];
let mainJson;
let sortedBreakOut = [];
let stateList = {};
let selectedStatename;

// Wait for the DOM to be ready
$(document).ready(function () {

    // Load JSON data using d3.json
    d3.json(fileUrl).then(function (data) {

        mainData = data;
        createHeatMap(data);

        populateSubjectID(data);

        // Create state list
        for (let i=0; i<data.length; i++) {
            stateList[data[i].state_name] = data[i].counts;
        }
        console.log("stateList: ", stateList);

        // Creat Bar Chart
        createBarChart(data);

        // Create sorted break_out
        let selectedState = mainJson.filter(selectStateCode);
        console.log("selectedState: ",selectedState);
    
        for (let i=0; i<selectedState.length; i++) {
            sortedBreakOut.push(selectedState[i].break_out);
        }
        sortedBreakOut.sort();
        console.log("sortedBreakOut: ",sortedBreakOut);

        // Create Line Chart
        createLineChart(mainJson);

    }).catch(function (error) {
        // Display error message
        console.error("Error loading JSON data:", error);
    });
});

function createObesityChart(data_json) {

    //console.log("myFunc: ", data_json)
    mainJson = data_json;
    return data_json;
}




// Event function to catch change in dropdown selection and update the webpage
function optionChanged(id) {
    selectedID = id;

    for (let i=0; i<mainData.length; i++){
        if (selectedID === mainData[i].state_name) {
            selectedCode = mainData[i].state_code;
            break;
        }
    }


    // Call function to update the chart
    createBarChart(mainData);
    // Create Line Chart
    createLineChart(mainJson);


}

function selectStateName(data) {
    return data.state_name === selectedID;
}

function selectStateCode(data) {
    return data.state_code === selectedCode && data.response.includes("Obese") && data.date_year == 2019;
}


// Function to populate Test Subject ID No.
function populateSubjectID(data) {

    let state_names = ["ALL"];

    for (let i=0; i<data.length; i++) {
        state_names.push(data[i].state_name);
    }
    state_names.sort();
    console.log("state_names: ", state_names);



    for (let i=0; i<state_names.length; i++) {
        let option = document.createElement("option");
        option.setAttribute('value', state_names[i]);
      
        let optionText = document.createTextNode(state_names[i]);
        option.appendChild(optionText);
      
        idDropDown.appendChild(option);
    }
    
}


// Create Bar Chart for top 10 OTU for selected ID
function createBarChart(data) {

    // populate
    let selectedState = data.filter(selectStateName);
    console.log("selectedState: ",selectedState);

    // Assemble data for bar plot
    let yValue = [];
    let xValue = [];
    let found = false;
    let startIndex = 0;
    let maxNumberStates = 5

    // Focus on state in heat map
    map.fitBounds([[selectedState[0].latitude-4, selectedState[0].longitude-4], [selectedState[0].latitude+4, selectedState[0].longitude+4]]);


    let sortedKeys = Object.keys(stateList).sort().reverse();
    selectedStatename = selectedState[0].state_name;
    console.log("sortedKeys: ", sortedKeys);

    // Display 5 States around the selected state
    for (let i=0; i<sortedKeys.length; i++) {

        if (sortedKeys[i] === selectedState[0].state_name) {
            switch (i) {
                case 0:
                case 1:
                    startIndex = 0;
                    break;
                case sortedKeys.length-1:
                case sortedKeys.length-2:
                case sortedKeys.length-3:
                case sortedKeys.length-4:
                case sortedKeys.length-5:
                    startIndex = sortedKeys.length-5;
                    break;
        
                default:
                    startIndex = i-2;
            }
            console.log("startIndex: ", startIndex);
            break;
        }
    }

    for (let i=startIndex; i<startIndex+maxNumberStates; i++) {
        yValue.push(sortedKeys[i]);
        xValue.push(stateList[sortedKeys[i]]);
    }
    

    console.log("yValue: ", yValue);
    console.log("xValue: ", xValue);

    // Trace 
    let trace1 = {
        x: xValue,
        y: yValue,
        text:yValue,
        type: "bar",
        marker: {},
        orientation: "h"
    };

    trace1.marker.color = trace1.y.map(function (v) {
        return v === selectedState[0].state_name ? 'red' : 'lightblue'
    });

    // Data trace array
    let traceData = [trace1];

    // Apply title to the layout
    let layout = {
    title: `State vs Fastfood Restaurants`,
    xaxis: {
        title: "Number of Fastfoods"
    },
    yaxis: {
         title: "State"
    },
    margin: {
        l:100,
        t: 100,
        pad: 10
      }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", traceData, layout);
}


// Create Bar Chart for top 10 OTU for selected ID
function createLineChart(data) {

    console.log("createLineChart: ", data);
    // populate
    let selectedState = data.filter(selectStateCode);
    console.log("selectedState: ",selectedState);

    // Assemble data for bar plot
    let yValue = [];
    for (let i=0; i<sortedBreakOut.length; i++) {
        for (let j=0; j<selectedState.length; j++) {
            if (sortedBreakOut[i] === selectedState[j].break_out) {
                yValue.push(selectedState[j].data_value);
            }

        }
    }
    let xValue = sortedBreakOut;

    console.log("yValue: ", yValue);
    console.log("xValue: ", xValue);

    // Trace 
    let trace1 = {
        x: xValue,
        y: yValue,
        text:yValue,
        type: "line"
        //orientation: "h"
    };

    // Data trace array
    let traceData = [trace1];

    // Apply title to the layout
    let layout = {
        title: `${selectedStatename} State Obesity Trend`,
        xaxis: {
            title: "Age"
        },
        yaxis: {
            title: "BMI Value"
        },
        margin: {
            l:100,
            t: 100,
            pad: 10
        }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("gauge", traceData, layout);
}



function createHeatMap(data){


    // Create OpenStreetMap layer
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    });

    // Add OpenStreetMap layer to the map
    osmLayer.addTo(map);

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
        //titleDiv.innerHTML = '<h2>Fastfood Restaurants vs Overweight and Obesity Rates in 2019</h2>';
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
}


// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to create a horizontal bar chart using D3.js with random colors
function createHorizontalBarChart(data) {
    const chartContainer = d3.select("#chartContainer");

    chartContainer
        .selectAll(".bar-container")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "bar-container")
        .append("div")
        .attr("class", "bar")
        .style("width", d => d.counts + "px")
        .style("background-color", getRandomColor)
        .text(d => d.counts + " - " + d.state_name);
}
