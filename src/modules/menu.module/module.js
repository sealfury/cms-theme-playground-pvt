// Website header variables

var menuParentItems = document.querySelectorAll(
  '.menu--desktop .menu__item--has-submenu'
);
var childToggle = document.querySelectorAll(
  '.menu--mobile .menu__child-toggle'
);
var overlay = document.querySelectorAll('.overlay');

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
    // Menu item variables
    var childToggle = el.querySelector('.menu__child-toggle');

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

    // Handles toggle of submenus
    childToggle.addEventListener('click', function () {
      var overlay = document.getElementById('overlay');
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
            sibling.querySelector('a').setAttribute('aria-expanded', 'false');
            sibling
              .querySelector('button')
              .setAttribute('aria-expanded', 'false');
            // console.log(sibling);
          }
        });

        overlay.classList.add('show-overlay');
      }
    });
  });
}

// Mobile menu

// Handles toggle of submenus

if (childToggle) {
  Array.prototype.forEach.call(childToggle, function (el) {
    el.addEventListener('click', function () {
      this.classList.toggle('menu__child-toggle--open');
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
