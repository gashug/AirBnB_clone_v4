$(document).ready(function() {
    var selectedStates = {};
    var selectedCities = {};

    function updateLocationsList() {
        var selectedLocations = [];
        for (var stateId in selectedStates) {
            selectedLocations.push(selectedStates[stateId]);
        }
        for (var cityId in selectedCities) {
            selectedLocations.push(selectedCities[cityId]);
        }

        var locationsList = selectedLocations.join(', ');
        if (locationsList === "") {
            locationsList = "All";
        }
        $('#locations h4').text(locationsList);
    }

    function fetchAndDisplayPlaces(amenities, states, cities) {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: amenities,
                states: Object.keys(states),
                cities: Object.keys(cities)
            }),
            success: function(data) {
                $('#places .places article').remove();

                $.each(data, function(index, place) {
                    var article = $('<article></article>');

                    var title = $('<h2></h2>').text(place.name);
                    var price = $('<div class="price_by_night"></div>').text('$' + place.price_by_night);
                    var info = $('<div class="information"></div>').html(
                        'Guests: ' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') +
                        ' • Bedrooms: ' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') +
                        ' • Bathrooms: ' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')
                    );
                    var description = $('<div class="description"></div>').text(place.description);

                    article.append(title, price, info, description);

                    $('#places .places').append(article);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching places: ' + textStatus);
            }
        });
    }

    $('input[data-id][data-name^="state"]').change(function() {
        var stateId = $(this).data("id");
        var stateName = $(this).data("name");

        if (this.checked) {
            selectedStates[stateId] = stateName;
        } else {
            delete selectedStates[stateId];
        }

        updateLocationsList();
    });

    $('input[data-id][data-name^="city"]').change(function() {
        var cityId = $(this).data("id");
        var cityName = $(this).data("name");

        if (this.checked) {
            selectedCities[cityId] = cityName;
        } else {
            delete selectedCities[cityId];
        }

        updateLocationsList();
    });

    $('#filter-button').click(function() {
        // Create arrays to store the selected amenity IDs, state IDs, and city IDs
        var checkedAmenities = [];
        var checkedStates = selectedStates;
        var checkedCities = selectedCities;

        fetchAndDisplayPlaces(checkedAmenities, checkedStates, checkedCities);
    });
});
