describe('dom-i18n', function() {

  'use strict';

  var forEach = Array.prototype.forEach;
  var createElement = window.document.createElement.bind(window.document);
  var getElementById = window.document.getElementById.bind(window.document);

  beforeEach(function () {

    var rootElem = window.document.body;

    function createTextNode(id, text) {
      var childElem = createElement('span');
      childElem.id = id;
      childElem.textContent = text;
      childElem.dataset.translatable = true;
      return childElem;
    }

    (function createDefaultTest() {
      rootElem.appendChild(
        createTextNode(
          'hello-world',
          'Hello world // Bonjour monsieur/madame // Mundão velho sem porteira'
        )
      );
    })();

  });

  it('should get default language using default parameters', function() {

    window.domI18n();

    expect(
      getElementById('hello-world').textContent
    ).toEqual('Hello world');

  });

});
