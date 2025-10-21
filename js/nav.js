document.addEventListener('DOMContentLoaded', function () {
  // Compute a conservative prefix; site currently uses ../ links even at root
  var prefix = '../';

  // Build nav items in one place
  var links = [
    { label: 'Home', href: prefix + 'index.html', key: 'home' },
    { label: 'People', href: prefix + 'people', key: 'people' },
    { label: 'Projects', href: prefix + 'projects', key: 'projects' },
    { label: 'Publications', href: prefix + 'publications', key: 'publications' },
    { label: 'Gallery', href: prefix + 'gallery/index.html', key: 'gallery' },
    { label: 'Contact', href: prefix + 'join', key: 'join' },
    { label: 'Support', href: prefix + 'support', key: 'support' }
  ];

  function activeKeyFromPath() {
    var path = window.location.pathname;
    if (path.indexOf('/people') !== -1) return 'people';
    if (path.indexOf('/projects') !== -1) return 'projects';
    if (path.indexOf('/publications') !== -1) return 'publications';
    if (path.indexOf('/gallery') !== -1) return 'gallery';
    if (path.indexOf('/join') !== -1) return 'join';
    if (path.indexOf('/support') !== -1) return 'support';
    return 'home';
  }

  var activeKey = activeKeyFromPath();

  function buildDesktopNavHtml() {
    return links.map(function (link) {
      var activeClass = link.key === activeKey ? ' class="active"' : '';
      return '<li' + activeClass + '><a href="' + link.href + '">' + link.label + '</a></li>';
    }).join('');
  }

  function buildMobileNavHtml() {
    return links.map(function (link) {
      var activeClass = link.key === activeKey ? ' class="active"' : '';
      return '<li' + activeClass + '><a href="' + link.href + '">' + link.label + '</a></li>';
    }).join('');
  }

  // Add logo to navigation
  var navigation = document.querySelector('.navigation');
  if (navigation) {
    // Create logo element
    var logo = document.createElement('div');
    logo.className = 'nav-logo';
    logo.innerHTML = '<a href="' + prefix + 'index.html"><img src="' + prefix + 'img/aneja-lab-logo.png" alt="Aneja Lab Logo" class="logo-img"></a><span class="logo-text">Yale | The Aneja Lab</span>';
    
    // Insert logo at the beginning of navigation
    navigation.insertBefore(logo, navigation.firstChild);
  }

  // Inject into desktop nav list
  var desktopUl = document.querySelector('.navigation ul.hide-on-med-and-down');
  if (desktopUl) {
    desktopUl.innerHTML = buildDesktopNavHtml();
  }

  // Inject into mobile sidenav
  var mobileNav = document.querySelector('ul.sidenav#mobile-nav');
  if (mobileNav) {
    mobileNav.innerHTML = buildMobileNavHtml();
  }

  // Initialize sidenav after injection
  if (window.M && mobileNav) {
    M.Sidenav.init(mobileNav, {});
  }
});