# 📖 Manual de Usuario - Tech Dashboard Desktop

<div align="center">
  <img src="../public/icon/icon.ico" alt="Tech Dashboard Logo" width="128"/>
  
  **Guía completa para usuarios de Tech Dashboard Desktop**
  
  *Aprende a usar todas las funcionalidades paso a paso*
  
  ![Versión](https://img.shields.io/badge/Versión-1.0.0-blue?style=for-the-badge)
  ![Última actualización](https://img.shields.io/badge/Actualizado-Agosto%202025-green?style=for-the-badge)
</div>

---

## 📋 Índice del Manual

### 🚀 [Inicio Rápido](#-inicio-rápido)
- [Primer acceso](#primer-acceso)
- [Navegación básica](#navegación-básica)
- [Configuración inicial](#configuración-inicial)

### 👥 [Gestión de Clientes](#-gestión-de-clientes)
- [Agregar nuevo cliente](#agregar-nuevo-cliente)
- [Buscar y filtrar clientes](#buscar-y-filtrar-clientes)
- [Editar información del cliente](#editar-información-del-cliente)
- [Ver historial de trabajos](#ver-historial-de-trabajos)

### 💼 [Gestión de Trabajos](#-gestión-de-trabajos)
- [Crear un nuevo trabajo](#crear-un-nuevo-trabajo)
- [Estados y urgencias](#estados-y-urgencias)
- [Programar en calendario](#programar-en-calendario)
- [Seguimiento de progreso](#seguimiento-de-progreso)

### 📁 [Gestión de Archivos](#-gestión-de-archivos)
- [Configurar Google Drive](#configurar-google-drive)
- [Subir archivos y fotos](#subir-archivos-y-fotos)
- [Organizar documentos](#organizar-documentos)
- [Descargar y compartir](#descargar-y-compartir)

### 📊 [Reportes y Análisis](#-reportes-y-análisis)
- [Dashboard de métricas](#dashboard-de-métricas)
- [Generar reportes](#generar-reportes)
- [Exportar datos](#exportar-datos)
- [Interpretar gráficos](#interpretar-gráficos)

### ⚙️ [Configuración](#️-configuración)
- [Personalizar categorías](#personalizar-categorías)
- [Configurar estados](#configurar-estados)
- [Gestionar urgencias](#gestionar-urgencias)
- [Herramientas administrativas](#herramientas-administrativas)

### ❓ [Ayuda y Solución de Problemas](#-ayuda-y-solución-de-problemas)
- [Problemas comunes](#problemas-comunes)
- [Preguntas frecuentes](#preguntas-frecuentes)
- [Contacto técnico](#contacto-técnico)

---

## 🚀 Inicio Rápido

### Primer Acceso

#### 1. Abrir la Aplicación
- **Modo Escritorio**: Ejecuta el archivo `Tech Dashboard Desktop.exe`
- **Modo Web**: Abre tu navegador en `http://localhost:3000`

#### 2. Iniciar Sesión
![Pantalla de Login](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/1_login.png)

**Credenciales por defecto:**
- 👤 **Usuario**: `admin`
- 🔐 **Contraseña**: `admin123`

> ⚠️ **Importante**: Cambia la contraseña después del primer acceso desde el menú de perfil

#### 3. Primera Vista
Después del login verás el **Dashboard Principal** con:
- 📊 Resumen de métricas
- 🎯 Accesos directos
- 📈 Gráficos de actividad

---

### Navegación Básica

#### Menú Principal
La aplicación está organizada en secciones principales:

| Sección | Icono | Descripción |
|---------|-------|-------------|
| **Dashboard** | 🏠 | Vista general y métricas |
| **Trabajos** | 💼 | Gestión de servicios técnicos |
| **Clientes** | 👥 | Base de datos de clientes |
| **Calendario** | 📅 | Programación y citas |
| **Análisis** | 📊 | Reportes y estadísticas |
| **Configuración** | ⚙️ | Ajustes del sistema |

#### Atajos de Teclado
- `Ctrl + N`: Nuevo trabajo
- `Ctrl + F`: Buscar cliente
- `Ctrl + S`: Guardar cambios
- `F5`: Actualizar vista

---

### Configuración Inicial

#### Personalizar tu Perfil
1. Haz clic en tu nombre (esquina superior derecha)
2. Selecciona **"Mi Perfil"**
3. Actualiza tu información:
   - Nombre
   - Contraseña

---

## 👥 Gestión de Clientes

### Agregar Nuevo Cliente

#### Método 1: Desde el Dashboard
1. Haz clic en **"+ Nuevo Cliente"** en el dashboard
2. Completa el formulario:
   - **Datos básicos**: Nombre, apellido, empresa
   - **Contacto**: Teléfono, email, dirección
   - **Notas**: Información adicional relevante

![Formulario de Cliente](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/5_clientes_2.png)

#### Método 2: Desde la Lista de Clientes
1. Ve a **Clientes** en el menú principal
2. Haz clic en **"Agregar Cliente"**
3. Completa la información requerida
4. Guarda con **"Crear Cliente"**

### Buscar y Filtrar Clientes

#### Búsqueda Rápida
- Usa la barra de búsqueda superior
- Busca por: nombre, email, teléfono o empresa
- Los resultados se actualizan en tiempo real

![Búsqueda de Clientes](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/5_clientes_4.png)

> 💡 **Consejo**: Mantén actualizada la información de contacto para mejorar la comunicación

### Ver Historial de Trabajos

En el perfil de cada cliente encontrarás:
- 📋 **Lista de trabajos**: Todos los servicios realizados

![Detalle de Cliente](../doc/5_clientes_3.png)

---

## 💼 Gestión de Trabajos

### Crear un Nuevo Trabajo

#### Información Básica
1. Ve a **Trabajos** → **"Nuevo Trabajo"**
2. Selecciona o crea el **cliente**
3. Completa:
   - **Título del trabajo**: Descripción breve
   - **Descripción detallada**: Problema o servicio
   - **Categoría**: Reparación, mantenimiento, instalación, etc.

![Crear Trabajo](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/2_trabajos_1.png)

#### Configuración del Trabajo
- **Estado inicial**: Pendiente, en proceso, etc.
- **Urgencia**: Baja, media, alta, crítica
- **Fecha programada**: Cuándo se realizará
- **Técnico asignado**: Quien lo ejecutará

### Estados y Urgencias

#### Estados Disponibles
| Estado | Color | Descripción |
|--------|-------|-------------|
| 🟡 **Pendiente** | Amarillo | Trabajo programado, no iniciado |
| 🔵 **En Proceso** | Azul | Trabajo en ejecución |
| 🟢 **Completado** | Verde | Trabajo finalizado exitosamente |
| 🔴 **Cancelado** | Rojo | Trabajo cancelado por alguna razón |
| ⚫ **En Espera** | Gris | Esperando respuesta del cliente |

#### Niveles de Urgencia
- 🟢 **Baja**: Trabajo de rutina, flexible en tiempo
- 🟡 **Media**: Importante pero no crítico
- 🟠 **Alta**: Requiere atención prioritaria
- 🔴 **Crítica**: Emergencia, atención inmediata

### Programar en Calendario

#### Vista de Calendario
![Calendario](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/3_calendario_1.png)

1. **Accede al calendario** desde el menú principal
2. **Arrastra trabajos** a las fechas deseadas
3. **Cambia la vista**: día, semana, mes
4. **Filtra por técnico** o tipo de trabajo

### Seguimiento de Progreso

#### Actualizar Estado de Trabajo
1. Abre el trabajo desde la lista o calendario
2. Cambia el **estado** según el progreso
3. Agrega **notas de progreso**
4. Sube **fotos del avance** si es necesario

---

## 📁 Gestión de Archivos

### Configurar Google Drive

#### Primera Configuración
1. Ve a **Configuración** → **Integración Google Drive**
2. Haz clic en **"Conectar con Google Drive"**
3. **Autoriza la aplicación** en tu navegador
4. **Confirma la conexión** exitosa

> 📌 **Nota**: Necesitas una cuenta de Google activa y permisos de administrador

#### Verificar Conexión
- En cualquier trabajo, ve a la pestaña **"Archivos"**
- Si ves **"Subir Archivo"** habilitado, la conexión es exitosa
- Si hay error, revisa la configuración

### Subir Archivos y Fotos

#### Subir Desde un Trabajo
1. **Abre el trabajo** correspondiente
2. Ve a la pestaña **"Archivos"**
3. Haz clic en **"Subir Archivo"**
4. **Selecciona archivo(s)** desde tu computadora
5. **Confirma la subida**

![Gestión de Archivos](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/2_trabajos_2.png)

#### Tipos de Archivo Soportados
- 📸 **Imágenes**: JPG, PNG, GIF, BMP

### Organizar Documentos

#### Estructura Automática
Los archivos se organizan automáticamente en Google Drive:
```
Tech Dashboard/
├── 📁 Cliente_Juan_Pérez/
│   ├── 📁 Trabajo_2025_001_Reparación_PC/
│   │   ├── 🖼️ foto_antes.jpg
│   │   ├── 🖼️ foto_después.jpg
│   │   └── 📄 reporte_técnico.pdf
│   └── 📁 Trabajo_2025_002_Instalación/
└── 📁 Cliente_Empresa_XYZ/
```

#### Renombrar Archivos
1. **Localiza el archivo** en la lista
2. Haz clic en **"Renombrar"** (icono de lápiz)
3. **Escribe el nuevo nombre**
4. **Confirma** el cambio

### Descargar y Compartir

#### Descargar Archivos
- **Individual**: Clic en "Descargar" junto al archivo

---

## 📊 Reportes y Análisis

### Dashboard de Métricas

#### Información Disponible
![Dashboard](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/4_dashboard.png)

El dashboard muestra:
- 📈 **Trabajos del mes**: Total, completados, pendientes
- 💰 **Ingresos**: Facturación mensual y anual
- 👥 **Clientes**: Nuevos clientes y clientes activos

#### Actualización de Datos
- Los datos se actualizan **automáticamente cada hora**
- Para forzar actualización: **F5** o botón "Actualizar"

### Generar Reportes

#### Tipos de Reportes
1. **Reporte de Clientes**
   - Lista completa con contactos
   - Historial de trabajos por cliente
   - Estadísticas de facturación


![Análisis](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/9_analisis_1.png)

### Exportar Datos

#### Formatos Disponibles
- 📄 **PDF**: Reportes profesionales con gráficos
- 📊 **Excel**: Datos tabulares para análisis avanzado
- 📋 **CSV**: Importación a otras herramientas
- 📁 **ZIP**: Datos completos con archivos

### Interpretar Gráficos

#### Gráfico de Trabajos por Mes
- **Barras azules**: Trabajos completados
- **Barras rojas**: Trabajos pendientes
- **Línea verde**: Tendencia general

#### Gráfico de Categorías
- **Circular**: Distribución porcentual por tipo
- **Útil para**: Identificar servicios más demandados

#### Gráfico de Rendimiento
- **Líneas**: Evolución temporal
- **Picos**: Períodos de mayor actividad
- **Valles**: Oportunidades de mejora

![Gráficos de Análisis](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/9_analisis_2.png)

---

## ⚙️ Configuración

### Personalizar Categorías

#### Agregar Nueva Categoría
1. Ve a **Configuración** → **"Categorías"**
2. Haz clic en **"Nueva Categoría"**
3. Completa:
   - **Nombre**: Ej: "Reparación Hardware"
   - **Descripción**: Detalle del tipo de trabajo
   - **Color**: Para identificación visual
   - **Precio base**: Si aplica

![Categorías](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/6_categorias_1.png)

#### Editar Categorías Existentes
- **Cambiar nombre** y descripción
- **Actualizar precios** base
- **Modificar colores** de identificación
- **Desactivar** (sin eliminar historial)

### Configurar Estados

#### Estados del Sistema
![Estados](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/7_estados_1.png)

Los estados determinan el flujo de trabajo:

1. **Pendiente** → **En Proceso** → **Completado**
2. **En Proceso** → **En Espera** → **En Proceso**
3. Cualquier estado → **Cancelado**

#### Personalizar Estados
- **Agregar estados** específicos de tu negocio
- **Cambiar colores** para mejor visualización
- **Definir transiciones** permitidas
- **Configurar notificaciones** automáticas

### Gestionar Urgencias

#### Niveles de Urgencia
![Urgencias](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/8_urgencias_1.png)

Configura los niveles según tu negocio:
- **Mantenimiento Preventivo**: Baja urgencia
- **Reparación Normal**: Media urgencia
- **Problema Crítico**: Alta urgencia
- **Emergencia Sistema Caído**: Crítica

#### Configuración Avanzada
- **Tiempo máximo** de respuesta por urgencia
- **Notificaciones escaladas** si se vence el tiempo
- **Asignación automática** de técnicos disponibles

### Herramientas Administrativas

#### Limpieza de Base de Datos
![Herramientas](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/10_herramientas.png)

**Opciones disponibles:**
- 🗑️ **Vaciar trabajos**: Elimina todos los trabajos (mantiene clientes)
- 🗑️ **Vaciar clientes**: Elimina todos los clientes y sus trabajos
- 🗑️ **Limpiar archivos temporales**: Libera espacio en disco
- 🗑️ **Reset completo**: Vuelve al estado inicial

> ⚠️ **CUIDADO**: Estas operaciones son irreversibles. Haz backup primero.

#### Backup y Restauración
1. **Crear Backup**:
   - Ve a **Herramientas** → **"Crear Backup"**
   - Se genera archivo `.backup` con fecha
   
2. **Restaurar Backup**:
   - Selecciona archivo de backup
   - Confirma la restauración
   - La aplicación se reiniciará automáticamente

#### Importar Datos Externos
- **Desde CSV**: Clientes y trabajos
- **Desde Excel**: Múltiples hojas de datos
- **Validación automática**: Detecta errores antes de importar

---

## ❓ Ayuda y Solución de Problemas

### Problemas Comunes

#### 🔐 "No puedo iniciar sesión"

**Posibles causas y soluciones:**

1. **Credenciales incorrectas**
   - ✅ Verifica usuario: `admin`
   - ✅ Verifica contraseña: `admin123` (por defecto)
   - ✅ Distingue mayúsculas y minúsculas

2. **Base de datos corrupta**
   ```bash
   npm run reset-db
   npm run gen-admin
   ```

3. **Aplicación no responde**
   - Cierra completamente la aplicación
   - Reinicia como administrador
   - Verifica que no hay otra instancia corriendo

#### 📁 "Google Drive no funciona"

**Pasos para solucionar:**

1. **Verificar conexión a internet**
2. **Reconfigurar credenciales**:
   - Ve a **Configuración** → **Google Drive**
   - Haz clic en **"Reconfigurar"**
   - Sigue el proceso de autorización

3. **Verificar permisos**:
   - Tu cuenta de Google debe tener espacio disponible
   - Verifica que la aplicación tiene permisos de Drive

4. **Limpiar caché**:
   ```bash
   rm token.json
   npm restart
   ```

#### 🐌 "La aplicación está lenta"

**Optimizaciones:**

1. **Limpiar archivos temporales**:
   - Ve a **Herramientas** → **"Limpiar Cache"**

2. **Reducir cantidad de datos mostrados**:
   - Usa filtros de fecha
   - Pagina los resultados

3. **Verificar recursos del sistema**:
   - Cierra otras aplicaciones
   - Verifica espacio en disco (mín. 1GB libre)

#### 💾 "Error al guardar datos"

**Soluciones:**

1. **Verificar permisos de escritura**:
   - Ejecuta como administrador
   - Verifica permisos en carpeta de instalación

2. **Base de datos bloqueada**:
   - Cierra otras instancias de la aplicación
   - Reinicia la aplicación

3. **Espacio insuficiente**:
   - Verifica espacio disponible en disco
   - Limpia archivos temporales

### Preguntas Frecuentes

#### ❓ "¿Puedo usar la aplicación sin internet?"
**Sí**, la aplicación funciona completamente offline. Solo necesitas internet para:
- Integración con Google Drive
- Updates automáticos
- Sincronización de archivos

#### ❓ "¿Cuántos usuarios pueden usar la aplicación simultáneamente?"
La aplicación está diseñada para **uso individual** por instalación. Para uso multi-usuario, necesitas instalar en cada computadora.

#### ❓ "¿Dónde se guardan mis datos?"
- **Base de datos**: `src/data/tech-dashboard.db`
- **Archivos temporales**: `uploads/`
- **Archivos en la nube**: Google Drive (si está configurado)

#### ❓ "¿Puedo cambiar el idioma?"
Actualmente la aplicación está solo en **español**. El soporte multi-idioma está planificado para futuras versiones.

#### ❓ "¿Cómo hago backup de mis datos?"
1. **Automático**: Ve a **Herramientas** → **"Crear Backup"**
2. **Manual**: Copia la carpeta completa de instalación
3. **Nube**: Si usas Google Drive, tus archivos ya están respaldados

### Contacto Técnico

#### 📧 Soporte por Email
**Email**: [christiancaceres1398@gmail.com](mailto:christiancaceres1398@gmail.com)

#### 📋 Información a Incluir en tu Consulta

**Para una atención más rápida, incluye:**

✅ **Sistema operativo** (Windows 10, 11, etc.)
✅ **Versión de la aplicación**
✅ **Descripción detallada** del problema
✅ **Pasos que realizaste** antes del error
✅ **Mensaje de error** exacto (captura de pantalla)
✅ **¿Es reproducible?** (¿siempre pasa o solo a veces?)

#### 🕐 Horarios de Atención
- **Días laborales**: 9:00 - 18:00 (GMT-3)
- **Tiempo de respuesta**: 24-48 horas
- **Urgencias**: Indica "URGENTE" en el asunto

#### 📞 Soporte Telefónico
Disponible solo para clientes con licencia empresarial.
Contacta por email para coordinar una llamada.

---

## 📚 Recursos Adicionales

### 🎓 Tutoriales en Video
*Próximamente disponibles en nuestro canal de YouTube*

### 📖 Documentación Técnica
Para desarrolladores: [Ver README técnico](../README.md)

### 🔄 Actualizaciones
- Las actualizaciones se notifican automáticamente
- Changelog disponible en cada nueva versión
- Backup automático antes de cada actualización

### 💡 Consejos Profesionales

#### Para Técnicos
1. **Documenta todo**: Usa notas detalladas en cada trabajo
2. **Toma fotos**: Antes y después de cada intervención
3. **Actualiza estados**: Mantén informado al cliente
4. **Usa el calendario**: Programa trabajos con tiempo realista

#### Para Administradores
1. **Backup regular**: Crea respaldos semanales
2. **Limpia datos antiguos**: Archiva trabajos del año anterior
3. **Revisa métricas**: Usa el dashboard para tomar decisiones
4. **Capacita al equipo**: Asegúrate que todos conocen el sistema

---

<div align="center">

## 🎉 ¡Felicitaciones!

**Ya conoces todas las funcionalidades de Tech Dashboard Desktop**

*Si tienes dudas adicionales, no dudes en contactar nuestro soporte técnico*

---

**📧 Contacto**: [christiancaceres1398@gmail.com](mailto:christiancaceres1398@gmail.com)  
**📖 Documentación**: [README Técnico](../README.md)  
**🏢 Empresa**: DenguNorte - Servicio Técnico JP SPA

---

*Última actualización: Agosto 2025 • Versión 1.0.0*

</div>