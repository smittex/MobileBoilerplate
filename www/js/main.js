require.config({
    baseUrl: 'js',
    paths: {
        zepto:      'lib/zepto',
        deferred:   'lib/Deferred',
        underscore: 'lib/underscore',
        backbone:   'lib/backbone',
        marionette: 'lib/backbone.marionette',
        handlebars: 'lib/handlebars',
        templates:  'templates'
    },
    shim: {
        deferred: {
            exports: 'Deferred'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        zepto: {
            exports: 'Zepto'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['zepto', 'underscore'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['zepto', 'deferred', 'underscore', 'backbone'],
            exports: 'Marionette'
        }
    }
});

require(['app'], function (app) {
    app.initialize();
});

require(['zepto', 'modules/moduleA', 'modules/moduleB'], function ($, moduleA, moduleB) {
    $('body')
        .prepend(moduleA.html)
        .prepend(moduleB.html);

    var lib;
    if (window.jQuery) {
        lib = 'jQuery';
    }
    if (window.Zepto) {
        lib = 'Zepto';
    }

    $('body').append('<p>Using: <code>' + lib + '</code></p>')
});