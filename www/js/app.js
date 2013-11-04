var app = (function ($, Backbone, Marionette, _, Handlebars, Router) {
    'use strict';
    var app = new Marionette.Application();

    //Organize Application into regions corresponding to DOM elements
    //Regions can contain views, Layouts, or subregions nested as necessary

    app.addRegions({
        headerRegion: "#header",
        mainRegion: "#main"
    });

    var AngryCat = Backbone.Model.extend({});

    app.AngryCats = Backbone.Collection.extend({
        model: AngryCat
    });

    var AngryCatView = Backbone.Marionette.ItemView.extend({
        template: "#angry_cat-template",
        tagName: 'tr',
        className: 'angry_cat'
    });

    var AngryCatsView = Backbone.Marionette.CompositeView.extend({
        tagName: "table",
        id: "angry_cats",
        className: "table-striped table-bordered",
        template: "#angry_cats-template",
        itemView: AngryCatView,
        initialize: function(){
            this.listenTo(this.collection, "sort", this.renderCollection);
        },
        appendHtml: function(collectionView, itemView){
            collectionView.$("tbody").append(itemView.el);
        }
    });

    app.addInitializer(function(options){
        var angryCatsView = new AngryCatsView({
            collection: options.cats
        });
        app.mainRegion.show(angryCatsView);
    });

    // http://davidsulc.com/blog/2012/04/15/a-simple-backbone-marionette-tutorial/

    return app;
}($, Backbone, Marionette, _, Handlebars, Router));

$(document).ready(function(){
    var cats = new app.AngryCats([
        { name: 'Wet Cat' },
        { name: 'Bitey Cat' },
        { name: 'Surprised Cat' }
    ]);

    app.start({cats: cats});
});