var mapLocation = new google.maps.LatLng(1.353014, 103.8649974); //change coordinates here
var marker;
var map;

function initialize() {
    var mapOptions = {
        zoom: 16, //change zoom here
        center: mapLocation,
        scrollwheel: false,
				styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dbdbdb"},{"visibility":"on"}]}]

    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);


    //change address details here
    var contentString = '<div class="map-info-box">'
    + '<div class="map-head">'
    + '<h3>Launch</h3></div>'
    + '<p class="map-address"><i class="fa fa-map-marker"></i> Lorem ipsum dolor sit amet <br><i class="fa fa-phone"></i> +65 1234 1234 <br><span class="map-email"><i class="fa fa-envelope"></i> info@scrapyourcar.com</span></p>'
    + '<p><a href="https://www.google.com.sg/maps/place/Serangoon+Central/@1.3510491,103.8730597,17z/data=!3m1!4b1!4m2!3m1!1s0x31da17a682dd95f9:0x47c89ff5d1a4e482?sa=X&amp;ei=KqAdVazxJMTkuQS9sIGIBQ&amp;aved=0CB0Q8gEwAA" target="_blank">Open on Google Maps</a></p></div>';


    var infowindow = new google.maps.InfoWindow({
        content: contentString,
    });


    var image = 'img/flag.png';
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        title: 'Site Name', //change title here
        icon: image,
        animation: google.maps.Animation.DROP,
        position: mapLocation
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });

}

google.maps.event.addDomListener(window, 'load', initialize);
