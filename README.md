# dom-i18n

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Code coverage][coveralls-image]][coveralls-url]

> Provides a very basic HTML multilingual support using JavaScript


## About

This is a lightweight JavaScript library that offers an alternative for supporting internationalization on HTML static pages that have no better option than to serve many languages at once.

*Please note that this is a hacky way of integrating internationalization support into your application and its use probably only makes sense when you have big limitations, such as having zero control over the server-side code.*


## Usage

Just add the script into your html file and invoke the `domI18n` method:

```html
  <script src="../dist/dom-i18n.js"></script>
  <script>
    window.domI18n();
  </script>
```


## Options

The script is highly configurable, many options are available when invoking the `domI18n` method that allows the customization of your multi language support.

Here is the complete list of properties you can set on startup:

- **rootElement**:[HtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) - Container element used to narrow the lookup for translatable elements, can be used to define more restricted translatable areas on your page, defaults to `window.document`.
- **selector**:string | array-like object - Defines which objects have multilingual support, can be a [query selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) string or an array like object, such as a [jQuery](https://jquery.com/) selector. Defaults to a `'[data-translatable]'` query selector string.
- **separator**:string - A string that will be used to separate the different languages on your element, defaults to `' // '`.
- **languages**:array - The main source to define what languages the translation should support, please note that the languages should be listed on the same order as they appear here. Defaults to a `['en']` array.
- **defaultLanguage**:string - Defines a default language to be used in the application. Should be a string reference to one of the languages defined on the `languages` array. Defaults to `'en'`.
- **currentLanguage**:string - Defines the language to be used when starting the transation script, defaults to `'en'`.
- **translatableAttr**:string - Reference to a [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) attribute name that points to an element text attribute that should be tranlsated, useful when you want to translate attributes such as `title`, `alt` or similar. Defaults to `'data-translatable-attr'`.

### Example:

Below is an example of initializing `domI18n` with the most common used options:

```html
  <h1 data-translatable>Hello world // Bonjour le monde</h1>
  <p data-translatable>The quick brown fox jumps over the lazy dog. // Le rapide renard marron saute par-dessus le chien paresseux.</p>
  <script src="../dist/dom-i18n.js"></script>
  <script>
    window.domI18n({
      selector: '[data-translatable]',
      separator: ' // ',
      languages: ['en', 'fr'],
      defaultLanguage: 'en'
    });
  </script>
```


## API

The `domI18n` method also returns an object providing a `changeLanguage` method to change the language on the fly. That can be very useful for setting up a **language selection** interface.

```js
var i18n = window.domI18n({
  selector: '[data-translatable]',
  separator: ' // ',
  languages: ['en', 'fr'],
  defaultLanguage: 'en'
});

i18n.changeLanguage('fr');
```


## License

MIT © [Ruy Adorno](http://ruyadorno.com/)

[npm-url]: https://npmjs.org/package/dom-i18n
[npm-image]: https://badge.fury.io/js/dom-i18n.svg
[travis-url]: https://travis-ci.org/ruyadorno/dom-i18n
[travis-image]: https://travis-ci.org/ruyadorno/dom-i18n.svg?branch=master
[coveralls-url]: https://coveralls.io/r/ruyadorno/dom-i18n
[coveralls-image]: https://img.shields.io/coveralls/ruyadorno/dom-i18n/master.svg

