# Taskify

Aplicación de gestión de tareas construida con React, TypeScript, Vite, Tailwind CSS y una API de Express.

## Requisitos

- Node.js 22
- npm

## Desarrollo local

Instala las dependencias del frontend y del backend:

```bash
npm install
cd backend
npm install
```

Arranca la API desde `backend`:

```bash
npm start
```

En otra terminal, desde la raíz del proyecto, arranca el frontend:

```bash
npm run dev
```

Por defecto, el frontend estará en `http://localhost:5173` y la API en
`http://localhost:4000`.

## Variables de entorno

Frontend:

```bash
VITE_API_URL=http://localhost:4000
```

Backend:

```bash
PORT=4000
CORS_ORIGIN=http://localhost:5173
AUTH_SECRET=replace-with-a-long-random-secret
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

`CORS_ORIGIN` admite varios orígenes separados por comas. Si no se define, la
API acepta el origen de la petición para facilitar el desarrollo local.
`AUTH_SECRET` se usa para firmar sesiones; Render genera uno automáticamente.
Si `DATABASE_URL` no está definida se utilizan los archivos JSON locales.

## Funcionalidades

- Registro, inicio de sesión y rutas privadas
- Acceso inmediato mediante una cuenta demo con tareas de ejemplo
- Perfil editable y cierre de sesión
- Creación, búsqueda, edición y eliminación de tareas por usuario
- Formulario de contacto persistido por la API
- Páginas de términos, privacidad y página 404

## Comprobaciones

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Despliegue

El repositorio incluye `netlify.toml` para el frontend y `render.yaml` para la
API. En Netlify debes configurar `VITE_API_URL` con la URL pública del servicio
de Render. En Render debes configurar `CORS_ORIGIN` con el dominio público de
Netlify y `DATABASE_URL` con la cadena de conexión de Neon. Las tablas se crean
automáticamente cuando arranca la API. Sin `DATABASE_URL`, el desarrollo local
continúa usando los archivos de `backend/data`.
