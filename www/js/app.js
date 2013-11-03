(function ($, Backbone, Marionette, _, Handlebars) {
    'use strict';
    var app = new Marionette.Application();

    //Organize Application into regions corresponding to DOM elements
    //Regions can contain views, Layouts, or subregions nested as necessary
    app.addRegions({
        headerRegion: "#header",
        mainRegion: "#main"
    });

    app.addInitializer(function () {
        Backbone.history.start();
    });

    var initialize = function () {
        // Pass in our Router module and call it's initialize function
        Router.initialize();
    };


    /*
     // What does this do?

     return {
     initialize: initialize
     };
     */


    function alertIP() {
        $.get('http://bot.whatismyipaddress.com/', function (response) {
            alert(response);
        })
    }

    return app;
}($, Backbone, Marionette, _, Handlebars));