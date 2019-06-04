$(() => {

  const $searchPropertyForm = $(`
  <form action="/properties" method="get" id="search-property-form" class="search-property-form">
      <div class="search-property-form__field-wrapper">
        <label for="search-property-form__city">City</label>
        <input type="text" name="city" placeholder="City" id="search-property-form__city">
      </div>

      <div class="search-property-form__field-wrapper">
        <label for="search-property-form__minimum-price-per-night">Minimum Cost</label>
        <input type="number" name="minimum_price_per_night" placeholder="Minimum Cost" id="search-property-form__minimum-price-per-night">
        <label for="search-property-form__maximum-price-per-night">Maximum Cost</label>
        <input type="number" name="maximum_price_per_night" placeholder="Maximum Cost" id="search-property-form__maximum-price-per-night">
      </div>

      <div class="search-property-form__field-wrapper">
        <label for="search-property-form__minimum-rating">Minimum Rating</label>
        <input type="number" name="minimum_rating" placeholder="Minimum Rating" id="search-property-form__minimum-rating">
      </div>

      <div class="search-property-form__field-wrapper">
          <button>Search</button>
          <a id="search-property-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `)
  window.$searchPropertyForm = $searchPropertyForm;

  $searchPropertyForm.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    getAllListings(data).then(function( json ) {
      propertyListings.addProperties(json.properties);
      views_manager.show('listings');
    });
  });

  $('body').on('click', '#search-property-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });

});