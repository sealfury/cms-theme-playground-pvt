(function () {
  // Variables
  var nav = document.querySelector('.header__navigation');
  var langSwitcher = document.querySelector('.header__language-switcher');
  var search = document.querySelector('.header__search');
  var allToggles = document.querySelectorAll('.header--toggle');
  var navToggle = document.querySelector('.header__navigation--toggle');
  var langToggle = document.querySelector('.header__language-switcher--toggle');
  var searchToggle = document.querySelector('.header__search--toggle');
  var closeToggle = document.querySelector('.header__close--toggle');
  var allElements = document.querySelectorAll(
    '.header--element, .header__navigation--toggle, .header__row-2'
  );
  var emailGlobalUnsub = document.querySelector('input[name="globalunsub"]');
  var header = document.querySelector('header');
  var mobileHeader = document.querySelector('.header__container.mobile');
  var headerBottomRow = mobileHeader.querySelector('.header__row-2');
  var mainContent = document.querySelector('main');
  var footer = document.querySelector('footer');

  // Functions

  // Function for executing code on document ready
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  // Function to toggle scroll class in header
  function toggleScrollClass() {
    // console.log(window.scrollY);
    if (window.innerWidth > 767) {
      if (window.scrollY > 94) {
        header.classList.add('scroll');
      }

      if (window.scrollY < 96) {
        header.classList.remove('scroll');
      }
    }
  }

  function hideContentOnToggle() {
    closeToggle.addEventListener('click', function () {
      if (this.classList.contains('show')) {
        this.classList.remove('show');
        navToggle.classList.remove('open');
        headerBottomRow.classList.remove('open');
        nav.classList.remove('open');
      }

      if (mainContent.classList.contains('hide-on-open-mobile')) {
        mainContent.classList.remove('hide-on-open-mobile');
      }

      if (footer.classList.contains('hide-on-open-mobile')) {
        footer.classList.remove('hide-on-open-mobile');
      }
    });
  }

  // Function for toggling mobile navigation
  function toggleNav() {
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
    headerBottomRow.classList.toggle('open');
    closeToggle.classList.toggle('show');

    if (window.innerWidth < 767) {
      mainContent.classList.toggle('hide-on-open-mobile');
      footer.classList.toggle('hide-on-open-mobile');
    }

    if (window.innerWidth < 767) {
      hideContentOnToggle();
    }
  }

  // Function for toggling mobile language selector
  function toggleLang() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    langSwitcher.classList.toggle('open');
    langToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for toggling mobile search field
  function toggleSearch() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    search.classList.toggle('open');
    searchToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for the header close option on mobile
  function closeAll() {
    allElements.forEach(function (element) {
      element.classList.remove('hide', 'open');
    });

    closeToggle.classList.remove('show');
  }

  // Function to disable the other checkbox inputs on the email subscription system page template
  function toggleDisabled() {
    var emailSubItem = document.querySelectorAll('#email-prefs-form .item');

    emailSubItem.forEach(function (item) {
      var emailSubItemInput = item.querySelector('input');

      if (emailGlobalUnsub.checked) {
        item.classList.add('disabled');
        emailSubItemInput.setAttribute('disabled', 'disabled');
        emailSubItemInput.checked = false;
      } else {
        item.classList.remove('disabled');
        emailSubItemInput.removeAttribute('disabled');
      }
    });
  }

  // Function to add focus ring if user is navigating with keyboard
  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }

  // Function to globally prevent addition of hsLang query strings to anchor tags
  function skipLangUrlRewrite() {
    var anchorElements = document.querySelectorAll('a');
    anchorElements.forEach(function (el) {
      if (!el.classList.contains('hs-skip-lang-url-rewrite')) {
        el.classList.add('hs-skip-lang-url-rewrite');
      }
    });

    var headerLinks = headerBottomRow.querySelectorAll('a');
    headerLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href.endsWith('?hsLang=de') || href.endsWith('?hsLang=sv')) {
        var newHref = href.slice(-0, -10);
        link.setAttribute('href', newHref);
        /*
         * var newHref = href.split('?')[0]
         * if (newHref == '') {
         *   newHref += '/'
         * }
         */
      }
    });
  }

  document.addEventListener('DOMContentLoaded', skipLangUrlRewrite);

  // Execute JavaScript on document ready
  domReady(function () {
    if (!document.body) {
      return;
    } else {
      // Function dependent on language switcher
      if (langSwitcher) {
        langToggle.addEventListener('click', toggleLang);
      }

      // Function dependent on navigation
      if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
      }

      // Function dependent on search field
      if (searchToggle) {
        searchToggle.addEventListener('click', toggleSearch);
      }

      // Function dependent on close toggle
      if (closeToggle) {
        closeToggle.addEventListener('click', closeAll);
      }

      // Function dependent on email unsubscribe from all input
      if (emailGlobalUnsub) {
        emailGlobalUnsub.addEventListener('change', toggleDisabled);
      }

      // Add keydown listener
      window.addEventListener('keydown', handleFirstTab);

      // Add scroll event listener for header transform
      document.addEventListener('scroll', toggleScrollClass);
      document.addEventListener('DOMContentLoaded', toggleScrollClass);
    }
  });
})();
