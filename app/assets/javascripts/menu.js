(function attachMenu(window, document) {
  if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', attachMenu.bind(null, window, document));
    return;
  }
  var layout   = document.getElementById('layout'),
      menu     = document.getElementById('menu'),
      menuLink = document.getElementById('menuLink');

  function toggleClass(element, className) {
    if (element.classList.toggle) {
      return element.classList.toggle(className);
    }

    var classes = element.className.split(/\s+/),
        length = classes.length,
        i = 0;

    for(; i < length; i++) {
      if (classes[i] === className) {
        classes.splice(i, 1);
        break;
      }
    }
    // The className is not found
    if (length === classes.length) {
      classes.push(className);
    }

    element.className = classes.join(' ');
  }

  menuLink.onclick = function (e) {
    var active = 'active';

    e.preventDefault();
    toggleClass(layout, active);
    toggleClass(menu, active);
    toggleClass(menuLink, active);
  };

}(this, this.document));
