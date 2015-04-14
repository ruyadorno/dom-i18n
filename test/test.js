describe('dom-i18n', function() {

  'use strict';

  var createdIds = [];
  var forEach = Array.prototype.forEach;
  var createElement = window.document.createElement.bind(window.document);
  var getElementById = window.document.getElementById.bind(window.document);

  // suppress warn/error msgs on console tests
  window.console.warn = function() {};
  window.console.error = function() {};

  beforeEach(function () {

    var rootElem = window.document.body;

    function createTextNode(id, text) {
      return childElem;
    }

    (function createDefaultTest() {

      var childElem = createElement('span');
      childElem.id = 'hello-world';
      childElem.textContent =
        'Hello world // Bonjour Montréal // Mundão velho sem porteira';
      childElem.setAttribute('data-translatable', 'true');
      rootElem.appendChild(childElem);

      createdIds.push(childElem.id);
    })();

    (function createSingleLanguageTest() {

      var childElem = createElement('span');
      childElem.id = 'single-language';
      childElem.textContent =
        'Hello world';
      childElem.setAttribute('data-translatable', 'true');
      rootElem.appendChild(childElem);

      createdIds.push(childElem.id);
    })();

    (function createAttributeTest() {

      var childElem = createElement('img');
      childElem.id = 'attr-test';
      childElem.setAttribute('data-translatable', 'true');
      childElem.setAttribute('data-translatable-attr', 'title');
      childElem.title =
        'Hello world // Bonjour Montréal // Mundão velho sem porteira';
      rootElem.appendChild(childElem);

      createdIds.push(childElem.id);
    })();

    (function createChildrenTest() {

      var childElem = createElement('div');
      childElem.id = 'children-test';
      childElem.setAttribute('data-translatable', 'true');
      rootElem.appendChild(childElem);

      [
        'Hello world',
        'Bonjour Montréal',
        'Mundão velho sem porteira'
      ].forEach(function (item) {
        var child = createElement('span');
        child.textContent = item;
        childElem.appendChild(child);
      });

      createdIds.push(childElem.id);
    })();

    (function createChildrenWithLinksTest() {

      var childElem = createElement('div');
      childElem.id = 'children-links-test';
      childElem.setAttribute('data-translatable', 'true');
      rootElem.appendChild(childElem);

      [
        { text: 'Hello ', link: 'world' },
        { text: 'Bonjour ', link: 'le monde' },
        { text: 'Mundão ', link: 'velho sem porteira' }
      ].forEach(function (item) {
        var child = createElement('span');
        child.textContent = item.text;
        childElem.appendChild(child);

        var link = createElement('a');
        link.href = '#';
        link.textContent = item.link;
        child.appendChild(link);
      });

      createdIds.push(childElem.id);
    })();

    (function createSingleChildTest() {

      var childElem = createElement('div');
      childElem.id = 'single-children-test';
      childElem.setAttribute('data-translatable', 'true');
      rootElem.appendChild(childElem);

      var child = createElement('span');
      child.textContent = 'Hello ';
      childElem.appendChild(child);

      var link = createElement('a');
      link.href = '#';
      link.textContent = 'world';
      child.appendChild(link);

      createdIds.push(childElem.id);
    })();

    (function createIsolatedRegion() {

      var containerElem = createElement('div');
      containerElem.id = 'isolated-region';
      containerElem.setAttribute('data-translatable', 'true');
      rootElem.appendChild(containerElem);

      var childElem = createElement('span');
      childElem.id = 'hello-world-part-2';
      childElem.textContent =
        'Hello world // Bonjour Montréal // Mundão velho sem porteira';
      childElem.setAttribute('data-translatable', 'true');
      containerElem.appendChild(childElem);

      createdIds.push(containerElem.id);

    })();

  });

  afterEach(function () {

    createdIds.forEach(function (id, index) {

      var elem = getElementById(id);
      var parent = elem.parentNode;

      parent.removeChild(elem);
    });

    createdIds = [];

  });

  it('should get default language using default parameters', function() {

    window.domI18n();

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Hello world');

  });

  it('should get second language listed on default example', function() {

    window.domI18n({
      languages: ['en', 'fr-ca', 'pt-br'],
      currentLanguage: 'fr-ca'
    });

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Bonjour Montréal');

  });

  it('should use a simpler lang ref in case language is not found', function() {

    window.domI18n({
      languages: ['en', 'fr', 'pt'],
      currentLanguage: 'pt-br'
    });

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Mundão velho sem porteira');

  });

  it('should use default language if provided ref is not found', function() {

    window.domI18n({
      languages: ['en', 'fr', 'pt'],
      defaultLanguage: 'fr',
      currentLanguage: 'es'
    });

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Bonjour Montréal');

  });

  it('should also work for specified attributes', function() {

    window.domI18n({
      languages: ['en', 'fr', 'pt'],
      defaultLanguage: 'en',
      currentLanguage: 'pt'
    });

    expect(
      getElementById('attr-test').title
    ).toEqual('Mundão velho sem porteira');

  });

  it('should be able to change languages', function() {

    var i18n = window.domI18n({
      languages: ['en', 'fr-ca', 'pt-br'],
      currentLanguage: 'en'
    });

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Hello world');

    i18n.changeLanguage('fr-ca');

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Bonjour Montréal');

  });

  it('should be able to switch languages back and forth', function() {

    var i18n = window.domI18n({
      languages: ['en', 'fr-ca', 'pt-br'],
      currentLanguage: 'en'
    });

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Hello world');

    i18n.changeLanguage('fr-ca');

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Bonjour Montréal');

    i18n.changeLanguage('en');

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Hello world');

    i18n.changeLanguage('pt-br');

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Mundão velho sem porteira');

    i18n.changeLanguage('fr-ca');

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Bonjour Montréal');

  });

  it('should work with a single language', function() {

    window.domI18n();

    expect(
      getElementById('single-language').textContent
    ).toEqual('Hello world');

  });

  it('should work with a single text on many languages context', function() {

    window.domI18n({
      languages: ['en', 'fr-ca', 'pt-br'],
      currentLanguage: 'en'
    });

    expect(
      getElementById('single-language').textContent
    ).toEqual('Hello world');

  });

  it('should use default language if current is missing', function() {

    window.domI18n({
      languages: ['en', 'fr-ca', 'pt-br'],
      currentLanguage: 'pt-br'
    });

    expect(
      getElementById('single-language').textContent
    ).toEqual('Hello world');

  });

  it('should work when using children elements for lang def', function() {

    window.domI18n({
      languages: ['en', 'fr-ca', 'pt-br'],
      currentLanguage: 'en'
    });

    expect(
      getElementById('children-test').textContent
    ).toEqual('Hello world');
  });

  it('should be capable of handling nested children', function() {

    window.domI18n({
      languages: ['en', 'fr-ca', 'pt-br'],
      currentLanguage: 'en'
    });

    expect(
      getElementById('children-links-test')
        .firstElementChild.textContent
    ).toEqual('Hello world');

  });

  it('should be capable of change langs on nested children', function() {

    var i18n = window.domI18n({
      languages: ['en', 'fr-ca', 'pt-br'],
      currentLanguage: 'en'
    });

    expect(
      getElementById('children-links-test')
        .firstElementChild.textContent
    ).toEqual('Hello world');

    i18n.changeLanguage('fr-ca');

    expect(
      getElementById('children-links-test')
        .firstElementChild.textContent
    ).toEqual('Bonjour le monde');

  });

  it('should translate isolated regions when using rootElement', function() {

    window.domI18n({
      rootElement: getElementById('isolated-region'),
      languages: ['en', 'fr-ca', 'pt-br'],
      currentLanguage: 'fr-ca'
    });

    // Should not change other elements texts
    expect(
      getElementById('hello-world').textContent
    ).toEqual('Hello world // Bonjour Montréal // Mundão velho sem porteira');

    // expect child element to be translated
    expect(
      getElementById('hello-world-part-2').textContent
    ).toEqual('Bonjour Montréal');

  });

  it('single child should be treated as elements', function() {

    var i18n = window.domI18n({
      languages: ['en', 'fr-ca', 'pt-br'],
      currentLanguage: 'en'
    });

    expect(
      getElementById('single-children-test')
        .firstElementChild.textContent
    ).toEqual('Hello world');

    // link text should be world
    expect(
      getElementById('single-children-test')
        .firstElementChild.firstElementChild.textContent
    ).toEqual('world');

  });

});

