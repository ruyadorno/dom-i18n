# dom-i18n

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Code coverage][coveralls-image]][coveralls-url]

> Provides a very basic HTML multilingual support using JavaScript

http://ruyadorno.github.io/dom-i18n

[![Sauce Test Status](https://saucelabs.com/browser-matrix/ruyadorno-2.svg)](https://saucelabs.com/u/ruyadorno-2)


## About

This is a **lightweight** (less than 1KB minified/gzipped) JavaScript module that offers an alternative for supporting internationalization on HTML static pages that have no better option than to serve many languages at once.

It's a smart way of providing support to multiple languages without having to rely on many HTML files, it will also not require a page reload to change languages. The original requirement for creating this script was to provide multilingual support to a CMS in which I only had control to its template code (in my case it was a [Shopify](http://www.shopify.com/) store) but the script is very flexible and can be used in any HTML page.

**Features:** UMD definition, IE9+ support, examples provided.

## Usage

Just add the script in your HTML file, then invoke the `domI18n` method defining the languages you will support:

```html
  <script src="../dist/dom-i18n.min.js"></script>
  <script>
    domI18n({
      languages: ['en', 'fr']
    });
  </script>
```

Mark what elements should be translatable within your page by adding a `data-translatable` attribute:

```html
  <h1 data-translatable></h1>
```

### Two simple ways to specify translations

Both methods can be used at the same time in an HTML page, just make sure that you don't mix them within the same **element**.

#### Using child elements

Inside your translatable element, define one child element for each language you support, in the same order as they appear in the `languages` property.

```html
  <h1 data-translatable>
    <span>Hello world</span>
    <span>Bonjour le monde</span>
  </h1>
```

This is the most flexible way of defining translations and it allows for the use of nested child elements! *If you need to support translated links, this is the only possible choice*

#### Using string separators

Just provide both language values separated by ` // ` - *note that this is the standard value and can be changed on the initialization options that we are going to cover in more detail below*.

```html
  <h1 data-translatable>Hello world // Bonjour le monde</h1>
```

This is the most simple way to define translations and is very useful if you're limited to a CMS interface.


## Options

The script is highly configurable, many options are available when invoking the `domI18n` method that allows the customization of your multi language support.

Here is the complete list of properties you can set on startup and their default values:

- **rootElement**:[HtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) - Container element used to narrow the lookup for translatable elements, can be used to define more restricted translatable areas on your page, defaults to `window.document`.
- **selector**:string | array-like object - Defines which objects have multilingual support, can be a [query selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) string or an array like object, such as a [jQuery](https://jquery.com/) selector. Defaults to a `'[data-translatable]'` query selector string.
- **separator**:string - A string that will be used to separate the different languages on your element, defaults to `' // '`.
- **languages**:array - The main source to define what languages the translation should support, please note that the languages should be listed on the same order as they appear here. Defaults to a `['en']` array.
- **defaultLanguage**:string - Defines a default language to be used in the application. Should be a string reference to one of the languages defined on the `languages` array. Defaults to `'en'`.
- **currentLanguage**:string - Defines the language to be used when starting the transation script, defaults to `'en'`.
- **translatableAttr**:string - Reference to a [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) attribute name that points to an element text attribute that should be tranlsated, useful when you want to translate attributes such as `title`, `alt` or similar. Defaults to `'data-translatable-attr'`.
- **enableLog**:boolean - If `true` log messages are enabled (e.g. error if language not found). Defaults to `true`.

### Example:

Below is an example of initializing `domI18n` with the most common used options:

```html
  <h1 data-translatable>Hello world // Bonjour le monde</h1>
  <p data-translatable>The quick brown fox jumps over the lazy dog. // Le rapide renard marron saute par-dessus le chien paresseux.</p>
  <script src="../dist/dom-i18n.js"></script>
  <script>
    domI18n({
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

- - -

*DISCLAIMER: Please note that this is a hacky way of integrating internationalization support into your application and its use probably only makes sense when you have big limitations, such as having zero control over the server-side code or no JavaScript framework in use.*


## License

MIT © [Ruy Adorno](http://ruyadorno.com/)

[npm-url]: https://npmjs.org/package/dom-i18n
[npm-image]: https://badge.fury.io/js/dom-i18n.svg
[travis-url]: https://travis-ci.org/ruyadorno/dom-i18n
[travis-image]: https://travis-ci.org/ruyadorno/dom-i18n.svg?branch=master
[coveralls-url]: https://coveralls.io/r/ruyadorno/dom-i18n
[coveralls-image]: https://img.shields.io/coveralls/ruyadorno/dom-i18n/master.svg

