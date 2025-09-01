document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribtion: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker = L.marker([51.505, -0.09]).addTo(map);
    var marker2 = L.marker([51.51, -0.099]).addTo(map);
    marker.bindPopup('Hello, I\'m a marker').openPopup();
    marker2.bindPopup('Hello, I\'m a marker').openPopup();
})