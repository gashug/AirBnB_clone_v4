$(document).ready(function() {
    function fetchAndDisplayPlaces(amenities) {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenities }), // Include the list of checked amenities
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

    $('#filter-button').click(function() {
        var checkedAmenities = [];
        $('input[type="checkbox"]:checked').each(function() {
            checkedAmenities.push($(this).data("id"));
        });

        fetchAndDisplayPlaces(checkedAmenities);
    });
});
