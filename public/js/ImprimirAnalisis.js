document.addEventListener('DOMContentLoaded', function () {
  const datosGraficos = window.datosGraficos;

  // Configuración global
  Chart.defaults.maintainAspectRatio = false;
  Chart.defaults.responsive = true;

  // Gráfico de ingresos
  const ctxIngresos = document.getElementById('chartIngresos');
  if (ctxIngresos) {
    new Chart(ctxIngresos, {
      type: 'line',
      data: {
        labels: datosGraficos.meses,
        datasets: [{
          label: 'Ingresos',
          data: datosGraficos.ingresosPorMes,
          borderColor: '#0d6efd',
          backgroundColor: 'rgba(13, 110, 253, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => '$' + value.toLocaleString()
            }
          }
        }
      }
    });
  }

  // Gráfico de categorías
  const ctxCategorias = document.getElementById('chartCategorias');
  if (ctxCategorias && datosGraficos.categorias.length > 0) {
    new Chart(ctxCategorias, {
      type: 'pie',
      data: {
        labels: datosGraficos.categorias.map(c => c.nombre),
        datasets: [{
          data: datosGraficos.categorias.map(c => c.total || 0),
          backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#0dcaf0', '#dc3545', '#6c757d']
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 10,
              font: {
                size: 11
              }
            }
          }
        }
      }
    });
  }

  // Gráfico temporal
  const ctxTemporal = document.getElementById('chartTemporal');
  if (ctxTemporal && datosGraficos.trabajosPorDia.some(d => d > 0)) {
    new Chart(ctxTemporal, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Trabajos',
          data: datosGraficos.trabajosPorDia,
          backgroundColor: '#ffc107',
          borderColor: '#ffb300',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
});

// Función para cambiar período
function cambiarPeriodo(periodo) {
  window.location.href = `/analisis/documento?periodo=${periodo}`;
}

// Mejorar la experiencia de impresión
window.addEventListener('beforeprint', function () {
  Chart.instances.forEach(chart => {
    chart.resize();
  });
});
