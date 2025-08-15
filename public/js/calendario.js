// src/public/js/calendario.js
// Variables globales
let draggedElement = null;
let originalParent = null;
let draggedTrabajoId = null;

// Inicializar tooltips
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Funciones de Drag and Drop
function allowDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
}

function dragEnter(ev) {
    const dia = ev.currentTarget.closest('.calendario-dia');
    if (dia) {
        dia.classList.add('drag-over');
    }
}

function dragLeave(ev) {
    const dia = ev.currentTarget.closest('.calendario-dia');
    if (dia && !dia.contains(ev.relatedTarget)) {
        dia.classList.remove('drag-over');
    }
}

function drag(ev) {
    draggedElement = ev.target.closest('.trabajo-item');
    originalParent = draggedElement.parentElement;
    draggedTrabajoId = draggedElement.getAttribute('data-trabajo-id');

    draggedElement.classList.add('dragging');
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text/plain', draggedTrabajoId);
}

function dragEnd(ev) {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
    }

    // Limpiar todas las clases drag-over
    document.querySelectorAll('.calendario-dia').forEach(dia => {
        dia.classList.remove('drag-over');
    });
}

function drop(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    const dropZone = ev.currentTarget;
    const calendarioDia = dropZone.closest('.calendario-dia');

    if (!calendarioDia || !draggedElement || !draggedTrabajoId) {
        return;
    }

    calendarioDia.classList.remove('drag-over');

    const nuevaFecha = calendarioDia.getAttribute('data-fecha');
    const fechaOriginal = originalParent.closest('.calendario-dia').getAttribute('data-fecha');

    // Si es la misma fecha, no hacer nada
    if (nuevaFecha === fechaOriginal) {
        return;
    }

    // Deshabilitar el elemento mientras se actualiza
    draggedElement.style.pointerEvents = 'none';
    draggedElement.style.opacity = '0.5';

    // Hacer la petición al servidor
    fetch(`/trabajos/${draggedTrabajoId}/actualizar-fecha`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fechaEntrega: nuevaFecha
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Mover el elemento al nuevo contenedor
                dropZone.appendChild(draggedElement);
                draggedElement.style.pointerEvents = '';
                draggedElement.style.opacity = '';

                // Actualizar contadores
                updateCounters();

                // Mostrar notificación de éxito
                showNotification('✅ Fecha actualizada correctamente', 'success');
            } else {
                throw new Error(data.error || 'Error desconocido');
            }
        })
        .catch(error => {
            console.error('Error:', error);

            // Devolver el elemento a su posición original
            if (originalParent) {
                originalParent.appendChild(draggedElement);
            }

            draggedElement.style.pointerEvents = '';
            draggedElement.style.opacity = '';

            // Mostrar notificación de error
            showNotification('❌ Error al actualizar la fecha: ' + error.message, 'danger');
        });
}

// Función para actualizar contadores
function updateCounters() {
    document.querySelectorAll('.calendario-dia').forEach(dia => {
        const trabajos = dia.querySelectorAll('.trabajo-item');
        let contador = dia.querySelector('.badge-contador');
        const headerDiv = dia.querySelector('.dia-header');

        if (trabajos.length > 0) {
            if (contador) {
                contador.textContent = trabajos.length;
            } else if (headerDiv) {
                contador = document.createElement('span');
                contador.className = 'badge bg-primary badge-contador';
                contador.textContent = trabajos.length;
                headerDiv.appendChild(contador);
            }
        } else if (contador) {
            contador.remove();
        }
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    // Crear contenedor si no existe
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }

    // Crear toast
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

    container.appendChild(toast);

    // Mostrar toast
    const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
    });
    bsToast.show();

    // Eliminar después de ocultar
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Efectos hover para los días
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.calendario-dia').forEach(dia => {
        dia.addEventListener('mouseenter', function () {
            if (!this.classList.contains('otro-mes')) {
                const trabajos = this.querySelectorAll('.trabajo-item');
                trabajos.forEach((trabajo, index) => {
                    setTimeout(() => {
                        trabajo.style.transform = 'translateX(5px)';
                    }, index * 50);
                });
            }
        });

        dia.addEventListener('mouseleave', function () {
            const trabajos = this.querySelectorAll('.trabajo-item');
            trabajos.forEach(trabajo => {
                trabajo.style.transform = 'translateX(0)';
            });
        });
    });
});





// Doble clic para agregar trabajo
document.querySelectorAll('.calendario-dia:not(.otro-mes)').forEach(dia => {
  dia.addEventListener('dblclick', function(e) {
    // Evitar si se hizo doble clic en un trabajo
    if (e.target.closest('.trabajo-item')) return;
    
    const fecha = this.getAttribute('data-fecha');
    window.location.href = `/trabajos/nuevo?fechaIngreso=${fecha}`;
  });
});
