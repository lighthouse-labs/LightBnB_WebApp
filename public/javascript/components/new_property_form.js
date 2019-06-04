$(() => {

  

  const $newPropertyForm = $(`
  <form action="/api/properties" method="post" id="new-property-form" class="new-property-form">
      <div class="new-property-form__field-wrapper">
        <label for="new-property-form__title">Title</label>
        <input type="text" name="title" placeholder="Title" id="new-property-form__title">
      </div>
      
      <div class="new-property-form__field-wrapper">
        <label for="new-property-form__description">Description</label>
        <textarea placeholder="Description" name="description" id="property-form__description" cols="30" rows="10"></textarea>
      </div>

      <!-- <div class="new-property-form__field-wrapper">
          <label for="new-property-form__type">Type</label>
          <select id="new-property-form__type" name="type">
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
          </select>
        </div> -->

      <div class="new-property-form__field-wrapper">
        <label for="new-property-form__bedrooms"># 🛌</label>
        <input placeholder="# 🛌" type="number" name="number_of_bedrooms" id="new-property-form__bedrooms">

        <label for="new-property-form__bathrooms"># 🚽</label>
        <input placeholder="# 🚽" type="number" name="number_of_bathrooms" id="new-property-form__rooms">

        <label for="new-property-form__parking"># 🚘</label>
        <input placeholder="# 🚘" type="number" name="parking_spaces" id="new-property-form__parking">
      </div>

      <div class="new-property-form__field-wrapper">
        <label for="new-property-form__cost">Cost Per Night</label>
        <input placeholder="Cost Per Night" type="number" name="cost_per_night" id="new-property-form__cost">
      </div>

      <div class="new-property-form__field-wrapper">
        <label for="new-property-form__thumbnail">Thumbnail Image</label>
        <input placeholder="Thumbnail Image" type="text" name="thumbnail_photo_url" id="new-property-form__thumbnail">
      </div>

      <div class="new-property-form__field-wrapper">
        <label for="new-property-form__cover">Cover Image</label>
        <input placeholder="Cover Image" type="text" name="cover_photo_url" id="new-property-form__cover">
      </div>

      <hr>

      <div class="new-property-form__field-wrapper">
          <label for="new-property-form__street">Street</label>
          <input placeholder="Street" type="text" name="street" id="new-property-form__street" />
        </div>

        <div class="new-property-form__field-wrapper">
          <label for="new-property-form__country">Country</label>
          <select id="new-property-form__country" name="country" data-country-selected="CA">
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="BR">Brazil</option>
          </select>
        </div>
        <div id="new-property-form__locality-fields">
          
          <div class="new-property-form__field-wrapper">
            <label for="new-property-form__city">City</label>
            <input placeholder="City" type="text" name="city" id="new-property-form__city" />
          </div>
          <div class="new-property-form__field-wrapper">
            <label for="new-property-form__state">Administrative Area</label>
            <input placeholder="Administrative Area" type="text" name="provence" id="new-property-form__state" />
          </div>
          <div class="new-property-form__field-wrapper">
            <label for="new-property-form__zip">Postal Code</label>
            <input placeholder="Postal Code" type="text" name="post_code" id="new-property-form__zip" />
          </div>
        </div>

        <div class="new-property-form__field-wrapper">
            <button>Create</button>
            <a id="property-form__cancel" href="#">Cancel</a>
        </div>
        
    </form>
  `);

  window.$newPropertyForm = $newPropertyForm;

  $newPropertyForm.addressfield({
    json: 'javascript/libraries/addressfield/addressfield.min.json',
    fields: {
      country: '#new-property-form__country',
      locality: '#new-property-form__locality-fields',
      localityname: '#new-property-form__city',
      administrativearea: '#new-property-form__state',
      postalcode: '#new-property-form__zip'
    }
  });

  $newPropertyForm.on('submit', function (event) {
    event.preventDefault();

    views_manager.show('none');

    const data = $(this).serialize();
    submitProperty(data)
    .then(() => {
      views_manager.show('listings');
    })
    .catch((error) => {
      console.error(error);
      views_manager.show('listings');
    })
  });

  $('body').on('click', '#property-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });
  
});