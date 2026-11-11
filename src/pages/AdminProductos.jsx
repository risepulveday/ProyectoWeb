import React, { useState } from 'react';
import { albumes } from '../data/albumesData';

// Equipos base para la carga inicial
const productosEquiposBase = [
  {
    id: 'eq-1',
    titulo: 'Amplificador de Guitarra Marshall',
    artista: 'Marshall',
    categoria: 'equipos',
    precio: 399990,
    stock: 5,
    imagen: '/img/amplificadorMarshall.jpg',
  },
  {
    id: 'eq-2',
    titulo: 'Micrófono de Condensador',
    artista: 'Pro Audio',
    categoria: 'equipos',
    precio: 149990,
    stock: 8,
    imagen: '/img/microfonopro.jpg',
  },
  {
    id: 'eq-3',
    titulo: 'Controladora DJ Pro',
    artista: 'Pioneer',
    categoria: 'equipos',
    precio: 399990,
    stock: 3,
    imagen: '/img/tornamesa.jpg',
  },
  {
    id: 'eq-4',
    titulo: 'Parlante de P.A. Profesional',
    artista: 'JBL',
    categoria: 'equipos',
    precio: 199990,
    stock: 6,
    imagen: '/img/parlantejbl.jpg',
  },
  {
    id: 'eq-5',
    titulo: 'Tornamesa Estéreo Retro',
    artista: 'Vintage Sound',
    categoria: 'equipos',
    precio: 99990,
    stock: 10,
    imagen: '/img/tocadiscos.jpg',
  },
  {
    id: 'eq-6',
    titulo: 'Parlantes Monitor Audio Bronze',
    artista: 'Audio Bronze',
    categoria: 'equipos',
    precio: 149990,
    stock: 4,
    imagen: '/img/parlante2.jpg',
  },
];

// Combinar álbumes formateados con los equipos base
const todosLosProductosIniciales = [
  ...albumes.map((alb) => ({
    ...alb,
    categoria: alb.categoria || 'vinilos',
  })),
  ...productosEquiposBase,
];

export const AdminProductos = () => {
  // Carga inicial combinando datos base (álbumes + equipos) o desde localStorage
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('adminProductos');
    return guardados ? JSON.parse(guardados) : todosLosProductosIniciales;
  });

  const [nuevoProd, setNuevoProd] = useState({
    titulo: '',
    artista: '',
    precio: '',
    stock: '',
    categoria: 'vinilos',
  });

  // Guardar nuevo producto
  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoProd.titulo || !nuevoProd.precio) return;

    const productoCreado = {
      id: `prod-${Date.now()}`,
      titulo: nuevoProd.titulo,
      nombre: nuevoProd.titulo,
      artista: nuevoProd.artista || 'Artista / Marca Varios',
      precio: Number(nuevoProd.precio),
      stock: Number(nuevoProd.stock) || 5,
      imagen: nuevoProd.categoria === 'equipos' ? '/img/tornamesa.jpg' : '/img/tocadiscos.jpg',
      categoria: nuevoProd.categoria,
    };

    const listaActualizada = [productoCreado, ...productos];
    setProductos(listaActualizada);
    localStorage.setItem('adminProductos', JSON.stringify(listaActualizada));
    setNuevoProd({ titulo: '', artista: '', precio: '', stock: '', categoria: 'vinilos' });
  };

  // Eliminar producto
  const handleEliminar = (id) => {
    const listaFiltrada = productos.filter((p) => p.id !== id);
    setProductos(listaFiltrada);
    localStorage.setItem('adminProductos', JSON.stringify(listaFiltrada));
  };

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
        <div>
          <h2 className="display-6 fw-bold text-uppercase mb-1">Módulo de Productos</h2>
          <p className="text-secondary mb-0">Gestión de inventario de álbumes, vinilos y equipos de audio.</p>
        </div>
        <span className="badge bg-danger fs-6 px-3 py-2">{productos.length} Productos</span>
      </div>

      {/* Formulario de Alta de Producto */}
      <form onSubmit={handleAgregar} className="bg-secondary bg-opacity-10 p-4 rounded-3 border border-secondary mb-4 row g-3 align-items-end shadow-sm">
        <h5 className="fw-bold text-uppercase text-danger mb-2">
          <i className="bi bi-plus-circle me-2"></i>Agregar Nuevo Producto
        </h5>
        
        <div className="col-md-3">
          <label className="form-label text-secondary small fw-bold">Título / Nombre</label>
          <input 
            type="text" 
            className="form-control bg-dark text-light border-secondary"
            value={nuevoProd.titulo}
            onChange={(e) => setNuevoProd({ ...nuevoProd, titulo: e.target.value })}
            placeholder="Ej: Amplificador Marshall"
            required 
          />
        </div>
        
        <div className="col-md-3">
          <label className="form-label text-secondary small fw-bold">Artista / Marca</label>
          <input 
            type="text" 
            className="form-control bg-dark text-light border-secondary"
            value={nuevoProd.artista}
            onChange={(e) => setNuevoProd({ ...nuevoProd, artista: e.target.value })}
            placeholder="Ej: Marshall" 
          />
        </div>

        <div className="col-md-2">
          <label className="form-label text-secondary small fw-bold">Categoría</label>
          <select
            className="form-select bg-dark text-light border-secondary"
            value={nuevoProd.categoria}
            onChange={(e) => setNuevoProd({ ...nuevoProd, categoria: e.target.value })}
          >
            <option value="vinilos">Vinilos</option>
            <option value="equipos">Equipos</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label text-secondary small fw-bold">Precio ($CLP)</label>
          <input 
            type="number" 
            className="form-control bg-dark text-light border-secondary"
            value={nuevoProd.precio}
            onChange={(e) => setNuevoProd({ ...nuevoProd, precio: e.target.value })}
            placeholder="19990"
            required 
          />
        </div>

        <div className="col-md-2">
          <button type="submit" className="btn btn-danger w-100 fw-bold py-2">
            Guardar
          </button>
        </div>
      </form>

      {/* Tabla de Productos Registrados */}
      <div className="table-responsive bg-secondary bg-opacity-10 rounded-3 border border-secondary p-3 shadow">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead>
            <tr className="text-secondary border-bottom border-secondary">
              <th>Título / Producto</th>
              <th>Artista / Marca</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th className="text-end">Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td className="fw-bold">{prod.titulo || prod.nombre}</td>
                <td className="text-secondary">{prod.artista || 'N/A'}</td>
                <td>
                  <span className={`badge text-uppercase ${
                    prod.categoria === 'equipos' ? 'bg-primary' : prod.categoria === 'accesorios' ? 'bg-warning text-dark' : 'bg-secondary'
                  }`}>
                    {prod.categoria || 'vinilos'}
                  </span>
                </td>
                <td className="text-success fw-bold">${Number(prod.precio).toLocaleString('es-CL')}</td>
                <td className="text-end">
                  <button onClick={() => handleEliminar(prod.id)} className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};