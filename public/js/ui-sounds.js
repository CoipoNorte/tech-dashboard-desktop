// public/js/ui-sounds.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎵 Sistema de sonidos UI iniciando...');

  // Crear objetos de audio
  const sonidos = {
    click: new Audio('/sounds/ui-pop-btn.mp3'),
    login: new Audio('/sounds/ui-login.mp3'),
    logout: new Audio('/sounds/ui-logout.mp3')
  };

  // Configurar volumen y precarga
  Object.values(sonidos).forEach(audio => {
    audio.volume = 0.5;
    audio.preload = 'auto';
    audio.load(); // Forzar precarga
  });


  function sonidosHabilitados() {
    return localStorage.getItem('ui-sonidos') !== 'off';
  }
  // Función helper para reproducir
  function reproducirSonido(tipo) {
    if (!sonidosHabilitados()) return;
    const audio = sonidos[tipo];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log('Error reproduciendo:', e));
    }
  }

  // MÉTODO 1: Interceptar TODOS los clicks
  document.addEventListener('click', (e) => {
    // Obtener el elemento clickeado o su padre más cercano que sea interactivo
    let elemento = e.target;

    // Buscar hacia arriba en el DOM
    while (elemento && elemento !== document.body) {
      // Verificar si es un enlace o botón
      if (elemento.tagName === 'A' || elemento.tagName === 'BUTTON' || elemento.classList?.contains('btn')) {

        // DEBUG
        console.log('Elemento clickeado:', elemento);
        console.log('Clases:', elemento.className);
        console.log('Href:', elemento.href);

        // LOGOUT - verificar href O clase
        if (elemento.href?.includes('/logout') || elemento.classList?.contains('btn-logout')) {
          e.preventDefault();
          e.stopPropagation();

          console.log('🚪 LOGOUT DETECTADO!');
          reproducirSonido('logout');

          // Navegar después del sonido
          setTimeout(() => {
            window.location.href = '/logout';
          }, 300);
          return;
        }

        // LOGIN - verificar clase btn-login
        if (elemento.classList?.contains('btn-login')) {
          e.preventDefault();
          e.stopPropagation();

          console.log('🔐 LOGIN DETECTADO!');
          reproducirSonido('login');

          // Si es parte de un formulario
          const form = elemento.closest('form');
          if (form) {
            setTimeout(() => {
              form.submit();
            }, 300);
          }
          return;
        }

        // ENLACES NORMALES (todos los <a>)
        if (elemento.tagName === 'A' && elemento.href && !elemento.classList?.contains('no-sound')) {
          // Solo prevenir default si es un enlace interno
          if (elemento.href.startsWith(window.location.origin)) {
            e.preventDefault();

            console.log('🔗 ENLACE DETECTADO:', elemento.href);
            reproducirSonido('click');

            // Navegar después del sonido
            setTimeout(() => {
              window.location.href = elemento.href;
            }, 150); // Menos delay para enlaces normales
            return;
          }
        }

        // BOTONES NORMALES
        if ((elemento.tagName === 'BUTTON' || elemento.classList?.contains('btn')) &&
          !elemento.classList?.contains('no-sound')) {
          console.log('🎯 BOTÓN NORMAL');
          reproducirSonido('click');
        }

        break; // Salir del bucle si encontramos un elemento interactivo
      }

      // Subir al elemento padre
      elemento = elemento.parentElement;
    }
  }, true); // Usar captura en lugar de burbujeo

  // MÉTODO 2: Asignar directamente a elementos específicos (como respaldo)
  setTimeout(() => {
    // Logout links
    document.querySelectorAll('a[href="/logout"], .btn-logout').forEach(el => {
      console.log('Asignando evento logout a:', el);
      el.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        reproducirSonido('logout');
        setTimeout(() => window.location.href = '/logout', 300);
      });
    });

    // Login button
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
      console.log('Asignando evento login a:', loginBtn);
      loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        reproducirSonido('login');
        const form = this.closest('form');
        if (form) {
          setTimeout(() => form.submit(), 300);
        }
      });
    }
  }, 500); // Esperar a que el DOM esté completamente cargado

  // Debug: Ver qué sonidos se cargaron
  setTimeout(() => {
    console.log('Estado de los sonidos:');
    Object.entries(sonidos).forEach(([nombre, audio]) => {
      console.log(`${nombre}: ${audio.readyState === 4 ? '✅ Listo' : '⏳ Cargando'}`);
    });
  }, 1000);
});