define(["management/app","localstorage"],function(){
  var findStorageKey = function (entity) {
    // use a model's urlRoot value
    if (entity.urlRoot) {
      return _.result(entity, "urlRoot");
    }
    // use a collection's url value
    if (entity.url) {
      return _.result(entity, "url");
    }

    throw new Error("Unable to determine storage key");
  };

  var StorageMixin = function (entityPrototype) {
    var storageKey = findStorageKey(entityPrototype);
    return {localStorage: new Backbone.LocalStorage(storageKey)};
  };

  return configureStorage = function(entity){
    _.extend(entity.prototype, new StorageMixin(entity.prototype));
  };
});