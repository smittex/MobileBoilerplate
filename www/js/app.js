var app = new Backbone.Marionette.Application();
app.addRegions({
    main: '#content'
});



app.module('dal', function() {
/*    dal.addInitializer(function() {

    });*/
});

app.module('native', function() {

});



$(function() {
    document.addEventListener('deviceready', app.start(), false);
    $.get('http://bot.whatismyipaddress.com/',function(response) {
        alert(response);
    })
})