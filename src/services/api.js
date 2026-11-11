// Cliente HTTP del backend Spring Boot (carpeta /backend).
// La URL se puede cambiar creando un archivo .env con: VITE_API_URL=http://localhost:8080/api
const BASE = import.meta.env?.VITE_API_URL || 'http://localhost:8080/api';

async function request(path, { method = 'GET', body } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. ¿Está encendido el backend?');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.mensaje || `Error del servidor (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

// "2026-10-08T14:30:00" -> "2026-10-08 14:30"
export const formatearFecha = (iso) => (iso ? String(iso).replace('T', ' ').slice(0, 16) : '');

export const api = {
  // Auth
  login: (correo, password) => request('/auth/login', { method: 'POST', body: { correo, password } }),
  registro: (usuario) => request('/auth/registro', { method: 'POST', body: usuario }),

  // Usuarios (admin)
  usuarios: () => request('/usuarios'),
  crearUsuario: (u) => request('/usuarios', { method: 'POST', body: u }),
  actualizarUsuario: (id, u) => request(`/usuarios/${id}`, { method: 'PUT', body: u }),
  eliminarUsuario: (id) => request(`/usuarios/${id}`, { method: 'DELETE' }),

  // Productos
  productos: (categoria) => request(`/productos${categoria ? `?categoria=${categoria}` : ''}`),
  producto: (id) => request(`/productos/${id}`),
  crearProducto: (p) => request('/productos', { method: 'POST', body: p }),
  eliminarProducto: (id) => request(`/productos/${id}`, { method: 'DELETE' }),

  // Categorías
  categorias: () => request('/categorias'),
  crearCategoria: (c) => request('/categorias', { method: 'POST', body: c }),
  eliminarCategoria: (id) => request(`/categorias/${id}`, { method: 'DELETE' }),

  // Órdenes
  ordenes: (correo) => request(`/ordenes${correo ? `?correo=${encodeURIComponent(correo)}` : ''}`),
  crearOrden: (o) => request('/ordenes', { method: 'POST', body: o }),
  cambiarEstadoOrden: (id, estado) => request(`/ordenes/${id}/estado`, { method: 'PUT', body: { estado } }),
  eliminarOrden: (id) => request(`/ordenes/${id}`, { method: 'DELETE' }),

  // Blogs
  blogs: () => request('/blogs'),
  blog: (id) => request(`/blogs/${id}`),
  crearBlog: (b) => request('/blogs', { method: 'POST', body: b }),
  eliminarBlog: (id) => request(`/blogs/${id}`, { method: 'DELETE' }),

  // Reseñas de la comunidad
  resenas: (albumId) => request(`/resenas${albumId ? `?albumId=${albumId}` : ''}`),
  crearResena: (r) => request('/resenas', { method: 'POST', body: r }),
};

// Adapta un producto del backend al formato que usan las vistas del front
export const normalizarProducto = (p) => ({
  ...p,
  nombre: p.categoria === 'vinilos' && p.artista ? `${p.titulo} - ${p.artista}` : p.titulo,
});
