/*
 * Contains all the functionality for my Udacity Neighborhood Map project.
 * Libraries needed: Knockout.js and Jquery.js.
 */

/**
 * Array that contains objects with all the data for each hard-coded venue
 */
var model = [
	{
	    name: "Krispy Kreme Doughnuts",
	    address: "5310 W Irlo Bronson Memorial Hwy",
	    location: {
	        lat: 28.332199,
	        lng: -81.496352
	    },
	    description: 'venue',
	    id: "4b60c1d8f964a520abf729e3",
	},
	{
	    name: "Dunkin' Donuts",
	    address: "8485 S Orange Blossom Trl",
	    location: {
	        lat: 28.440270493897327,
	        lng: -81.40336663846854
	    },
	    description: 'venue',
	    id: "4fc621bde4b0c761147c7a9f",
	},
	{
	    name: "Starbucks",
	    address: "9101 International Dr",
	    location: {
	        lat: 28.433621228620975,
	        lng: -81.47296742044166
	    },
	    description: 'venue',
	    id: "4e4dd182bd41b76bef939fd1"
	},
	{
	    name: "Dunkin' Donuts",
	    address: "3009 Edgewater Dr",
	    location: {
	        lat: 28.576001433977243,
	        lng: -81.38943775028832
	    },
	    description: 'venue',
	    id: "4b731974f964a5205f9b2de3"
	},
	{
	    name: "Benjamin's French Bakery Cafe",
	    address: "716 E Washington St",
	    location: {
	        lat: 28.54362517205521,
	        lng: -81.36754895345801
	    },
	    description: 'venue',
	    id: "4ffc64aee4b099cda1aaaccb"
	},
	{
	    name: "Starbucks",
	    address: "13851 S John Young Pkwy",
	    location: {
	        lat: 28.366054719328414,
	        lng: -81.42435445263543
	    },
	    description: 'venue',
	    id: "4b2a4e27f964a52019a724e3"
	},
	{
	    name: "Dunkin' Donuts",
	    address: "2900 S Kirkman Rd",
	    location: {
	        lat: 28.511860566809933,
	        lng: -81.45971097018544
	    },
	    description: 'venue',
	    id: "4b3a19ecf964a520246125e3"
	},
	{
	    name: "Krispy Kreme Doughnuts",
	    address: "4080 Millenia Blvd",
	    location: {
	        lat: 28.490097,
	        lng: -81.428514
	    },
	    description: 'venue',
	    id: "528bb4fd11d281c7f8b58137"
	},
	{
	    name: "Krispy Kreme Doughnuts",
	    address: "1031 S Orlando Ave",
	    location: {
	        lat: 28.58795628,
	        lng: -81.365207
	    },
	    description: 'venue',
	    id: "4b376132f964a520c04025e3"
	},
	{
	    name: "Bakery Plus",
	    address: "915 E Michigan St",
	    location: {
	        lat: 28.513277650618885,
	        lng: -81.36529368000654
	    },
	    description: 'venue',
	    id: "4b51e82ff964a520b95a27e3"
	}
];

/**
 * @description - Represents a venue
 * @param {object} venue - object containing all data for a venue
 */
var Venue = function(venue) {
    this.name = venue.name,
    this.address = venue.address,
    this.location = venue.location,
    this.description = venue.description,
    this.id = venue.id,
    this.visible = ko.observable(true),
    this.clicked = ko.observable(false)
};


var ViewModel = function() {
    self = this;

    //Keeps track of user input to filter search
    self.input = ko.observable("");

    //Array containing all the data from the model
    self.venuesData = ko.observableArray([]);

    /**
     * @description - This function populates a venuesData observable array.
     * It pushes the object that corresponds to each venue to the venuesData
     * observable array.
     */
    self.createVenues = function() {
        var i;
        for (i = 0; i < model.length; i++) {
            self.venuesData.push(new Venue(model[i]));
        }
    };

    //Changes the footer button's text
    self.footerButton = ko.observable("Search");

    //WELCOME DIV ============================================================================================================================

    self.welcomeDivVisible = ko.observable(true);

    /**
     * @description - This function hides the welcome div that appears when the user first enters the app
     * If the welcome div is shown, it hides it. Since its only shown once, there's no way to toggle it.
     */
    self.hideWelcomeDiv = function() {
        if (self.welcomeDivVisible() === true) {
            self.welcomeDivVisible(false);
        }
    };

    //SIDEBAR ============================================================================================================================

    /*
     * Observable that tracks if the donut should be visible or hidden.
     * The donut image has a 'visible' binding to be displayed when this property is true.
     */
    self.showDonut = ko.observable(false);

    /*
     * Observable that tracks if the search bar is visible or hidden
     * The search bar main div has a 'css' binding that toggles a class .open
     */
    self.searchBarVisible = ko.observable(false);

    /**
     * @description - This function takes care of the animation required to toggle the sidebar when the user clicks on the 'Search' button.
     * It only acts if the device has a window width less than 1024px, otherwise, the search bar is shown by default.
     * It changes the value of the searchBarVisible() observable that determines if the sidebar has a class 'open' or not.
     * It also handles the visibility of the Donut located at the bottom of the search bar. If
     * the donut is hidden and the user clicks on the sidebar, it displays it by changing its observable
     * property to true. Otherwise, if the donut is visible, and the user toggles the sidebar, it hides it
     * by setting its observable property to false.
     */
    self.toggleSearchBar = function() {

        if (self.searchBarVisible() === true) {
            self.searchBarVisible(false);
        } else if (self.searchBarVisible() === false) {
            self.searchBarVisible(true);
        }

        /*Toggle if the donut is shown or not when the sidebar is
        hidden or visible. Depending on the size of the window.
        Copyright (3) (see line 865)*/
        if ($(window).width() < 1024) {
            if (self.showDonut() === false) {
                self.showDonut(true);
            } else {
                self.showDonut(false);
            }

            //Toggle text of footer button
            if (self.footerButton() == "Search") {
                self.footerButton("Map");
            } else {
                self.footerButton("Search");
            }
        } else {
            self.showDonut(true);
            self.footerButton("Donut");
        }

    };

    //SEARCH ==================================================================================

    /**
     * @description - This function filters the Venue's List on the search bar. First, it gets the user input
     * in real time through an observable property bound to the search field and formats it to lowercase.
     * Then, it gets the input length and loops through each venue checking if the input is empty or not.
     * If its empty, it shows all venues in the search bar and all markers. If the input is not empty,
     * it checks if the venue's name matches the input. If it finds a match, it shows the current venue and
     * its corresponding marker. If it doesn't find a match, it hides them.
     */
    self.filterVenuesList = function() {

        var i;
        var input = self.input().toLowerCase();
        // var firstLetter = self.input().slice(0, 1).toLowerCase();
        var inputLength = self.input().length;

        //For every venue in the venueData Array
        for (i = 0; i < self.venuesData().length; i++) {

            var venue = self.venuesData()[i];

            //If the input is empty
            if (inputLength === 0) {
                self.venuesData()[i].visible(true);
                self.showMarkers();

            //If the input is not empty
            } else if (inputLength > 0) {

                //Property that will be matched against the input
                var property = self.venuesData()[i].name.toLowerCase();

                //To Check if a match was found. If there is a match, indexOf will return a positive integer,
                // so this condition wil be true. If there isn't a match, indexOf will return -1, so the condition will be false.
                var match;
                if(property.indexOf(input) != -1) {
                    match = true;
                } else {
                    match = false;
                }

                venue.visible(match);
                venue.marker.setVisible(match);
            }
        }
    };

    /**
     * @description - This function resets the search in the sidebar's venues list to show all venues.
     * It loops through the venuesData array and sets each venue's visible property to 'true'
     * (they are have a 'visible' binding to this property).
     * If the user opened an infoWindow and clicks on reset, the infoWindow will close as well.
     * To achieve this funtionality, it gets the index of item that clicked before clicking on the
     * reset icon. Then, it checks if there was an item clicked and and closes the infoWindow and hides the marker.
     * And since the user input is shown on the text input field, it resets it to its default empty string value.
     */
    self.resetSearch = function() {
        var i;
        var arrayLength = self.venuesData().length;
        var venue;
        //If there was an item clicked: Index of the item that was clicked before resetting the search
        var clickedVenueIndex;

        for (i = 0; i < arrayLength; i++) {
            venue = self.venuesData()[i];

            venue.visible(true);

            if(venue.clicked()===true){
                clickedVenueIndex = i;
            }
            venue.clicked(false);
        }

        self.input("");

        //If there was an item clicked before resetting
        if(clickedVenueIndex !== undefined) {

            var clickedVenue = self.venuesData()[clickedVenueIndex];

            //To close the infoWindow
            self.venuesData()[clickedVenueIndex].marker.setAnimation(null);
            self.showMarkers();
            self.centerViewOnMarker(clickedVenue.marker, clickedVenue.marker.map);
            infoWindow.marker = null;
            infoWindow.close();
        }
    };

    //MAP ============================================================================================================================

    /**
     * @description - This function creates all markers that will be displayed on the map,
     * using the data from the venuesData array. It runs when the app first loads.
     * First, it gets the data from the array and creates an instance of bounds to extend the
     * bounds of the map's initial view for every marker. Then, it creates an icon variable that
     * sets the properties of the icon used for the markers. It creates a marker for each location by
     * extracting the corresponding venue's properties and assigning them as the marker's properties.
     * Finally, it sets the marker as a property of the venue to connect them and make it easier
     * to operate with, and adds an event listener for when the marker is clicked.
     *
     * Copyright (1) (see line 865)
     *
     * @param {object} map - map object created with Google Maps api
     */
    self.createMarkers = function(map) {

        //Get Venues Data
        var locations = self.venuesData();
        //To define the map's bounds
        var bounds = new google.maps.LatLngBounds();

        //Copyright: based on (2) (see line 865)
        var icon = {
            url: "img/donut-icon-min.png",
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };

        //Create a marker for each location
        for (var i = 0; i < locations.length; i++) {

            var index = i;

            //Get the corresponding venue's properties
            var position = locations[i].location;
            var title = locations[i].name;
            var address = locations[i].address;
            var lat = locations[i].location.lat;
            var lng = locations[i].location.lng;

            //Create a new marker
            var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: title,
                address: address,
                lat: lat,
                lng: lng,
                icon: icon,
                venueIndex: index, //A property to relate each marker to its corresponding item in the venues array
                description: 'marker'
            });

            //For markers to drop when map is first loaded
            marker.setAnimation(google.maps.Animation.DROP);

            //Set the marker as a property of venue
            locations[i].marker = marker;

            //Extend the boundaries
            self.fitBounds(bounds, marker.position, map);

            marker.addListener("click", function() {
                self.handleClickOnItem(this);
            });
        }
    };

    /**
     * @description - This function fits the map's bounds to the center the view on the markers.
     * First, it extends the maps boundaries to fit the marker and then fits the maps bounds
     * @param {object} bounds - an instance of bounds until the current marker
     * @param {object} markerPosition - an object containing the marker's lat and lng
     * @param {object} map - the map to which the function will apply
     */
    self.fitBounds = function(bounds, markerPosition, map) {
        bounds.extend(markerPosition);
        map.fitBounds(bounds);
    };

    /**
     * @description - This function fills the clicked venue's marker's infoWindow.
     * First, it checks if the infoWindow is closed. If so, it sets its content to be
     * an string that will be converted into HTML and filled with the venue's data.
     * But first, it formats the url to remove a prefix and make it more presentable
     * for the user. After setting the content, it opens the infoWindow and adds an
     * event listener for closing it, that stops the marker's animation, shows all markers
     * removes the 'clicked' property from the item, resets the search on the sidebar and finally
     * closes the infoWindow.
     * @param {object} marker - the marker on which to open the infoWindow
     * @param {object} infoWindow - the infoWindow object
     * @param {object} venueDataObject - an object that contains the data to fill the infoWindow's content
     * @param {object} item - the clicked venue or the clicked marker's corresponding venue
     */
    self.populateInfoWindow = function(marker, infoWindow, venueDataObject, item) {

        if (infoWindow.marker != marker) {

            infoWindow.marker = marker;
            //To delete http:// from URL
            var formattedUrl = formatUrl(venueDataObject.url);

            self.centerViewOnMarker(marker, marker.map);

            /**
             * @description - This function formats the url from the venue's data object parameter
             * by removing 'http://' to make it more presentable for the user
             * @return {string} - The formatted url
             */
            function formatUrl(url) {
                return url.replace('http://', ' ');
            }

            //InfoWindow Structure
            infoWindow.setContent(
                '<div class="marker-info-window-div" id="marker-info-window-div">' +
                '<div class="infoWindow-title-store-div">' +
                '<p class="infoWindow-title">' + venueDataObject.name + '</p>' +
                '<img class="infoWindow-store" src="img/store-min.png">' +
                '</div>' +
                '<div>' +
                '<p class="infoWindow-content">' + '<span class="fontawesome-home icon-font"></span>' + 'Address: ' + venueDataObject.address + '</p>' +
                '<p class="infoWindow-content">' + '<span class="fontawesome-phone icon-font"></span>' + 'Phone: ' + venueDataObject.phone + '</p>' +
                '<div class="small-infoWindow-content-div">' +
                '<div class="small-infoWindow-content">' + '<span class="fontawesome-facebook-sign small-icon-font"></span>' + venueDataObject.facebook + '</div>' +
                '<div class="small-infoWindow-content">' + '<span class="fontawesome-twitter small-icon-font"> </span>' + '@' + venueDataObject.twitter + '</div>' +
                '</div>' +
                '<div class="small-infoWindow-content-div">' +
                '<p class="small-infoWindow-content">' + '<span class="fontawesome-money small-icon-font"></span>' + 'Price: ' + venueDataObject.price + '</p>' +
                '<p class="small-infoWindow-content">' + '<span class="fontawesome-star-empty small-icon-font"></span>' + 'Rating: ' + venueDataObject.rating + '</p>' +
                '</div>' +
                '<p class="infoWindow-content venue-status">' + '<span class="fontawesome-bookmark icon-font"></span>' + venueDataObject.status + '</p>' +
                '<a href="' + venueDataObject.url + '" class="infoWindow-content infoWindow-link" target="_blank">' + '<span class="fontawesome-link icon-font link-icon-font"></span>' + venueDataObject.urlText + '</a>' +
                '</div>' +
                '</div>'
            );

            //Open infoWindow
            infoWindow.open(map, marker);

            //For when the user closes the infoWindow
            infoWindow.addListener('closeclick', function() {
                marker.setAnimation(null);
                self.showMarkers();
                item.clicked(false);
                self.centerViewOnMarker(marker, marker.map);
                self.resetSearch();
                infoWindow.marker = null;
                infoWindow.close();
            });


        }
    };

    /**
     * @description - This function animates a marker by setting its 'Animation' property to 'BOUNCE'
     * @param {object} marker - the marker that will be animated
     */
    self.animateMarker = function(marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    };

    /**
     * @description - This function hides all markers that do not correspond to the venue clicked.
     * It loops through the venuesData array and checks if each marker's address matches
     * the clicked item's address. If so, it show the marker, if not, it hides it.
     * @param {object} item - the item clicked
     */
    self.hideMarkers = function(item) {
        //Define variables
        var i;
        var venuesDataLength = self.venuesData().length;
        var itemClickedAddress = item.address;

        //Loop through the markers array and for each, marker, check
        //if the address property matches the item click's address
        //property. I so, display the markers, if not, hide it.
        for (i = 0; i < venuesDataLength; i++) {
            var currentMarker = self.venuesData()[i].marker;

            if (itemClickedAddress != currentMarker.address) {
                currentMarker.setVisible(false);
            } else {
                currentMarker.setVisible(true);
            }
        }
    };

    /**
     * @description - This function shows all markers on the map.
     * It loops through the venuesData array to display them on the screen
     * by setting is visible property to 'true'
     */
    self.showMarkers = function() {
        var i;
        var venuesDataLength = self.venuesData().length;

        //Loop through the venuesData array to display them on the screen
        for (i = 0; i < venuesDataLength; i++) {
            var currentMarker = self.venuesData()[i].marker;
            currentMarker.setVisible(true);
        }
    };


    /**
     * @description - This function centers the view on the marker clicked.
     * First, it creates a latLng object with Google Maps Api and sets its
     * latitude and longitude with the marker's data. Finally, it pans to that location on the map.
     * @param {object} marker - the marker clicked
     * @param {object} map = the map that contains the marker
     */
    self.centerViewOnMarker = function(marker, map) {
        var latLng = new google.maps.LatLng(marker.lat, marker.lng);
        map.panTo(latLng);
    };

    //HANDLE IF USER CLICKS ON ITEMS ============================================================================================================================

    /**
     * @description - This function handles everything related to responsing to a user's click on an item
     * First, it checks the item's description to see if its a marker or a venue. Then, it checks if the
     * item clicked is a venue or a marker. If its a marker, it sets the item to be the venue object that
     * corresponds to the marker. It sets the venue's 'clicked' property to 'true', the input to the venue's name,
     * hides the unselected venues from the list in the sidebar and hides the other markers.
     * Then, it animates the corresponding marker, defines the URL that will be used for the AJAX request using
     * the venue's coordinates and name, and centers the map on the marker.
     * The next step is checking the description of the original item clicked, if its a venue, it toggles the sidebar.
     * The AJAX request is sent through the foursquare API and gets the venue's data, then it iterate over the venuesData
     * array, when it finds the marker that matches the title of the item clicked, populate that marker's infowindow.
     * @param {object} item - item that was clicked (Venue or Marker)
     */
    self.handleClickOnItem = function(item) {

        var foursquareClientID = "QQHVYPL2W5JVNQ3TIRMYPO44FEAI0O0PHWN3B0OENCDS0BFO";
        var foursquareClientSecret = "OB1XN0DEG40Z2GZLIL0DCR5FVN25NNVI34Z4OMRYKHKI5JUD";

        var clickedItemDescription = item.description;

        //If it is a marker, get the item that corresponds to that marker and set it to 'item'
        // and show on the sidebar the item that corresponds to the marker
        if (item.description == 'marker') {
            item = self.findItem(item);
            item.visible(true);
        }

        item.clicked(true);
        self.input(item.name);
        self.hideUnselectedVenues(item);

        //Hide all other markers
        self.hideMarkers(item);

        //Get the clicked item's address
        var venueAddress = item.address;

        //Set the url for the AJAX request
        var url;
        if (item.description == 'venue') {
            self.animateMarker(item.marker);
            //Create url with venue ID
            var venueId = item.id;
            url = 'https://api.foursquare.com/v2/venues/' + venueId + '?client_id=' + foursquareClientID + '&client_secret=' + foursquareClientSecret + '&v=20160725&locale=en';
        }

        //If the original clicked item is a venue, it means the sidebar is open, so close it.
        if (clickedItemDescription == 'venue') {
            self.toggleSearchBar();
        }

        //Ajax request
        $.getJSON(url, function(data) {

            var venue = data.response.venue;

            //Conditions to check properties
            var currentStatus;
            if (venue.hours !== undefined) {
                if (venue.hours.isOpen === true) {
                    currentStatus = "OPEN";
                } else {
                    currentStatus = "CLOSED";
                }
            } else {
                currentStatus = "Not available";
            }

            var venuePrice;
            if (venue.price !== undefined) {
                if (venue.price.message !== undefined) {
                    venuePrice = venue.price.message;
                } else {
                    venuePrice = "Not available";
                }
            } else {
                venuePrice = "Not available";
            }

            //To check if these properties are not undefined
            var venueFacebook;
            var venueTwitter;
            var venueRating;
            var venueUrl;
            var venueFormattedPhone;
            var venueAddress;
            var venueName;

            //Array that contains variables that will later be assigned a value in the for loop if the value is not undefined
            var dataVariablesArray = [venueName, venueAddress, venueFormattedPhone, venueUrl, venueTwitter, venueFacebook, venueRating];
            //Array that contains the properties fetched throught the ajax request that will be checked to determine if they are not undefined
            var dataRequestArray = [venue.name, venue.location.address, venue.contact.formattedPhone, venue.canonicalUrl, venue.contact.twitter, venue.contact.facebookName, venue.rating];

            /*Iterate over each property to check its value is undefined. If so, set it to "Not available",
            If not, assign its value to the corresponding variable in dataVariables array*/
            var i;
            for (i = 0; i < dataRequestArray.length; i++) {
                if (dataRequestArray[i] !== undefined) {
                    dataVariablesArray[i] = dataRequestArray[i];
                } else {
                    dataVariablesArray[i] = "Not available";
                }
            }

            //To match against the marker's address before opening the infoWindow
            venueAddress = dataVariablesArray[1];

            //To store the venue's data
            var venueData = {
                name: dataVariablesArray[0],
                address: dataVariablesArray[1],
                phone: dataVariablesArray[2],
                url: dataVariablesArray[3],
                facebook: dataVariablesArray[4],
                twitter: dataVariablesArray[5],
                price: venuePrice,
                rating: dataVariablesArray[6],
                status: currentStatus,
                urlText: 'Visit this venue at Foursquare'
            };

            /* Iterate over the venuesData array, when you find the marker that matches the title of the item clicked,
              populate that marker's infowindow */
            var marker;

            for (i = 0; i < self.venuesData().length; i++) {
                var currentMarker = self.venuesData()[i].marker;
                var currentVenue = self.venuesData()[i];

                if (venueAddress == currentMarker.address) {
                    marker = currentMarker;
                    venue = currentVenue;
                }
            }

            self.populateInfoWindow(marker, infoWindow, venueData, venue);

        }).fail(function(e) {
            console.log("Error! : Couldn't fetch data");

            //To store the venue's data
            var venueData = {
                name: "Error: couldn't get data for this venue",
                address: "Couldn't get data",
                phone: "Couldn't get data",
                url: "Couldn't get data",
                facebook: "Couldn't get data",
                twitter: "Couldn't get data",
                price: "Couldn't get data",
                rating: "Couldn't get data",
                status: "Couldn't get data",
                urlText: "Couldn't get data"
            };

            /*Iterate over the venuesData array, when you find the marker that matches the title of the item clicked,
              populate that marker's infowindow */
            var i;

            for (i = 0; i < self.venuesData().length; i++) {
                var marker = self.venuesData()[i].marker;
                var item = self.venuesData()[i];

                if (venueAddress == marker.address) {
                    self.populateInfoWindow(marker, infoWindow, venueData, item);
                }
            }
        });

    };

    /**
     * @description - This function finds a marker's corresponding venue from the venuesData array
     * @param {object} marker - marker to which you want to find the corresponding item
     * @return {object} - The item that corresponds to the marker
     */
    self.findItem = function(marker) {
        return self.venuesData()[marker.venueIndex];
    };

    /**
     * @description - This function hides from the venues list in the sidebar the venues that weren't clicked by the user.
     * It iterates through the venueData array and checks if each venue's address matches the clicked venue's address.
     * If they don't match, it hides it by setting its 'visible' property to false
     * @param {object} clickedItem - Venue that won't be hidden by the function
     */
    self.hideUnselectedVenues = function(clickedVenue) {
        var i;
        var clickedVenueAddress = clickedVenue.address;

        //For each venue
        for (i = 0; i < self.venuesData().length; i++) {
            var currentVenue = self.venuesData()[i];
            var currentVenueAddress = self.venuesData()[i].address;

            //If the clicked item's address is not the same as the address of the current venue in the loop, hide it
            if (clickedVenueAddress != currentVenueAddress) {
                currentVenue.visible(false);
            }
        }
    };
};


//INITIALIZE MAP ============================================================================================================================

/**
 * @description - This function starts the app by creating a map with the Google Maps API
 * It creates a new instance of the ViewModel and applies bindings. Then, it applies
 * custom styles for the map and creates a new instance of the map. Finally, it executes
 * a function to create the markers that will be displayed on the map.
 */
var initMap = function() {

    var vm = new ViewModel();
    ko.applyBindings(vm);

    //Custom style for the map Copyright (4) (customized it for this app)
    var style = [
    {
        "featureType": "water",
        "stylers": [{
            "saturation": 43
        }, {
            "lightness": -41
        }, {
            "hue": "#0088FF"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
            "hue": "#FF0000"
        }, {
            "saturation": -100
        }, {
            "lightness": 99
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#808080"
        }, {
            "lightness": 54
        }]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#ECE2D9"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#CCDCA1"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#767676"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#FFF"
        }]
    }, {
        "featureType": "poi",
        "stylers": [{
            "visibility": "OOFFFF"
        }]
    }, {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#B8CB93"
        }]
    }, {
        "featureType": "poi.park",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "poi.sports_complex",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "poi.medical",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "poi.business",
        "stylers": [{
            "visibility": "simplified"
        }]
    }];

    var map;

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.741,
            lng: -73.998
        },
        zoom: 18,
        styles: style,
        animation: google.maps.Animation.DROP
    });

    //Create venues from the data
    vm.createVenues();

    //Create global infowindow to avoid creating one each time a venue is clicked
    infoWindow = new google.maps.InfoWindow();

    //Create the markers
    vm.createMarkers(map);
};

/*Fallback for Google Maps API*/
var googleMapsFailed = function() {
    alert("Hi! Welcome to DonutFinder. There was an error loading Google Maps, please try to refresh your tab or reload the site.");
};

/* COPYRIGHT
 * (1) Based on Udacity's Google Maps API course
 * (2) http://stackoverflow.com/questions/15096461/resize-google-maps-marker-icon-image
 * (3) http://www.coalmarch.com/blog/how-to-execute-javascript-based-on-screen-size-using-jquery
 * (4) https://snazzymaps.com/style/44/mapbox
 */
