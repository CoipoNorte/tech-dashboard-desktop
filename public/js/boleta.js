function copiarBoletaServicio(btn) {
  const boleta = `
🔧 Servicio: ${btn.dataset.descripcion}
👤 Cliente: ${btn.dataset.cliente}
💰 Precio: $${btn.dataset.precio}
📅 Ingreso: ${btn.dataset.ingreso}
📅 Entrega: ${btn.dataset.entrega}
🏷️ Categoría: ${btn.dataset.categoria}
📌 Estado: ${btn.dataset.estado}
⚠️ Urgencia: ${btn.dataset.urgencia}
📝 Observaciones: ${btn.dataset.observaciones}
  `.trim();

  navigator.clipboard.writeText(boleta)
    .then(() => {
      // Guardamos el contenido original
      const originalHTML = btn.innerHTML;
      const originalClass = btn.className;

      // Cambiamos el botón visualmente
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-success');
      btn.innerHTML = '<i class="bi bi-check-circle me-1"></i> Copiado';

      // Restauramos después de 2 segundos
      setTimeout(() => {
        btn.className = originalClass;
        btn.innerHTML = originalHTML;
      }, 2000);
    })
    .catch(() => {
      console.error('❌ Error al copiar la boleta');
    });
}

window.copiarBoletaServicio = copiarBoletaServicio;
