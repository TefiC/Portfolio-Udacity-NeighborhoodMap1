##Udacity Project: Neighborhood Map
####Description
---
This is my Neighborhood Map project for Udacity's Front-End Web developer Nanodegree. Integrating Google Maps API and Foursquare API, I've developed an app that contains Donut stores located at Orlando, Florida and its periphery. 

####Instructions
---
Once you open the index.html file on a web browser, a window will be displayed welcoming you to the app, once everything has loaded, you can click on the white arrow at the top to enter the app. You will see a map and many donut markers that point to the venues contained in the app. Depending on the size of your device, you will see a search bar. On mobile devices, you can toggle it and it will be hidden by default when you first access the app, while on tablets and laptops, it will remain open. 

The search bar has a white text input field that filters the venues and markers by its name in real time. Once you find the venue you'd like to visit, you can either click on the marker or on the venue's rectangle in the sidebar. Either way, an Info Window will open showing the venue's data: address, phone, facebook, twitter, ranking, price and a link to its site on Foursquare. 

If you filter the search on the search bar, but would like to reset the search, click on the arrow icon located to the right of the text input field.

If you opened a venue's Info Window but would like to show all markers at once while keeping the info Window open, you can click on the "Markers" button at the footer.

**Enjoy looking for delicious DONUTS!  Who doesn't want to eat some?**

####Libraries
---
 - Knockout.js
- Jquery.js

#### CSS
---
- Included normalize.css to improve design compatibility across browsers

####Technical Features
---
   - The app is fully responsive and adapts to every device
   - The code structure follows a MVVM pattern
   - The app implements third party APIs like Google Maps API and Foursquare API
   - The app includes error handling for third Party APIs
   - Ajax requests are sent using Jquery's $.getJSON method

####Copyright
---
 - Images are under a [public domain](https://www.teachingcopyright.org/handout/public-domain-faq) license:  
   - logo welcome-logo.png was made on powerpoint with these images:                  
        - [Donut on i](https://pixabay.com/en/donut-donuts-bread-confectionery-1139832/)
        - [Coffee and Donut](https://pixabay.com/en/breakfast-bakery-coffee-break-155995/)
        - [Chocolate Donut Donut](https://pixabay.com/en/donut-frosting-sprinkles-dessert-576139/)
  - [store.png](https://pixabay.com/en/welcome-front-store-business-open-305504/)
  - [donut.png](https://pixabay.com/en/doughnut-bakery-baking-coffee-break-155661/)
  - [donut-icon.png](https://www.goodfreephotos.com/vector-images/donut-with-rainbow-sprinkles.png.php)

######Copyright attributions for index.html

   - (1) Linked to http://www.w3schools.com/lib/w3.css for the welcome div's fade animation
   
######Copyright attributions for app.js

*(References found in the file)*

   - (1) The code for the map was based on Udacity's course on Google Maps API
   - (2) To customize the map markers http://stackoverflow.com/questions/15096461/resize-google-maps-marker-icon-image
   - (3) http://www.coalmarch.com/blog/how-to-execute-javascript-based-on-screen-size-using-jquery
   - (4) Custom Style for Google Map https://snazzymaps.com/style/44/mapbox

######Copyright attributions for style.css

*(References found in the file)*
 
   - (1) To customize the scrollbar http://www.codeproject.com/Tips/674478/Customize-Scrollbars-using-CSS
   - (2) For text not to be highlighted when the user clicks on it https://css-tricks.com/almanac/properties/u/user-select/