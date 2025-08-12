# Tech Dashboard Desktop

**Tech Dashboard Desktop** es una aplicación de escritorio profesional para la gestión de clientes, trabajos, archivos y métricas, diseñada para empresas de servicios técnicos, talleres y equipos de soporte.  
Funciona con **Electron + Express + SQLite** y permite integración con Google Drive para gestión de archivos y fotos.

---

![Login](./doc/1_login.png)
![Dashboard](./doc/2_panel.png)
![Trabajos](./doc/3_trabajos.png)
![Detalles Trabajo](./doc/4_detalle_trabajo.png)
![Gestion Fotos](./doc/5_fotos_detalle.png)
![Detalle Usuario](./doc/6_detalle_cliente.png)
![Perfil](./doc/7_usuario.png)

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

Copyright (c) 2024 [Tu Empresa]

Este software es propiedad privada y está licenciado solo para uso interno y empresarial de Servicio Tecnico JP SPA o la organización que haya adquirido una licencia u permiso válida.

Queda prohibida la distribución, copia, modificación o uso fuera de la organización sin autorización expresa por escrito.

Para más información o licencias empresariales, contacta a: [servicio.tecnico.jp.app@tuempresa.com]
```
## **Soporte**
Para soporte técnico, contacta a:
[christiancaceres1398@gmail.com]
