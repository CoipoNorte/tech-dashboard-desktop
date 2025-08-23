# 🚀 Tech Dashboard Desktop

<div align="center">
  <img src="https://raw.githubusercontent.com/CoipoNorte/tech-dashboard-desktop/refs/heads/main/public/icon/icon.ico" alt="Tech Dashboard Logo" width="128"/>
  
  **Aplicación de escritorio profesional para la gestión integral de servicios técnicos**
  
  [![Electron](https://img.shields.io/badge/Electron-20232A?style=for-the-badge&logo=electron&logoColor=white)](https://electronjs.org/)
  [![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
  [![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
  [![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
</div>

---

## 📋 Tabla de Contenidos

- [🎯 Descripción](#-descripción)
- [✨ Características](#-características)
- [📸 Capturas de Pantalla](#-capturas-de-pantalla)
- [🔧 Requisitos](#-requisitos)
- [⚡ Instalación Rápida](#-instalación-rápida)
- [🚀 Uso](#-uso)
- [🏗️ Arquitectura](#️-arquitectura)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔑 Configuración de Google Drive](#-configuración-de-google-drive)
- [📦 Build y Distribución](#-build-y-distribución)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)
- [💬 Soporte](#-soporte)

---

## 🎯 Descripción

**Tech Dashboard Desktop** es una solución integral diseñada específicamente para empresas de servicios técnicos, talleres y equipos de soporte. Combina la potencia de Electron con la flexibilidad de Express y la eficiencia de SQLite para ofrecer una experiencia de gestión completa y profesional.

### 🎪 ¿Por qué elegir Tech Dashboard?

- **Todo en uno**: Gestiona clientes, trabajos, archivos y métricas desde una sola aplicación
- **Multiplataforma**: Funciona en Windows, macOS y Linux
- **Integración en la nube**: Conecta con Google Drive para gestión de archivos
- **Interfaz moderna**: Diseño responsive con Bootstrap 5 y animaciones fluidas
- **Base de datos local**: SQLite garantiza rapidez y confiabilidad sin conexión

---

## ✨ Características

### 👥 Gestión de Usuarios y Seguridad
- Sistema de login seguro con autenticación
- Perfiles de usuario personalizables
- Control de acceso basado en roles

### 👤 Gestión de Clientes
- CRUD completo de clientes
- Búsqueda avanzada y filtros
- Historial detallado de trabajos por cliente
- Exportación de datos

### 💼 Gestión de Trabajos
- Asociación de trabajos con clientes, categorías y prioridades
- Estados personalizables (pendiente, en proceso, completado, etc.)
- Sistema de urgencias configurable
- Calendario visual integrado
- Seguimiento detallado de progreso

### 📁 Gestión de Archivos
- Integración completa con Google Drive
- Subida, renombrado y eliminación de archivos
- Organización automática por trabajo/cliente
- Previsualización de imágenes
- Descarga masiva

### 📊 Análisis y Reportes
- Dashboard visual con métricas en tiempo real
- Gráficos interactivos de rendimiento
- Exportación a CSV y Excel
- Reportes personalizables
- Análisis de tendencias

### 🛠️ Herramientas Administrativas
- Importación/Exportación masiva de datos
- Backup y restauración de base de datos
- Limpieza selectiva de datos
- Configuración de categorías, estados y urgencias

---

## 📸 Capturas de Pantalla

<details>
<summary>🖱️ Haz clic para ver las capturas</summary>

### Login y Autenticación
![Login](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/1_login.png)

### Panel Principal de Trabajos
![Panel de Trabajos](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/2_trabajos_1.png)
![Panel de Trabajos Detalle](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/2_trabajos_2.png)

### Calendario Integrado
![Calendario](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/3_calendario_1.png)
![Calendario Detalle](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/3_calendario_2.png)

### Dashboard de Métricas
![Dashboard](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/4_dashboard.png)

### Gestión de Clientes
![Clientes Lista](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/5_clientes_1.png)
![Clientes Formulario](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/5_clientes_2.png)
![Clientes Detalle](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/5_clientes_3.png)
![Clientes Búsqueda](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/5_clientes_4.png)

### Configuración del Sistema
![Categorías](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/6_categorias_1.png)
![Estados](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/7_estados_1.png)
![Urgencias](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/8_urgencias_1.png)

### Análisis y Reportes
![Análisis](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/9_analisis_1.png)
![Reportes](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/9_analisis_2.png)

### Herramientas y Perfil
![Herramientas](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/10_herramientas.png)
![Perfil de Usuario](https://github.com/CoipoNorte/tech-dashboard-desktop/raw/main/doc/img/11_perfil.png)

</details>

---

## 🔧 Requisitos

### Requisitos del Sistema
- **Node.js**: 18.x o superior
- **npm**: 8.x o superior
- **Sistema Operativo**: Windows 10+, macOS 10.14+, o Linux (Ubuntu 18.04+)

### Servicios Externos (Opcional)
- **Google Cloud Console**: Para integración con Google Drive
- **Cuenta de Google Drive**: Para almacenamiento en la nube

---

## ⚡ Instalación Rápida

### 1️⃣ Clona el repositorio
```bash
git clone https://github.com/tuempresa/tech-dashboard-desktop.git
cd tech-dashboard-desktop
```

### 2️⃣ Instala las dependencias
```bash
npm install
```

### 3️⃣ Configura la base de datos
```bash
# Crear la estructura de la base de datos
npm run gen-db

# Crear usuario administrador por defecto
npm run gen-admin
```

### 4️⃣ Configura Google Drive (Opcional)
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Drive
4. Crea credenciales de OAuth 2.0
5. Descarga el archivo `credentials.json`
6. Coloca el archivo en la raíz del proyecto

### 5️⃣ ¡Listo para usar!
```bash
# Modo desarrollo (navegador)
npm run dev

# Modo escritorio (Electron)
npm start
```

---

## 🚀 Uso

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev
# Abre http://localhost:3000 en tu navegador
```

### Modo Escritorio
```bash
# Ejecutar aplicación de escritorio
npm start
```

### Credenciales por Defecto
- **Usuario**: `admin`
- **Contraseña**: `admin123`

> ⚠️ **Importante**: Cambia las credenciales por defecto después del primer login

---

## 🏗️ Arquitectura

Tech Dashboard sigue una arquitectura MVC (Modelo-Vista-Controlador) clara y escalable:

```
┌─────────────────────────────────────────────────────────────┐
│                    TECH DASHBOARD                           │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Bootstrap 5 + EJS + JavaScript)                 │
├─────────────────────────────────────────────────────────────┤
│  Backend (Express.js + Node.js)                            │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│  │   Router    │ Controller  │   Model     │    View     │  │
│  │ (Routes)    │ (Logic)     │ (Data)      │ (Templates) │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Base de Datos (SQLite)                                    │
├─────────────────────────────────────────────────────────────┤
│  Servicios Externos (Google Drive API)                     │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Datos
```
Cliente/Usuario → Router → Controlador → Modelo ↔ SQLite
                    ↓
                  Vista (EJS) → Respuesta HTML
```

---

## 📁 Estructura del Proyecto

```
tech-dashboard-desktop/
│
├── 📁 public/                  # Recursos estáticos
│   ├── 📁 css/                # Estilos personalizados
│   ├── 📁 js/                 # Scripts del cliente
│   ├── 📁 sounds/             # Efectos de sonido UI
│   └── 📁 vendor/             # Librerías externas
│
├── 📁 src/                    # Código fuente principal
│   ├── 📁 config/             # Configuración de la aplicación
│   ├── 📁 controllers/        # Lógica de negocio
│   ├── 📁 models/             # Modelos de datos
│   ├── 📁 routes/             # Definición de rutas
│   ├── 📁 views/              # Plantillas EJS
│   ├── 📁 middlewares/        # Middleware personalizado
│   ├── 📁 utils/              # Utilidades y helpers
│   ├── 📁 data/               # Base de datos SQLite
│   └── server.js              # Punto de entrada del servidor
│
├── 📁 doc/                    # Documentación y capturas
├── 📁 uploads/                # Archivos subidos temporalmente
├── main.js                    # Punto de entrada de Electron
└── package.json               # Configuración del proyecto
```

### Responsabilidades por Capa

| Capa | Ubicación | Responsabilidad |
|------|-----------|----------------|
| **Router** | `src/routes/` | Mapear endpoints HTTP a controladores |
| **Controller** | `src/controllers/` | Orquestar lógica de negocio |
| **Model** | `src/models/` | Interactuar con la base de datos |
| **View** | `src/views/` | Renderizar interfaz de usuario |
| **Middleware** | `src/middlewares/` | Procesar peticiones (auth, validación) |

---

## 🔑 Configuración de Google Drive

### Paso a Paso Detallado

1. **Crear Proyecto en Google Cloud**
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente

2. **Habilitar APIs**
   - Navega a "APIs y servicios" → "Biblioteca"
   - Busca y habilita "Google Drive API"

3. **Crear Credenciales**
   - Ve a "APIs y servicios" → "Credenciales"
   - Haz clic en "Crear credenciales" → "ID de cliente de OAuth 2.0"
   - Configura el tipo de aplicación como "Aplicación de escritorio"

4. **Configurar OAuth**
   - Descarga el archivo JSON de credenciales
   - Renómbralo a `credentials.json`
   - Colócalo en la raíz del proyecto

5. **Primera Autenticación**
   - Ejecuta la aplicación
   - Ve a la sección de fotos en cualquier trabajo
   - Sigue el proceso de autorización en el navegador

---

## 📦 Build y Distribución

### Compilar para Producción
```bash
# Generar build para Windows
npm run build

# Build para macOS (desde macOS)
npm run build:mac

# Build para Linux (desde Linux)
npm run build:linux
```

### Archivos Generados
- **Windows**: `dist/win-unpacked/`
- **macOS**: `dist/mac/`
- **Linux**: `dist/linux-unpacked/`

### Instalador (Windows)
```bash
# Generar instalador .exe
npm run dist
```

---

## 🤝 Contribución

Aunque este es un proyecto privado, si tienes acceso al repositorio:

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Convenciones de Commit
- `Add:` para nuevas funcionalidades
- `Fix:` para corrección de bugs
- `Update:` para actualizaciones
- `Remove:` para eliminaciones
- `Docs:` para documentación

---

## 📄 Licencia

```
Copyright (c) 2025 DenguNorte

Este software es propiedad privada y está licenciado exclusivamente para uso 
interno y empresarial de Servicio Tecnico JP SPA o entidades autorizadas.

RESTRICCIONES:
• Prohibida la distribución no autorizada
• Prohibida la copia o modificación sin permiso
• Prohibido el uso comercial sin licencia

Para licencias empresariales o más información:
📧 christiancaceres1398@gmail.com
```

---

## 💬 Soporte

### 📧 Contacto Técnico
**Email**: [christiancaceres1398@gmail.com](mailto:christiancaceres1398@gmail.com)

### 🆘 Antes de Contactar
1. ✅ Verifica que cumples con los requisitos del sistema
2. ✅ Revisa la documentación y capturas de pantalla
3. ✅ Intenta reproducir el error en modo desarrollo
4. ✅ Prepara los logs de error si los hay

### 📋 Información a Incluir
- Versión del sistema operativo
- Versión de Node.js y npm
- Descripción detallada del problema
- Pasos para reproducir el error
- Capturas de pantalla (si aplica)

---

<div align="center">
  
**¡Gracias por usar Tech Dashboard Desktop!**

*Desarrollado con ❤️ por el equipo de DenguNorte*

</div>