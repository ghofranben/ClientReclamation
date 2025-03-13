// تفعيل الخريطة
const map = L.map('map').setView([34.0209, -6.8416], 13); // إحداثيات افتراضية (الرباط، المغرب)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(e.latlng).addTo(map);
    document.getElementById("adresse").value = `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`;
});

// زر التقاط الصور
document.getElementById("prendrePhotos").addEventListener("click", function() {
    document.getElementById("photo").click();
});

document.getElementById("photo").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        alert("تم تحميل الصورة: " + file.name);
    }
});

// زر إرسال المطالبة
document.getElementById("envoyerReclamation").addEventListener("click", function() {
    alert("تم إرسال المطالبة بنجاح!");
});