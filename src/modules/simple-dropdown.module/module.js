// Menu variables

var parentMenuItems = document.querySelectorAll(
  '.top-menu--desktop .top-menu__item--has-submenu'
);
var menuChildToggle = document.querySelectorAll(
  '.top-menu--mobile .top-menu__child-toggle'
);

if (parentMenuItems) {
  parentMenuItems.forEach(function (item) {
    var menuChildToggle = item.querySelector('.top-menu__child-toggle');
    var childToggleLink = item.querySelector('.top-menu__link--toggle');

    menuChildToggle.addEventListener('click', function () {
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

    childToggleLink.addEventListener('click', function () {
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
}
