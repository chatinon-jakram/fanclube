 
async function loadSharedLayout() {

  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  try {

    const [headerResponse, footerResponse] = await Promise.all([
      fetch('includes/header.html'),
      fetch('includes/footer.html')
    ]);

    if (!headerResponse.ok || !footerResponse.ok) {
      throw new Error('Cannot load shared layout');
    }

    header.innerHTML = await headerResponse.text();
    footer.innerHTML = await footerResponse.text();

    initializeMobileMenu();

  } catch (error) {
    console.error('Layout loading error:', error);
  }
}


function initializeMobileMenu() {

  const button = document.getElementById('mobileMenuButton');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeButton = document.getElementById('closeMobileMenu');

  const aboutToggle = document.getElementById('aboutToggle');
  const aboutSubmenu = document.getElementById('aboutSubmenu');
  const aboutArrow = document.getElementById('aboutArrow');

  if (!button || !drawer || !backdrop) return;

  function openMenu() {

    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('opacity-0', 'invisible');

    document.body.classList.add('drawer-open');

    button.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {

    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0', 'invisible');

    document.body.classList.remove('drawer-open');

    button.setAttribute('aria-expanded', 'false');
  }

  button.addEventListener('click', openMenu);

  closeButton.addEventListener('click', closeMenu);

  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });


  // ABOUT US SUBMENU
  aboutToggle.addEventListener('click', () => {

    const isOpen = aboutToggle.getAttribute('aria-expanded') === 'true';

    aboutToggle.setAttribute('aria-expanded', String(!isOpen));

    aboutSubmenu.classList.toggle('hidden', isOpen);

    aboutArrow.style.transform = isOpen
      ? 'rotate(0deg)'
      : 'rotate(180deg)';

  });


  // Close drawer after selecting a page
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

}


document.addEventListener('DOMContentLoaded', loadSharedLayout);
