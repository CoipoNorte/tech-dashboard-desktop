
document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const sidebar = document.getElementById('modernSidebar');
    const header = document.getElementById('modernHeader');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const backdrop = document.getElementById('sidebarBackdrop');
    const layoutToggle = document.getElementById('layoutToggle');
    const layoutIcon = document.getElementById('layoutIcon');
    const tooltip = document.querySelector('.layout-tooltip');

    // Solo ejecutar si hay elementos (usuario logueado)
    if (!sidebar || !header) return;

    // Verificar preferencia guardada de layout
    const savedLayout = localStorage.getItem('layoutMode') || 'sidebar';
    if (savedLayout === 'navbar') {
        body.classList.remove('sidebar-mode');
        body.classList.add('navbar-mode');
        if (layoutIcon) layoutIcon.className = 'bi bi-layout-text-sidebar-reverse';
        if (tooltip) tooltip.textContent = 'Cambiar a menú lateral';
    }

    // Verificar estado guardado del sidebar
    const sidebarState = localStorage.getItem('sidebarState') || 'open';
    const isMobile = window.innerWidth <= 768;

    // Aplicar estado inicial del header
    if (!isMobile && body.classList.contains('sidebar-mode')) {
        if (sidebarState === 'collapsed') {
            sidebar.classList.add('collapsed');
            header.classList.add('sidebar-collapsed');
            mainContent.classList.add('sidebar-collapsed');
        } else {
            header.classList.add('sidebar-open');
        }
    }

    // Toggle entre layouts (sidebar/navbar)
    if (layoutToggle) {
        layoutToggle.addEventListener('click', function () {
            if (body.classList.contains('sidebar-mode')) {
                // Cambiar a navbar
                body.classList.remove('sidebar-mode');
                body.classList.add('navbar-mode');
                layoutIcon.className = 'bi bi-layout-text-sidebar-reverse';
                if (tooltip) tooltip.textContent = 'Cambiar a menú lateral';
                localStorage.setItem('layoutMode', 'navbar');
            } else {
                // Cambiar a sidebar
                body.classList.remove('navbar-mode');
                body.classList.add('sidebar-mode');
                layoutIcon.className = 'bi bi-layout-sidebar';
                if (tooltip) tooltip.textContent = 'Cambiar a menú superior';
                localStorage.setItem('layoutMode', 'sidebar');

                // Aplicar estado del sidebar
                const currentState = localStorage.getItem('sidebarState') || 'open';
                if (currentState === 'collapsed') {
                    sidebar.classList.add('collapsed');
                    header.classList.add('sidebar-collapsed');
                    mainContent.classList.add('sidebar-collapsed');
                } else {
                    header.classList.add('sidebar-open');
                }
            }
        });
    }

    // Toggle sidebar (colapsar/expandir)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function () {
            if (isMobile) {
                sidebar.classList.toggle('mobile-open');
                backdrop.classList.toggle('show');
            } else {
                sidebar.classList.toggle('collapsed');
                header.classList.toggle('sidebar-collapsed');
                header.classList.toggle('sidebar-open');
                mainContent.classList.toggle('sidebar-collapsed');

                // Cambiar icono
                const icon = sidebarToggle.querySelector('i');
                if (sidebar.classList.contains('collapsed')) {
                    icon.className = 'bi bi-layout-sidebar';
                } else {
                    icon.className = 'bi bi-list';
                }

                // Guardar estado
                const isCollapsed = sidebar.classList.contains('collapsed');
                localStorage.setItem('sidebarState', isCollapsed ? 'collapsed' : 'open');

                // Actualizar tooltips
                updateTooltips();
            }
        });
    }

    // Cerrar sidebar en móvil al hacer clic en backdrop
    if (backdrop) {
        backdrop.addEventListener('click', function () {
            sidebar.classList.remove('mobile-open');
            backdrop.classList.remove('show');
        });
    }

    // Función para actualizar tooltips
    function updateTooltips() {
        if (typeof bootstrap !== 'undefined' && sidebar && sidebar.classList.contains('collapsed')) {
            // Limpiar tooltips existentes
            const existingTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            existingTooltips.forEach(el => {
                const tooltip = bootstrap.Tooltip.getInstance(el);
                if (tooltip) tooltip.dispose();
            });

            // Crear nuevos tooltips
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('.modern-sidebar.collapsed .sidebar-nav-link'));
            tooltipTriggerList.forEach(function (tooltipTriggerEl) {
                const spanElement = tooltipTriggerEl.querySelector('span');
                if (spanElement) {
                    new bootstrap.Tooltip(tooltipTriggerEl, {
                        placement: 'right',
                        title: spanElement.textContent.trim()
                    });
                }
            });
        }
    }

    // Ajustar en cambio de tamaño de ventana
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            const newIsMobile = window.innerWidth <= 768;

            if (newIsMobile !== isMobile) {
                // Limpiar estados móviles
                if (sidebar) sidebar.classList.remove('mobile-open');
                if (backdrop) backdrop.classList.remove('show');

                // Reaplicar estados desktop si es necesario
                if (!newIsMobile && body.classList.contains('sidebar-mode')) {
                    const savedState = localStorage.getItem('sidebarState') || 'open';
                    if (savedState === 'collapsed') {
                        sidebar.classList.add('collapsed');
                        header.classList.add('sidebar-collapsed');
                        mainContent.classList.add('sidebar-collapsed');
                    } else {
                        header.classList.add('sidebar-open');
                    }
                }
            }

            updateTooltips();
        }, 250);
    });

    // Inicializar tooltips si el sidebar está colapsado
    if (sidebar && sidebar.classList.contains('collapsed')) {
        setTimeout(updateTooltips, 100);
    }
});
