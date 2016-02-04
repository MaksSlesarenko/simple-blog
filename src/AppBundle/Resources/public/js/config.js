/**
 * Configuration example
 * @author Anton Shevchuk
 */
/*global define,require*/
require.config({
    // why not simple "js"? Because IE eating our minds!
    baseUrl: '/js',
    // if you need disable JS cache
    // urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        "": './bootstrap.min',
        "jquery": './jquery-2.2.0.min',
    },
    shim: {
        "bootstrap": {
            deps: ['jquery'],
            exports: '$.fn.popover'
        }
    },
    enforceDefine: true
});
