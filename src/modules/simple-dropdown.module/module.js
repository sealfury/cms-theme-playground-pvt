// Menu variables
var parentMenuItems = document.querySelectorAll(
  '.top-menu .top-menu__item--has-submenu'
);
var menuChildToggle = document.querySelectorAll(
  '.top-menu--mobile .top-menu__child-toggle'
);

// Document variables
var mainContent = document.getElementById('main-content');
var headerBottomRow = document.querySelector('.header__row-2');
var headerLogo = document.querySelector('.header__logo');
var outsideElements = Array.from([mainContent, headerBottomRow, headerLogo]);

if (parentMenuItems) {
  parentMenuItems.forEach(function (item) {
    var menuChildToggle = item.querySelector('.top-menu__child-toggle');
    var childToggleLink = item.querySelector('.top-menu__link--toggle');
    var childToggles = Array.from([menuChildToggle, childToggleLink]);

    childToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        if (this.parentNode.classList.contains('top-menu__item--open')) {
          this.parentNode.classList.remove('top-menu__item--open');
          this.parentNode
            .querySelector('a')
            .setAttribute('aria-expanded', 'false');
          this.parentNode
            .querySelector('button')
            .setAttribute('aria-expanded', 'false');
        } else {
          this.parentNode.classList.add('top-menu__item--open');
          this.parentNode
            .querySelector('a')
            .setAttribute('aria-expanded', 'true');
          this.parentNode
            .querySelector('button')
            .setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  // Close open top menu dropdowns on click outside
  outsideElements.forEach(function (element) {
    element.addEventListener('click', function () {
      parentMenuItems.forEach(function (p) {
        if (p.classList.contains('top-menu__item--open')) {
          p.classList.remove('top-menu__item--open');
        }
      });
    });
  });
}
