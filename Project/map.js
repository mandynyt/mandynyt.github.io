var mapboxTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>', maxZoom: 18,})

var map = L.map('map')
      .addLayer(mapboxTiles)
      .setView([22.287111, 114.191667], 13);

var items = [];
var airtable_read_endpoint = "https://api.airtable.com/v0/app8JpknoQTchY1HL/Info?api_key=keyDQXt27JtFQ0kXk";
var data = [];
$.getJSON(airtable_read_endpoint, function(result) {
       $.each(result.records, function(key,value) {
                items = {};
                items["name"] = value.fields.University;
                items["url"] = value.fields.Website;
                items["image_url"] = value.fields.Photo;
                items["latitud"] = value.fields.Lat;
                items["longitud"] = value.fields.Lng;
               data.push(items);
               console.log(items);
        }); // end .each
}); // end getJSON


  function show_districts(){
console.log('show show_districts')
  for (var i in data) {
    console.log('data is ...')
    console.log(data[i])
    // console.log(data[i].image_url[0].url)

    var latlng = L.latLng({ lat: data[i].latitud, lng: data[i].longitud });
    L.marker( latlng , {icon: firefoxIcon} )
        .bindPopup( '<a href="' + data[i].url + '" target="_blank">' + '<img src="' + data[i].image_url[0].url+'" width = "150px"><br>'+data[i].name + '</a>' )
        .addTo(map);
  }
  }
