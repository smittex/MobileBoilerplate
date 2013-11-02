require.config({
    baseUrl: 'js',
    paths: {
/*
        jquery:         'lib/jquery',
*/
        zepto:          'lib/zepto',
        'handlebars':  'components/handlebars/handlebars.runtime',
        'deferred':    'lib/deferred',
        'zepto-custom': 'lib/zepto-custom'
    },
/*    map: {
        '*': {
            'zepto': 'zepto-custom'
        },
        'zepto-custom': {
            'zepto': 'zepto'
        }
    },*/
    shim: {
        deferred: {
            exports: 'Deferred'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        zepto: {
            exports: 'Zepto'
        }
    }
});

require(['app'], function(app) {
    app();
});

require(['zepto', 'modules/moduleA', 'modules/moduleB'], function($, moduleA, moduleB) {
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