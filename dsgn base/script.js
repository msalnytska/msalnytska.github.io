var navSwitcher = document.querySelector('.header__nav-switcher'),
    navBody = document.querySelector('.header__nav-body');

navSwitcher.addEventListener('click', function() {
  navBody.classList.toggle('header__nav-body--open');
});


Object.values(
  navBody.querySelectorAll('.header__nav-body-link')
).reverse().forEach(function(linkEl, idx) {
  linkEl.style.setProperty('--delay', 2*idx);
});
