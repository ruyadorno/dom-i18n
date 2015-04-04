(function () {

  'use strict';

  function domI18n(options) {

    options = options || {};

    var rootElement = options.rootElement || window.document;
    var selector = options.selector || '[data-translatable]';
    var separator = options.separator || ' // ';
    var defaultLanguage = options.defaultLanguage || 'en';
    var languages = options.languages || ['en'];
    var translatableAttr = 'data-translatable-attr';
    var translatableCache = {};
    var currentLanguage = getLanguage(options.currentLanguage);

    function getLanguage(lang) {

      // If no current language was provided, uses default browser language
      if (!lang) {
        lang = window.navigator.languages ?
          window.navigator.languages[0] :
          (window.navigator.language || window.navigator.userLanguage);
      }

      // If language isn't on languages arr, try using a less specific ref
      if (languages.indexOf(lang) === -1) {
        console.warn(
          lang + ' is not available on the list of languages provided'
        );
        lang = lang.indexOf('-') ? lang.split('-')[0] : lang;
      }

      // In the case that the lang ref is really not in the
      // languages list, switchs to default language instead
      if (languages.indexOf(lang) === -1) {
        console.error(
          lang + ' is not compatible with any language provided'
        );
        lang = defaultLanguage;
      }

      return lang;
    }

    function changeLanguage(lang) {
      currentLanguage = getLanguage(lang);
      translateElements();
    }

    function hasCachedVersion(elem) {
      var id = elem.getAttribute('data-dom-i18n-id');
      return id &&
        translatableCache &&
        translatableCache[id];
    }

    function getLanguageIndex() {
      var index = languages.indexOf(currentLanguage);
      return index > -1 ? index : languages.indexOf(defaultLanguage);
    }

    function translateString(value) {
      return value.split(separator)[getLanguageIndex()];
    }

    function cacheOriginalData(elem, content) {
      var elemId = 'i18n' + Date.now() + (Math.random() * 1000);
      elem.setAttribute('data-dom-i18n-id', elemId);
      translatableCache[elemId] = content;
    }

    function getCachedData(elem) {
      return translatableCache &&
        translatableCache[
          elem.getAttribute('data-dom-i18n-id')
        ];
    }

    function translateElement(elem) {
      var attr = elem.getAttribute(translatableAttr);
      var prop = attr ? attr : 'textContent';
      var translated;

      if (hasCachedVersion(elem)) {
        translated = translateString(getCachedData(elem));
      } else {
        cacheOriginalData(elem, elem[prop]);
        translated = translateString(elem[prop]);
      }

      elem[prop] = translated;
    }

    function translateElements() {
      var elems = (typeof selector == 'string' || selector instanceof String) ?
        rootElement.querySelectorAll(selector) :
        selector;
      for (var i = 0; i < elems.length; ++i) {
        translateElement(elems[i]);
      }
    }

    translateElements(selector);

    return {
      changeLanguage: changeLanguage
    };
  }

  window.domI18n = domI18n;

})();

