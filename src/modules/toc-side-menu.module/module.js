var chapterLinks = document.querySelectorAll('.toc-sidebar__menu--link');
var pathLinkParam = window.location.href.split('#')[1];

chapterLinks.forEach(function (link) {
  if (link.getAttribute('data-link-params') == pathLinkParam) {
    link.classList.add('active-page');
  } else {
    link.classList.remove('active-page');
  }
});

// TODO: SEARCH FOR ANCHOR BY ID IN RICH TEXT AND HIDE ONES NOT EQUAL WINDOW HREF