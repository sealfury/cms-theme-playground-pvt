// Website header variables

var menuParentItems = document.querySelectorAll(
  '.menu--custom .menu__item--has-submenu'
);
var childToggle = document.querySelectorAll(
  '.menu--mobile .menu__child-toggle'
);
var mobileBackToggle = document.querySelectorAll(
  '.menu--mobile .menu__child-toggle-mobile'
);
var overlay = document.getElementById('overlay');
var mainContent = document.getElementById('main-content');
var dropdownSubmenus = document.querySelectorAll('.menu__item--depth-2');
var productsMenuItems = document.querySelectorAll('.menu__item--depth-1');

// Get element siblings
const getElementSiblings = function (el) {
  let siblings = [];

  if (!el.parentNode) {
    return siblings;
  }

  let sibling = el.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== el) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

// Desktop menu

if (menuParentItems) {
  Array.prototype.forEach.call(menuParentItems, function (el) {
    if (el.classList.contains('menu__item--depth-1')) {
      // Menu item variables
      var childToggle = el.querySelector('.menu__child-toggle');
      var toggleText = el.querySelector('.menu__link--toggle');
      var clickableItems = Array.from([childToggle, toggleText]);

      // DOM Manipulation helper functions
      var closeTopMenus = function (queryClass, openClass) {
        var menuItems = document.querySelectorAll(queryClass);
        menuItems.forEach(function (item) {
          if (item.classList.contains(openClass)) {
            item.classList.remove(openClass);
          }
        });
      };

      var getSiblings = function (element) {
        var siblings = [];
        var sibling = element.parentNode.firstChild;
        while (sibling) {
          if (sibling.nodeType === 1 && sibling !== element) {
            siblings.push(sibling);
          }
          sibling = sibling.nextSibling;
        }
        return siblings;
      };

      /**
       * OBS - Prev version of event listener is in Menu module's JS
       */

      // Handle toggle of submenus on click of parent item text or icon
      clickableItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
          var parentSiblings = getSiblings(this.parentNode);

          if (this.parentNode.classList.contains('menu__item--open')) {
            this.parentNode.classList.remove('menu__item--open');
            this.parentNode
              .querySelector('a')
              .setAttribute('aria-expanded', 'false');
            this.parentNode
              .querySelector('button')
              .setAttribute('aria-expanded', 'false');

            overlay.classList.remove('show-overlay');
          } else {
            this.parentNode.classList.add('menu__item--open');
            this.parentNode
              .querySelector('a')
              .setAttribute('aria-expanded', 'true');
            this.parentNode
              .querySelector('button')
              .setAttribute('aria-expanded', 'true');

            // Close all open dropdowns except nav item clicked
            parentSiblings.forEach(function (sibling) {
              if (sibling.classList.contains('menu__item--open')) {
                sibling.classList.remove('menu__item--open');
                sibling
                  .querySelector('a')
                  .setAttribute('aria-expanded', 'false');
                sibling
                  .querySelector('button')
                  .setAttribute('aria-expanded', 'false');
              }
            });

            // Close top menu on main menu open
            var topMenuItemClass = '.top-menu--desktop .top-menu__item';
            var topMenuOpenClass = 'top-menu__item--open';
            closeTopMenus(topMenuItemClass, topMenuOpenClass);

            // Toggle overlay
            overlay.classList.add('show-overlay');

            e.preventDefault();
          }
        });
      });
    }
  });

  // Close dropdown on click outside
  mainContent.addEventListener('click', function () {
    menuParentItems.forEach(function (el) {
      if (el.classList.contains('menu__item--open')) {
        el.classList.remove('menu__item--open');
        overlay.classList.remove('show-overlay');
      }
    });
  });
}

// Assign classes for targeted styling of various nav dropdowns
if (dropdownSubmenus) {
  dropdownSubmenus.forEach(function (submenu) {
    if (submenu.parentNode.classList.contains('client-cases')) {
      var childMenu = submenu.querySelectorAll('.menu__submenu--level-3');
      childMenu.forEach(function (menu) {
        var links = menu.querySelectorAll('.menu__link');
        links.forEach(function (l) {
          l.classList.add('menu__link--client-cases');
        });
      });
    }
  });
}

if (productsMenuItems) {
  productsMenuItems.forEach(function (item) {
    if (item.classList.contains('menu__item--products')) {
      var submenuItems = item.querySelectorAll('.menu__submenu--level-3');
      submenuItems.forEach(function (i) {
        i.classList.add('menu__submenu--products');
      });
    }
  });
}

// Mobile menu

// Handles toggle of submenus

if (window.innerWidth < 767) {
  var mobileHeader = document.querySelector('.header__container.mobile');
  var menuMobile = mobileHeader.querySelector('.menu');
  menuMobile.classList.add('menu--mobile');
}

if (childToggle) {
  Array.prototype.forEach.call(childToggle, function (el) {
    el.addEventListener('click', function () {
      this.classList.toggle('menu__child-toggle--open');
      this.parentNode.classList.toggle('menu__item--open');
      if (this.parentNode.classList.contains('menu__item--open')) {
        this.parentNode.classList.remove('menu__item--open');
        this.parentNode
          .querySelector('a')
          .setAttribute('aria-expanded', 'false');
        this.parentNode
          .querySelector('button')
          .setAttribute('aria-expanded', 'false');
      } else {
        this.parentNode.classList.add('menu__item--open');
        this.parentNode
          .querySelector('a')
          .setAttribute('aria-expanded', 'true');
        this.parentNode
          .querySelector('button')
          .setAttribute('aria-expanded', 'true');
      }
    });
  });
}

if (mobileBackToggle) {
  mobileBackToggle.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var parentMenuItem = toggle.parentNode.parentNode.parentNode;
      if (parentMenuItem.classList.contains('menu__item--open')) {
        parentMenuItem.classList.remove('menu__item--open');
        parentMenuItem
          .querySelector('a')
          .setAttribute('aria-expanded', 'false');
        parentMenuItem
          .querySelector('button')
          .setAttribute('aria-expanded', 'false');
      } else {
        parentMenuItem.classList.add('menu__item--open');
        parentMenuItem.querySelector('a').setAttribute('aria-expanded', 'true');
        parentMenuItem
          .querySelector('button')
          .setAttribute('aria-expanded', 'true');
      }
    });
  });
}
