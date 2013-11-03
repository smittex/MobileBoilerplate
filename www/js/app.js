define(['zepto', 'backbone', 'marionette', 'underscore', 'handlebars'],
    function ($, Backbone, Marionette, _, Handlebars) {
        var app = new Backbone.Marionette.Application();

        /* function isMobile() {
         var userAgent = navigator.userAgent || navigator.vendor || window.opera;
         return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
         }*/

        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        app.addRegions({
            headerRegion:   "#header",
            mainRegion:     "#main"
        });

        app.addInitializer(function () {
            Backbone.history.start();
        });


        var initialize = function(){
            // Pass in our Router module and call it's initialize function
            Router.initialize();
        };

        return {
            initialize: initialize
        };


        function alertIP() {
            //document.addEventListener('deviceready', app.start(), false);
            $.get('http://bot.whatismyipaddress.com/',function(response) {
                alert(response);
            })
        }


        //alertIP();
        // app.mobile = isMobile();

        //return app;
    });














/*

var app = new Backbone.Marionette.Application();
app.addRegions({
    main: '#content'
});



app.module('dal', function() {
    dal.addInitializer(function() {

    });
});

app.module('native', function() {

});

*/

