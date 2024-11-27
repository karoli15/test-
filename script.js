
let map;
let markerFrom;
let markerTo;
let polyline;

// Initialize the map
function initMap() {
    map = L.map('map').setView([51.505, -0.09], 13); // Default center

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

// Calculate distance and fare
function calculateFare() {
    const fromInput = document.getElementById("from").value;
    const toInput = document.getElementById("to").value;
    const rate = parseFloat(document.getElementById("rate").value);

    if (!fromInput || !toInput) {
        alert("Please enter both locations!");
        return;
    }

    const [fromLat, fromLng] = fromInput.split(",").map(coord => parseFloat(coord.trim()));
    const [toLat, toLng] = toInput.split(",").map(coord => parseFloat(coord.trim()));

    if (isNaN(fromLat) || isNaN(fromLng) || isNaN(toLat) || isNaN(toLng)) {
        alert("Invalid coordinates! Use format: Latitude, Longitude");
        return;
    }

    const from = L.latLng(fromLat, fromLng);
    const to = L.latLng(toLat, toLng);

    // Calculate distance (Haversine formula)
    const distanceKm = from.distanceTo(to) / 1000;

    // Calculate fare
    const fare = (distanceKm * rate).toFixed(2);

    // Update map
    if (markerFrom) map.removeLayer(markerFrom);
    if (markerTo) map.removeLayer(markerTo);
    if (polyline) map.removeLayer(polyline);

    markerFrom = L.marker(from).addTo(map).bindPopup("Starting Point").openPopup();
    markerTo = L.marker(to).addTo(map).bindPopup("Destination").openPopup();
    polyline = L.polyline([from, to], { color: 'blue' }).addTo(map);

    map.fitBounds(polyline.getBounds());

    // Update output
    document.getElementById("output").innerHTML = `
        <strong>Distance:</strong> ${distanceKm.toFixed(2)} km<br>
        <strong>Fare:</strong> $${fare}
    `;
}

// Initialize the map when the page loads
window.onload = initMap;
