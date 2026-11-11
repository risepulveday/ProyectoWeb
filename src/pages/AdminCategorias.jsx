import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');

  const cargarCategorias = async () => {
    try {
      setCategorias(await api.categorias());
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Agregar nueva categoría
  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    try {
      await api.crearCategoria({ nombre: nombre.trim(), descripcion });
      await cargarCategorias();
      setNombre('');
      setDescripcion('');
    } catch (e2) {
      setError(e2.message);
    }
  };

  // Eliminar categoría
  const handleEliminar = async (id) => {
    try {
      await api.eliminarCategoria(id);
      await cargarCategorias();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
        <div>
          <h2 className="display-6 fw-bold text-uppercase mb-1">Módulo de Categorías</h2>
          <p className="text-secondary mb-0">Organización y clasificación de artículos del catálogo.</p>
        </div>
        <span className="badge bg-danger fs-6 px-3 py-2">{categorias.length} Categorías</span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        {/* Formulario de Creación */}
        <div className="col-lg-4">
          <form onSubmit={handleAgregar} className="bg-secondary bg-opacity-10 p-4 rounded-3 border border-secondary shadow">
            <h5 className="fw-bold text-uppercase text-danger mb-3">
              <i className="bi bi-tag me-2"></i>Nueva Categoría
            </h5>
            
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Nombre</label>
              <input 
                type="text" 
                className="form-control bg-dark text-light border-secondary"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Instrumentos Musicales"
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Descripción</label>
              <textarea 
                className="form-control bg-dark text-light border-secondary"
                rows="3"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Breve descripción de los artículos de esta categoría..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-danger w-100 fw-bold text-uppercase py-2">
              Crear Categoría
            </button>
          </form>
        </div>

        {/* Listado de Tarjetas de Categorías */}
        <div className="col-lg-8">
          <div className="row g-3">
            {categorias.map((cat) => (
              <div key={cat.id} className="col-md-6">
                <div className="bg-secondary bg-opacity-10 p-4 rounded-3 border border-secondary h-100 d-flex flex-column justify-content-between shadow-sm">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold text-light mb-0">{cat.nombre}</h5>
                      <span className="badge bg-secondary">{cat.cantidad} ítems</span>
                    </div>
                    <p className="text-secondary small mb-3">{cat.descripcion}</p>
                  </div>
                  <div className="text-end border-top border-secondary pt-2">
                    <button onClick={() => handleEliminar(cat.id)} className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash me-1"></i> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};