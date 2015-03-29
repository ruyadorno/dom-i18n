(function (window) {

  'use strict';

  function getCurrentLanguage() {
    var lang = window.navigator.languages ?
      window.navigator.languages[0] :
      (window.navigator.language || window.navigator.userLanguage);

    return lang.indexOf('-') ? lang.split('-')[0] : lang;
  }

  function domI18n(options) {

    options = options || {};

    var rootElement = options.rootElement || window.document;
    var selector = options.selector || '[data-translatable]';
    var separator = options.separator || ' // ';
    var defaultLanguage = options.defaultLanguage || 'en';
    var languages = options.languages || ['en'];
    var translatableAttr = 'data-translatable-attr';
    var currentLanguage = getCurrentLanguage();

    function hasCurrentLanguage() {
      return languages.indexOf(currentLanguage) > -1;
    }

    function getLanguageIndex() {
      var index = languages.indexOf(currentLanguage);
      return index > -1 ? index : languages.indexOf(defaultLanguage);
    }

    function translateString(value) {
      return value.split(separator)[getLanguageIndex()];
    }

    function translateElement(elem) {
      var attr = elem.getAttribute(translatableAttr);
      if (attr) {
        elem[attr] = translateString(elem[attr]);
      } else {
        elem.textContent = translateString(elem.textContent);
      }
    }

    function translateElements() {
      var elems = rootElement.querySelectorAll(selector);
      for (var i = 0; i < elems.length; ++i) {
        translateElement(elems[i]);
      }
    }

    translateElements(selector);
  }

  window.domI18n = domI18n;

})(window);

