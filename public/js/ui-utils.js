function showLoader(msg) {
  document.getElementById('loaderMsg').textContent = msg || 'Procesando...';
  new bootstrap.Modal(document.getElementById('loaderModal')).show();
}
function hideLoader() {
  var modalEl = document.getElementById('loaderModal');
  var modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
}
function showAlert(msg, type = 'success', id = 'fotoAlert') {
  var alertDiv = document.getElementById(id);
  if (!alertDiv) return;
  alertDiv.className = 'alert alert-' + type + ' text-center';
  alertDiv.textContent = msg;
  alertDiv.classList.remove('d-none');
  setTimeout(() => { alertDiv.classList.add('d-none'); }, 2000);
}

// Toggle entre vistas
document.addEventListener('DOMContentLoaded', function () {
  const viewTable = document.getElementById('viewTable');
  const viewCards = document.getElementById('viewCards');
  const tableView = document.getElementById('tableView');
  const cardsView = document.getElementById('cardsView');

  // Función para detectar si es móvil
  function isMobile() {
    return window.innerWidth < 992; // lg breakpoint de Bootstrap
  }

  // Función para inicializar vista según dispositivo
  function initializeView() {
    if (isMobile()) {
      // En móvil siempre mostrar cards
      showCardsView();
      // Ocultar botones de vista en móvil
      document.querySelector('.btn-group')?.classList.add('d-none');
    } else {
      // En desktop mostrar según preferencia guardada
      document.querySelector('.btn-group')?.classList.remove('d-none');
      document.querySelector('.btn-group')?.classList.add('d-lg-flex');

      const savedView = localStorage.getItem('clientsView') || 'table';
      if (savedView === 'cards') {
        showCardsView();
      } else {
        showTableView();
      }
    }
  }

  // Event listeners
  viewTable?.addEventListener('click', showTableView);
  viewCards?.addEventListener('click', showCardsView);

  function showTableView() {
    if (tableView && cardsView && !isMobile()) {
      tableView.classList.remove('d-none');
      tableView.classList.add('d-lg-block');
      cardsView.classList.add('d-none');
      viewTable?.classList.add('active');
      viewCards?.classList.remove('active');
      localStorage.setItem('clientsView', 'table');
    }
  }

  function showCardsView() {
    if (tableView && cardsView) {
      tableView.classList.remove('d-lg-block');
      tableView.classList.add('d-none');
      cardsView.classList.remove('d-none');
      viewCards?.classList.add('active');
      viewTable?.classList.remove('active');
      if (!isMobile()) {
        localStorage.setItem('clientsView', 'cards');
      }
    }
  }

  // Inicializar vista
  initializeView();

  // Detectar cambios de tamaño de ventana
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      initializeView();
    }, 250);
  });
});