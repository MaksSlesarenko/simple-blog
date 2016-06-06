require.config({
  baseUrl: '/js',
  paths: {
    '': './vendor/bootstrap.js',
    'jquery': './vendor/jquery-2.2.0.min.js'
  },
  shim: {
    'bootstrap': {
        deps: ['jquery'],
        exports: '$.fn.popover'
    }
  },
  enforceDefine: true
});
