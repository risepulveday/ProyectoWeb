# MusicMania Backend (Spring Boot + MySQL)

API REST que reemplaza el `localStorage` del front (React + Vite).
Vive en la carpeta `backend/`, al lado de `src/` y `package.json`:

```
ProyectoWeb/
├── backend/        <- Spring Boot (Java 17, Maven, MySQL)
├── src/            <- React (usa src/services/api.js para hablar con el backend)
├── package.json
└── ...
```

## Requisitos
- Java 17+ (`java -version`)
- Maven 3.9+ (`mvn -v`) o un IDE con soporte Maven (IntelliJ IDEA, VS Code + "Extension Pack for Java", Eclipse)
- MySQL corriendo en `localhost:3306`

## Cómo compilar y ejecutar
```bash
cd backend
mvn spring-boot:run          # compila y levanta la API en http://localhost:8080
# o, para generar el .jar:
mvn clean package
java -jar target/musicmania-backend-0.0.1-SNAPSHOT.jar
```
Credenciales de MySQL (por defecto `root` / `root`):
```bash
# Windows (PowerShell)
$env:DB_USER="root"; $env:DB_PASSWORD="tu_clave"; mvn spring-boot:run
# Mac / Linux
DB_USER=root DB_PASSWORD=tu_clave mvn spring-boot:run
```
O edítalas directamente en `src/main/resources/application.properties`.

La base `musicmania` y las tablas se crean solas. Al primer arranque se cargan usuarios,
vinilos, equipos, accesorios, categorías, blogs, órdenes y reseñas de ejemplo.
(Para recargar los datos: `DROP DATABASE musicmania;` y vuelve a arrancar.)

## Cómo ejecutar todo junto (2 terminales)
```bash
# Terminal 1 - backend
cd backend && mvn spring-boot:run

# Terminal 2 - front (desde la raíz del proyecto)
npm install
npm run dev                  # http://localhost:5173
```
El front apunta a `http://localhost:8080/api`. Para cambiarlo crea un archivo `.env` en la raíz:
```
VITE_API_URL=http://localhost:8080/api
```
Si usas otro puerto/origen para el front, agrégalo en `app.cors.allowed-origins` de `application.properties`.

## Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/login` | `{correo, password}` → usuario (sin password) o 401 |
| POST | `/api/auth/registro` | Crea un Cliente |
| GET/POST | `/api/usuarios` | Listar / crear (admin) |
| PUT/DELETE | `/api/usuarios/{id}` | Editar / eliminar |
| GET/POST | `/api/productos` (`?categoria=equipos`) | Listar / crear |
| GET/DELETE | `/api/productos/{id}` | Detalle / eliminar |
| GET/POST | `/api/categorias` | Listar / crear |
| DELETE | `/api/categorias/{id}` | Eliminar |
| GET/POST | `/api/ordenes` (`?correo=...`) | Listar / crear (total calculado en el servidor) |
| PUT | `/api/ordenes/{id}/estado` | `{estado}` |
| DELETE | `/api/ordenes/{id}` | Eliminar |
| GET/POST | `/api/blogs` | Listar / crear |
| GET/DELETE | `/api/blogs/{id}` | Detalle / eliminar |
| GET/POST | `/api/resenas` (`?albumId=alb-1`) | Reseñas de la comunidad |

## Pendiente / siguientes pasos
- **Seguridad**: los endpoints no validan rol (cualquiera con la URL puede llamarlos). El siguiente paso es Spring Security + JWT.
- La sesión del usuario sigue guardándose en `localStorage` (`usuarioSesion`); el carrito sigue en memoria de React.
