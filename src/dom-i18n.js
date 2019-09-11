(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    // Also defines browser global reference.
    define([], function () {
      return (root.domI18n = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.domI18n = factory();
  }

}(this, function () {
// UMD Definition above, do not remove this line

// To get to know more about the Universal Module Definition
// visit: https://github.com/umdjs/umd


  'use strict';

  return function domI18n(options) {

    options = options || {};

    var rootElement = options.rootElement || window.document;
    var selector = options.selector || '[data-translatable]';
    var separator = options.separator || ' // ';
    var defaultLanguage = options.defaultLanguage || 'en';
    var languages = options.languages || ['en'];
    var enableLog = options.enableLog !== undefined ? options.enableLog : true;
    var noCacheAttr = 'data-no-cache';
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
        if (enableLog) {
          console.warn(
            lang + ' is not available on the list of languages provided'
          );
        }
        lang = lang.indexOf('-') ? lang.split('-')[0] : lang;
      }

      // In the case that the lang ref is really not in the
      // languages list, switchs to default language instead
      if (languages.indexOf(lang) === -1) {
        if (enableLog) {
          console.error(
            lang + ' is not compatible with any language provided'
          );
        }
        lang = defaultLanguage;
      }

      return lang;
    }

    function changeLanguage(lang) {
      currentLanguage = getLanguage(lang);
      translateElements();
    }

    function clearCachedElements() {
      translatableCache = {};
    }

    function hasCachedVersion(elem) {
      var id = elem.getAttribute('data-dom-i18n-id');
      return id &&
        translatableCache &&
        translatableCache[id];
    }

    function setCacheData(elem, content) {
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

    function getLanguageValues(elem, prop) {

      var translations = {};
      var hasChildren = elem.firstElementChild;
      var strings = !hasChildren && elem[prop].split(separator);

      languages.forEach(function (lang, index) {

        var child;

        if (hasChildren) {
          child = elem.children[index];
          if (child && child.cloneNode) {
            translations[lang] = child.cloneNode(true);
          }
        } else {
          child = strings[index];
          if (child) {
            translations[lang] = String(child);
          }
        }
      });

      return translations;
    }

    function translateElement(elem) {
      var attr = elem.getAttribute(translatableAttr);
      var noCache = elem.getAttribute(noCacheAttr) !== null;
      var prop = attr ? attr : 'textContent';
      var langObjs;
      var translated;

      if (!noCache && hasCachedVersion(elem)) {
        langObjs = getCachedData(elem);
      } else {
        langObjs = getLanguageValues(elem, prop);
        if(!noCache) {
          setCacheData(elem, langObjs);
        }
      }

      translated = langObjs[currentLanguage];

      if (typeof translated === 'string') {
        elem[prop] = translated;
      } else if (typeof translated === 'object') {
        translateChildren(elem, translated);
      }
    }

    function translateChildren(elem, translation) {
      cleanElement(elem);
      elem.appendChild(translation);
    }

    function cleanElement(elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    }

    // triggers the translation of all elements with the root element
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
      changeLanguage: changeLanguage,
      clearCachedElements: clearCachedElements
    };
  };

}));

