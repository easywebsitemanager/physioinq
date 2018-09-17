function initializeMaps() {    
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
        [
            {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
            {featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{color: '#c9b2a6'}]},
            {featureType: 'administrative.land_parcel', elementType: 'geometry.stroke', stylers: [{color: '#dcd2be'}]},
            {featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{color: '#ae9e90'}]},
            {featureType: 'landscape.natural', elementType: 'geometry', stylers: [{color: '#dfd2ae'}]},
            {featureType: 'poi', elementType: 'geometry', stylers: [{color: '#dfd2ae'}]},
            {featureType: 'poi', elementType: 'labels.text.fill', stylers: [{color: '#93817c'}]},
            {featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{color: '#a5b076'}]},
            {featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{color: '#447530'}]},
            {featureType: 'road', elementType: 'geometry', stylers: [{color: '#f5f1e6'}]},
            {featureType: 'road.arterial', elementType: 'geometry', stylers: [{color: '#fdfcf8'}]},
            {featureType: 'road.highway', elementType: 'geometry', stylers: [{color: '#f8c967'}]},
            {featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{color: '#e9bc62'}]},
            {featureType: 'road.highway.controlled_access', elementType: 'geometry', stylers: [{color: '#e98d58'}]},
            {featureType: 'road.highway.controlled_access', elementType: 'geometry.stroke', stylers: [{color: '#db8555'}]},
            {featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{color: '#806b63'}]},
            {featureType: 'transit.line', elementType: 'geometry', stylers: [{color: '#dfd2ae'}]},
            {featureType: 'transit.line', elementType: 'labels.text.fill', stylers: [{color: '#8f7d77'}]},
            {featureType: 'transit.line', elementType: 'labels.text.stroke', stylers: [{color: '#ebe3cd'}]},
            {featureType: 'transit.station', elementType: 'geometry', stylers: [{color: '#dfd2ae'}]},
            {featureType: 'water', elementType: 'geometry.fill', stylers: [{color: '#b9d3c2'}]},
            {featureType: 'water', elementType: 'labels.text.fill', stylers: [{color: '#92998d'}]}
        ],
        {name: 'Physio Map'});
    
    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: {lat: -23.88535882, lng: 132.53699565},
        zoom: 4,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
        }
    });
    
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
            
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
			
    /* zoomChangeBoundsListener = 
    google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
    	if ( this.getZoom() ){   // or set a minimum
        	this.setZoom(3);  // set zoom here
        }
    });
    setTimeout(function(){google.maps.event.removeListener(zoomChangeBoundsListener)}, 2000); */
}