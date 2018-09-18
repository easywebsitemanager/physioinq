var MY_MAPTYPE_ID = 'custom_style';

var zoomOut = 4

function initializeMaps() {
    var featureOpts = [{
        featureType: "all",
        stylers: [{ saturation: -80 }]
    },{
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ hue: "#00ffee" },{ saturation: 50 }]
    },{
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    }];

    var myOptions = {
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeId: MY_MAPTYPE_ID,
        center: {lat: -23.88535882, lng: 132.53699565},
        zoom: 4
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var styledMapOptions = {
        name: 'Physio Map'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

    var infowindow = new google.maps.InfoWindow();

    
    var marker, i;
    var bounds = new google.maps.LatLngBounds();

    for (i = 0; i < markers.length; i++) {
        var pos = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(pos);
        marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: "https://cdn.rawgit.com/easywebsitemanager/physioinq/6b5e31ec/images/marker.png"
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(markers[i][0]);
                infowindow.open(map, marker);
                
                $('.gm-style-iw .book-button').on('click', function(e) {
                    e.preventDefault();

                    var url = $(this).attr('href'),
                        section = $('#page-url').val(),
                        target = $(this).attr('target');

                    ga('send', {
                        hitType: 'event',
                        eventCategory: 'Booking Request',
                        eventAction: 'Book Now form',
                        eventLabel: section,
                        eventValue: 325,
                        transport: 'beacon'
                    });

                    if (target == '_blank') {
                        var win = window.open(url, '_blank');
                        win.focus();
                    } else {
                        window.location.href = url;
                    }
                });

                $('.gm-style-iw .phone-button').on('click', function(e) {
                    e.preventDefault();

                    var url = $(this).attr('href'),
                        section = $('#page-url').val();

                    if ($(this).hasClass('')) {
                        $phone_number = $(this).find('.phone-number').find('.hide').attr('data-src');
                        $(this).find('.phone-number').find('.hide').html($phone_number).removeAttr('title');

                        $(this).removeClass('');

                        ga('send', {
                            hitType: 'event',
                            eventCategory: 'Booking Request',
                            eventAction: 'Phone Number',
                            eventLabel: section,
                            eventValue: 325,
                            transport: 'beacon'
                        });
                    } else {
                        window.location.href = url;
                    }
                });
            }
        })(marker, i));
    }
    map.fitBounds(this.map.bounds);
}