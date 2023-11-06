$(document).ready(function() {
    // Function to fetch and display places
    function fetchAndDisplayPlaces() {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            contentType: 'application/json',
            data: JSON.stringify({}), // Empty dictionary in the body
            success: function(data) {
                // Clear the existing places
                $('#places .places article').remove();

                // Loop through the results and create article tags for each place
                $.each(data, function(index, place) {
                    // Create a new article element
                    var article = $('<article></article>');

                    // Create the content for the article
                    var title = $('<h2></h2>').text(place.name);
                    var price = $('<div class="price_by_night"></div>').text('$' + place.price_by_night);
                    var info = $('<div class="information"></div>').html(
                        'Guests: ' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') +
                        ' • Bedrooms: ' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') +
                        ' • Bathrooms: ' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')
                    );
                    var description = $('<div class="description"></div>').text(place.description);

                    // Append content to the article
                    article.append(title, price, info, description);

                    // Append the article to the places section
                    $('#places .places').append(article);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching places: ' + textStatus);
            }
        });
    }

    // Initial fetch and display of places
    fetchAndDisplayPlaces();
});
