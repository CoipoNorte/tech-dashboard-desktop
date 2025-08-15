# Estructura
```
.
|   build-and-run.bat
|   credentials.json
|   main.js
|   package.json
|   token.json
|
+---public
|   +---css
|   |       header-style.css
|   |       style.css
|   |
|   +---icon
|   |       icon.ico
|   |
|   +---js
|   |       boleta.js
|   |       btnCopy.js
|   |       calendario.js
|   |       fotos.js
|   |       header-script.js
|   |       Tooltip.js
|   |       ui-utils.js
|   |
|   \---vendor
|           bootstrap.bundle.min.js
|           bootstrap.min.css
|
+---src
|   |   server.js
|   |
|   +---config
|   |       db.js
|   |
|   +---controllers
|   |       authController.js
|   |       categoriaController.js
|   |       clienteController.js
|   |       estadoController.js
|   |       fotoController.js
|   |       herramientasController.js
|   |       trabajoController.js
|   |       urgenciaController.js
|   |       usuarioController.js
|   |
|   +---helpers
|   |       generate_sql_db.js
|   |
|   +---middlewares
|   |       auth.js
|   |
|   +---models
|   |       Categoria.js
|   |       Cliente.js
|   |       Estado.js
|   |       Trabajo.js
|   |       Urgencia.js
|   |       Usuario.js
|   |
|   +---routes
|   |       api.js
|   |       auth.js
|   |       categorias.js
|   |       clientes.js
|   |       dashboard.js
|   |       estados.js
|   |       fotos.js
|   |       herramientas.js
|   |       trabajos.js
|   |       urgencias.js
|   |       usuarios.js
|   |
|   +---utils
|   |       drive_oauth.js
|   |       folder_id.js
|   |
|   \---views
|       |   404.ejs
|       |   dashboard.ejs
|       |   herramientas.ejs
|       |   oauth2success.ejs
|       |
|       +---auth
|       |       login.ejs
|       |
|       +---categorias
|       |       form.ejs
|       |       index.ejs
|       |
|       +---clientes
|       |       detalle.ejs
|       |       form.ejs
|       |       index legado.ejs
|       |       index.ejs
|       |
|       +---estados
|       |       form.ejs
|       |       index.ejs
|       |
|       +---partials
|       |       alerts.ejs
|       |       footer.ejs
|       |       header legado.ejs
|       |       header.ejs
|       |
|       +---trabajos
|       |       calendario.ejs
|       |       detalle.ejs
|       |       form.ejs
|       |       fotos.ejs
|       |       index legado.ejs
|       |       index.ejs
|       |
|       +---urgencias
|       |       form.ejs
|       |       index.ejs
|       |
|       \---usuarios
|               editar.ejs
|               nuevo.ejs
|               perfil.ejs
```

---


## Diagrama ASCII de la secuencia

```plaintext
 Cliente
    ↓
 Router (src/routes/*.js)
    ↓
Controlador (src/controllers/*.js)
   ┌───┴───┐
   ↓       ↓
 Modelos  Vistas
(src/models) (src/views)
```

---


## Responsabilidades de cada capa

| Componente   | Ubicación          | Responsabilidad                                  |
|--------------|--------------------|--------------------------------------------------|
| Router       | src/routes         | Mapear endpoints HTTP a métodos de controlador   |
| Controlador  | src/controllers    | Orquestar flujo: invocar modelos y vistas        |
| Modelo       | src/models         | Definir esquema, conectarse a la base y CRUD     |
| Vista (EJS)  | src/views          | Plantillas dinámicas que renderizan el front end |

---
