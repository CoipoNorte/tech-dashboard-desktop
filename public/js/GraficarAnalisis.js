// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    const datosServidor = window.analisisData;
    console.log('Datos recibidos:', datosServidor);
    // Configuración de colores
    const colores = {
        primary: '#0d6efd',
        success: '#198754',
        info: '#0dcaf0',
        warning: '#ffc107',
        danger: '#dc3545',
        secondary: '#6c757d'
    };

    // Gráfico de ingresos
    const ctxIngresos = document.getElementById('chartIngresos');
    if (ctxIngresos) {
        if (datosServidor.meses.length > 0 && datosServidor.ingresosPorMes.some(v => v > 0)) {
            new Chart(ctxIngresos, {
                type: 'line',
                data: {
                    labels: datosServidor.meses,
                    datasets: [{
                        label: 'Ingresos Reales',
                        data: datosServidor.ingresosPorMes,
                        borderColor: colores.primary,
                        backgroundColor: colores.primary + '20',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        } else {
            ctxIngresos.parentElement.innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-graph-up" style="font-size: 3rem;"></i><p class="mt-2">No hay datos de ingresos para mostrar</p></div>';
        }
    }

    // Gráfico de categorías
    const ctxCategorias = document.getElementById('chartCategorias');
    if (ctxCategorias) {
        if (datosServidor.categorias.length > 0) {
            new Chart(ctxCategorias, {
                type: 'doughnut',
                data: {
                    labels: datosServidor.categorias.map(c => c.nombre),
                    datasets: [{
                        data: datosServidor.categorias.map(c => c.total || 0),
                        backgroundColor: [
                            colores.primary,
                            colores.success,
                            colores.warning,
                            colores.info,
                            colores.danger,
                            colores.secondary
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        } else {
            ctxCategorias.parentElement.innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-pie-chart" style="font-size: 3rem;"></i><p class="mt-2">No hay datos de categorías para mostrar</p></div>';
        }
    }

    // Gráfico de servicios
    const ctxServicios = document.getElementById('chartServicios');
    if (ctxServicios) {
        if (datosServidor.serviciosFrecuentes.length > 0) {
            new Chart(ctxServicios, {
                type: 'bar',
                data: {
                    labels: datosServidor.serviciosFrecuentes.map(s => {
                        const desc = s.descripcion || '';
                        return desc.length > 30 ? desc.substring(0, 30) + '...' : desc;
                    }),
                    datasets: [{
                        label: 'Cantidad',
                        data: datosServidor.serviciosFrecuentes.map(s => s.cantidad),
                        backgroundColor: colores.info + '80',
                        borderColor: colores.info,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        } else {
            ctxServicios.parentElement.innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-star" style="font-size: 3rem;"></i><p class="mt-2">No hay datos de servicios para mostrar</p></div>';
        }
    }

    // Gráfico temporal
    const ctxTemporal = document.getElementById('chartTemporal');
    if (ctxTemporal) {
        if (datosServidor.trabajosPorDia && datosServidor.trabajosPorDia.some(d => d > 0)) {
            new Chart(ctxTemporal, {
                type: 'radar',
                data: {
                    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                    datasets: [{
                        label: 'Trabajos por día',
                        data: datosServidor.trabajosPorDia,
                        borderColor: colores.warning,
                        backgroundColor: colores.warning + '20',
                        pointBackgroundColor: colores.warning,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: colores.warning
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        } else {
            ctxTemporal.parentElement.innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-clock-history" style="font-size: 3rem;"></i><p class="mt-2">No hay suficientes datos temporales</p></div>';
        }
    }
});

// Función para cambiar período
function cambiarPeriodo(periodo) {
    window.location.href = '/analisis?periodo=' + periodo;
}
