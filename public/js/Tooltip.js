
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const tooltip = document.getElementById('customTooltip');

function showTooltip(event, text) {
    tooltip.innerHTML = `<div class="card-body small">${text}</div>`;
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';

    // Medir texto y ajustar ancho
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontSize = '14px';
    tempSpan.innerText = text;
    document.body.appendChild(tempSpan);

    let textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);

    // Rango de ancho
    const minWidth = 120;
    const maxWidth = 300;
    const finalWidth = Math.min(Math.max(textWidth + 30, minWidth), maxWidth);

    tooltip.style.width = finalWidth + 'px';

    positionTooltip(event);
}

function hideTooltip() {
    tooltip.style.display = 'none';
    tooltip.style.opacity = '0';
}

function positionTooltip(event) {
    const offsetX = 15;
    const offsetY = 15;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let left = event.pageX + offsetX;
    let top = event.pageY + offsetY;

    if (left + tooltipWidth > windowWidth) {
        left = windowWidth - tooltipWidth - 20;
    }

    if (top + tooltipHeight > windowHeight) {
        top = windowHeight - tooltipHeight - 20;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

// Detectar dispositivo y asignar eventos
document.querySelectorAll('.enlace-lupa').forEach(el => {
    const text = el.dataset.descripcion;

    if (isTouchDevice) {
        el.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            if (tooltip.style.display === 'block') {
                hideTooltip();
            } else {
                showTooltip(e, text);
            }
        });
    } else {
        el.addEventListener('mouseenter', e => showTooltip(e, text));
        el.addEventListener('mouseleave', hideTooltip);
    }
});

// Ocultar si se hace clic fuera
document.addEventListener('click', function (e) {
    if (!tooltip.contains(e.target)) {
        hideTooltip();
    }
});
