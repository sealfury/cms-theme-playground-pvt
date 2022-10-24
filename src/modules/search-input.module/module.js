var search = function (_instance) {
  var TYPEAHEAD_LIMIT = 3;
  var KEYS = {
    TAB: 'Tab',
    ESC: 'Esc', // IE11 & Edge 16
    ESCAPE: 'Escape',
    UP: 'Up', // IE11 & Edge 16
    ARROW_UP: 'ArrowUp',
    DOWN: 'Down', // IE11 & Edge 16
    ARROW_DOWN: 'ArrowDown',
  };

  var searchTerm = '';
  var searchForm = _instance;
  var searchField = _instance.querySelector('.search-field__input');
  var searchResults = _instance.querySelector('.search-field__suggestions');
  var searchOptions = function () {
    var formParams = [];
    var form = _instance.querySelector('form');
    for (
      var i = 0;
      i < form.querySelectorAll('input[type=hidden]').length;
      i++
    ) {
      var e = form.querySelectorAll('input[type=hidden]')[i];

      if (e.name !== 'limit') {
        formParams.push(
          encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value)
        );
      }
    }
    var queryString = formParams.join('&');
    return queryString;
  };

  var debounce = function (fn, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) {
          fn.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);

      timeout = setTimeout(later, wait || 200);
      if (callNow) {
        fn.apply(context, args);
      }
    };
  };

  var emptySearchResults = function () {
    searchResults.innerHTML = '';
    searchField.focus();
    searchForm.classList.remove('search-field--open');
  };

  var fillSearchResults = function (res) {
    var items = [];
    items.push(
      "<li id='results-for'>Results for \"" + res.searchTerm + '"</li>'
    );
    res.results.forEach(function (val, index) {
      items.push(
        "<li id='result'" +
          index +
          "'><a href='" +
          val.url +
          "'>" +
          val.title +
          '</a></li>'
      );
    });

    emptySearchResults();
    searchResults.innerHTML = items.join('');
    searchForm.classList.add('search-field--open');
  };

  var getSearchResults = function () {
    var req = new XMLHttpRequest();
    var requestUrl =
      '/_hcms/search?&term=' +
      encodeURIComponent(searchTerm) +
      '&limit=' +
      encodeURIComponent(TYPEAHEAD_LIMIT) +
      '&autocomplete=true&analytics=true&' +
      searchOptions();

    req.open('GET', requestUrl, true);
    req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
        var data = JSON.parse(req.responseText);

        if (data.total > 0) {
          fillSearchResults(data);
          trapFocus();
        } else {
          emptySearchResults();
        }
      } else {
        console.error('Server reached. Error Retrieving results.');
      }
    };
    req.onerror = function () {
      console.error('Could not reach the server.');
    };
    req.send();
  };

  var trapFocus = function () {
    var tabbable = [];
    tabbable.push(searchField);
    var tabbables = searchResults.getElementByTagName('A');
    for (var i = 0; i < tabbables.length; i++) {
      tabbable.push(tabbables[i]);
    }
    var firstTabbable = tabbable[0];
    var lastTabbable = tabbable[tabbable.length - 1];

    var tabResult = function (e) {
      if (e.target == lastTabbable && !e.shiftKey) {
        e.preventDefault();
        firstTabbable.focus();
      } else if (e.target == firstTabbable && e.shiftKey) {
        e.preventDefault;
        lastTabbable.focus();
      }
    };

    var nextResult = function (e) {
      e.preventDefault();
      if (e.target == lastTabbable) {
        firstTabbable.focus();
      } else {
        tabbable.forEach(function (el) {
          if (el == e.target) {
            tabbable[tabbable.indexOf(el) + 1].focus();
          }
        });
      }
    };

    var lastResult = function (e) {
      e.preventDefault();
      if (e.target == firstTabbable) {
        lastTabbable.focus();
      } else {
        tabbable.forEach(function (el) {
          if (el == e.target) {
            tabbable[tabbable.indexOf(el) - 1].focus();
          }
        });
      }
    };

    searchForm.addEventListener('keydown', function (e) {
      switch (e.key) {
        case KEYS.TAB:
          tabResult(e);
          break;
        case KEYS.ESC:
        case KEYS.ESCAPE:
          emptySearchResults();
          break;
        case KEYS.UP:
        case KEYS.ARROW_UP:
          lastResult(e);
          break;
        case KEYS.DOWN:
        case KEYS.ARROW_DOWN:
          nextResult(e);
          break;
      }
    });
  };

  var isSearchTermPresent = debounce(function () {
      searchTerm = searchField.value;
      if (searchTerm.length > 2) {
        getSearchResults();
      } else if (searchTerm.length == 0) {
        emptySearchResults();
      }
    }, 250),
    init = (function () {
      searchField.addEventListener('input', function (e) {
        if (searchTerm != searchField.value) {
          isSearchTermPresent();
        }
      });
    })();
};

if (
  document.attachEvent
    ? document.readyState === 'complete'
    : document.readyState !== 'loading'
) {
  var searchResults = document.querySelectorAll('.search-field');
  Array.prototype.forEach.call(searchResults, function (el) {
    var searchModule = search(el);
  });
} else {
  document.addEventListener('DOMContentLoaded', function () {
    var searchResults = document.querySelectorAll('.search-field');
    Array.prototype.forEach.call(searchResults, function (el) {
      var searchModule = search(el);
    });
  });
}
