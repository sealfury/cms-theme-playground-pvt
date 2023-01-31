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

    if (window.innerWidth > 767) {
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
    }

    if (window.innerWidth < 767) {
      item.addEventListener('click', function () {
        var mobileSubmenuItem = this.nextSibling.nextSibling;
        var mobileSiblingItems = getSiblings(mobileSubmenuItem);
        var parentItemSiblings = getSiblings(this);

        if (
          !this.classList.contains('open') &&
          !mobileSubmenuItem.classList.contains('show')
        ) {
          this.classList.add('open');
        } else {
          this.classList.remove('open');
        }

        if (mobileSubmenuItem.classList.contains('show')) {
          mobileSubmenuItem.classList.remove('show');
        } else {
          mobileSubmenuItem.classList.add('show');
        }

        mobileSiblingItems.forEach(function (sibling) {
          if (
            sibling.classList.contains('cases-mobile') &&
            sibling.classList.contains('show')
          ) {
            sibling.classList.remove('show');
          }
        });

        parentItemSiblings.forEach(function (sibling) {
          if (
            sibling.classList.contains('teams-menu__menu--item') &&
            sibling.classList.contains('open')
          ) {
            sibling.classList.remove('open');
          }
        });
      });
    }
  });
}
