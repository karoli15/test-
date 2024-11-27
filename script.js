
let map;
let directionsService;
let directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 20.5937, lng: 78.9629 }, // Default location
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

function calculateFare() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const rate = parseFloat(document.getElementById("rate").value);

    if (!from || !to) {
        alert("Please enter both locations!");
        return;
    }

    const request = {
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            const distanceKm = result.routes[0].legs[0].distance.value / 1000; // Meters to KM
            const fare = (distanceKm * rate).toFixed(2); // Calculate fare

            document.getElementById("output").innerHTML = `
                <strong>Distance:</strong> ${distanceKm.toFixed(2)} km<br>
                <strong>Fare:</strong> $${fare}
            `;
        } else {
            alert("Could not calculate the route. Please try again.");
        }
    });
}

window.onload = initMap;
