$(document).ready(function() {
    const amenityIDs = {};

    $('input[type="checkbox"]').change(function() {
        const amenityID = $(this).data("id");
        const amenityName = $(this).data("name");

        if (this.checked) {
            amenityIDs[amenityID] = amenityName;
        } else {
            delete amenityIDs[amenityID];
        }

        let amenitiesList = Object.values(amenityIDs).join(', ');
        if (amenitiesList === "") {
            amenitiesList = "None";
        }

        $('div.Amenities h4').text(amenitiesList);
    });
});
