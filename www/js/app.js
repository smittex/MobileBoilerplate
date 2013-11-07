var App = (function ($, Backbone, Marionette, _, Handlebars, Router) {
    'use strict';
    Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
        return Handlebars.compile(rawTemplate);
    };

    var App = new Marionette.Application();

    //Organize Application into regions corresponding to DOM elements
    //Regions can contain views, Layouts, or subregions nested as necessary

    App.addRegions({
        //headerRegion: "#header",
        mainRegion: "#main"
    });

    var AngryCat = Backbone.Model.extend({});

    App.AngryCats = Backbone.Collection.extend({
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

    App.addInitializer(function(options){
 /*       AppLayout = Backbone.Marionette.Layout.extend({

            template: tmpl,

            regions: {
                userInfo: "#userInfo",
                mainMenu: "#mainMenu",
                content: "#content"
            },

        });

      var layout = new AppLayout();
      App.main.show(layout);

      App.main.currentView.mainMenu.show(new mainMenuView.Views.menu());
      App.main.currentView.content.show(new dashboard.Views.main());

      // this can be a main menu navigation
      // this will change content at the "main" app screen
      // your links should include the role=nav-main-app

      $('a[role=nav-main-app]').click(function(e) {
      App.Router.navigate( $(this).attr('href'), {trigger: true});
      e.preventDefault();
      });
       */



        var angryCatsView = new AngryCatsView({
            collection: options.cats
        });
        App.mainRegion.show(angryCatsView);
    });

    App.on('initialize:after', function() {
        Backbone.history.start();
    })

    // http://davidsulc.com/blog/2012/04/15/a-simple-backbone-marionette-tutorial/

    return App;
}($, Backbone, Marionette, _, Handlebars, Router));

App.module('Layout', function(Layout, App, Backbone, Marionette, $, _) {
    Layout.Header = Marionette.ItemView.extend({
        template: '#header-template',
        events: {
            'click': 'onClick'
        },
        onClick: function() {
            alert('You clicked on the header!');
        }
    });
});

App.module('Assessments', function(Assessments, App, Backbone, Marionette, $, _) {
    Assessments.Detection = Backbone.Model.extend({
        defaults: {
            title: 'Detection',
            screens: ['cat-intro',
                      'select-assess',
                      'assess-intro',
                      'question-container'],
            class: 'detection'
        }
    });
});

App.module('Assessment', function(Assessment, App, Backbone, Marionette, $, _){
    Assessment.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'home':'home'
        }
    });

    Assessment.Controller = function() {
        this.assessment = new App.Assessments.Detection;
    }

    _.extend(Assessment.Controller.prototype, {
        start: function() {
            this.showHeader(this.assessment);
        },
        showHeader: function(Assessment) {
            var header = new App.Layout.Header({
                collection: Assessment
            })
            App.headerRegion.show(header);
        },
        home: function() {
            App.vent.trigger('home');
        }
    });

    App.vent.on('home', function() {
        console.log('\'home\' triggered');
    })

    Assessment.addInitializer(function() {
        var controller = new Assessment.Controller();
        new Assessment.Router({
            controller: controller
        });

        controller.start();
    });
});

$(document).ready(function(){
    var cats = new App.AngryCats([
        { name: 'Wet Cat' },
        { name: 'Bitey Cat' },
        { name: 'Surprised Cat' }
    ]);

    App.start({cats: cats});
});