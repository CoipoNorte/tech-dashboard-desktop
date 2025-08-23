# Tech Dashboard Desktop

**Tech Dashboard Desktop** es una aplicación de escritorio profesional para la gestión de clientes, trabajos, archivos y métricas, diseñada para empresas de servicios técnicos, talleres y equipos de soporte.  
Funciona con **Electron + Express + SQLite** y permite integración con Google Drive para gestión de archivos y fotos.

---

![Login](./doc/1_login.png)
![Panel de Trabajos](./doc/2_trabajos_1.png)
![Panel de Trabajos](./doc/2_trabajos_2.png)
![Calendario](./doc/3_calendario_1.png)
![Calendario](./doc/3_calendario_2.png)
![Panel de atajos](./doc/4_dashboard.png)
![Clientes](./doc/5_clientes_1.png)
![Clientes](./doc/5_clientes_2.png)
![Clientes](./doc/5_clientes_3.png)
![Clientes](./doc/5_clientes_4.png)
![Categorias](./doc/6_categorias_1.png)
![Categorias](./doc/6_categorias_2.png)
![Categorias](./doc/6_categorias_3.png)
![Estados](./doc/7_estados_1.png)
![Estados](./doc/7_estados_2.png)
![Estados](./doc/7_estados_3.png)
![Urgencias](./doc/8_urgencias_1.png)
![Urgencias](./doc/8_urgencias_2.png)
![Urgencias](./doc/8_urgencias_3.png)
![Analisis](./doc/9_analisis_1.png)
![Analisis](./doc/9_analisis_2.png)
![Herramientas](./doc/10_herramientas.png)
![Perfil de Usuario](./doc/11_perfil.png)
![Pagina 404](./doc/0_404.png)

---

## **Características principales**

- **Gestión de usuarios** con login seguro y perfiles.
- **Gestión de clientes**: crear, editar, eliminar, buscar y ver detalles.
- **Gestión de trabajos**: asociar trabajos a clientes, categorías, estados y urgencias.
- **Gestión de archivos/fotos**: integración con Google Drive, subida, renombrado, eliminación y descarga.
- **Exportación/Importación** de datos a CSV (ZIP) y Excel (dos hojas).
- **Vaciar base de datos** de clientes y trabajos por separado.
- **Interfaz moderna, responsiva y profesional** (Bootstrap 5).
- **Animaciones y alertas Bootstrap** en todas las acciones importantes.
- **Dashboard visual** con tarjetas de métricas, categorías y estados.
- **Soporte para modo escritorio (Windows, Mac, Linux)**.

---

## **Requisitos**

- Node.js 18+ (recomendado)
- npm
- [Electron](https://www.electronjs.org/)
- [Google Cloud Console](https://console.cloud.google.com/) (para Drive)
- [SQLite3](https://www.sqlite.org/index.html) (incluido en dependencias)

---

## **Instalación y uso**

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tuempresa/tech-dashboard-desktop.git
   cd tech-dashboard-desktop
   ```
Instala las dependencias

```Bash

npm install
```
Crea la base de datos y el usuario admin

```Bash

npm run gen-db
npm run gen-admin
```
Agrega tu archivo credentials.json de Google Drive
(descárgalo desde Google Cloud Console y colócalo en la raíz del proyecto).

Desarrollo

```Bash

npm run dev
```
Abre http://localhost:3000 en tu navegador.

Modo escritorio (Electron)

```Bash

npm start
```
Build para distribución

```Bash

npm run build
```
El ejecutable estará en dist/win-unpacked/ (Windows).

## **Licencia**
```text

Copyright (c) 2025 DenguNorte

Este software es propiedad privada y está licenciado solo para uso interno y empresarial de Servicio Tecnico JP SPA o la organización que haya adquirido una licencia u permiso válida.

Queda prohibida la distribución, copia, modificación o uso fuera de la organización sin autorización expresa por escrito.

Para más información o licencias empresariales, contacta a: [christiancaceres1398@gmail.com]
```
## **Soporte**
Para soporte técnico, contacta a:
[christiancaceres1398@gmail.com]
