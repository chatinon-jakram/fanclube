
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

  } catch (error) {
    console.error('Layout loading error:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadSharedLayout);
