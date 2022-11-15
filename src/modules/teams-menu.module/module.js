// Nodule variables
var menuItems = document.querySelectorAll('.teams-menu__menu--item');
var subMenuItems = document.querySelectorAll('.teams-menu__cases');

// Show relevant submenu on hover of menu items, hide only on hover of siblings (not mouseout)
if (menuItems && subMenuItems) {
  menuItems.forEach(function (item, index) {
    const getSiblings = function (el) {
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

    var i = (index + 1).toString();

    item.addEventListener('mouseover', function () {
      var subMenuItem = this.parentNode.parentNode.querySelector(
        '.cases--' + i
      );
      var siblingItems = getSiblings(subMenuItem);

      if (!subMenuItem.classList.contains('show')) {
        subMenuItem.classList.add('show');
      }

      siblingItems.forEach(function (sibling) {
        if (sibling.classList.contains('show')) {
          sibling.classList.remove('show');
        }
      });
    });
  });
}
