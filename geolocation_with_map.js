function geoFindMe() {
    const status = document.querySelector("#status");
    const mapDiv = document.querySelector("#map");

    status.textContent = "Locating…";

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Debugging

        status.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

        const map = L.map(mapDiv).setView([latitude, longitude], 15);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("You are here!")
            .openPopup();
    }

    function error() {
        status.textContent = "Unable to retrieve your location";
    }

    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
    }
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);
