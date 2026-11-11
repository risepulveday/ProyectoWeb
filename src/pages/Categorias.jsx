import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { albumes } from '../data/albumesData';

const productosEquiposBase = [
  {
    id: 'eq-1',
    categoria: 'equipos',
    nombre: 'Amplificador de Guitarra Marshall',
    precio: 399990,
    imagen: '/img/amplificadorMarshall.jpg',
  },
  {
    id: 'eq-2',
    categoria: 'equipos',
    nombre: 'Micrófono de Condensador',
    precio: 149990,
    imagen: '/img/microfonopro.jpg',
  },
  {
    id: 'eq-3',
    categoria: 'equipos',
    nombre: 'Controladora DJ Pro',
    precio: 399990,
    imagen: '/img/tornamesa.jpg',
  },
  {
    id: 'eq-4',
    categoria: 'equipos',
    nombre: 'Parlante de P.A. Profesional',
    precio: 199990,
    imagen: '/img/parlantejbl.jpg',
  },
  {
    id: 'eq-5',
    categoria: 'equipos',
    nombre: 'Tornamesa Estéreo Retro Hi-Fi',
    precio: 99990,
    imagen: '/img/tocadiscos.jpg',
  },
  {
    id: 'eq-6',
    categoria: 'equipos',
    nombre: 'Parlantes Monitor Audio Bronze',
    precio: 149990,
    imagen: '/img/parlante2.jpg',
  },
];

const productosAccesoriosBase = [
  {
    id: 'acc-1',
    categoria: 'accesorios',
    nombre: 'Limpiador de Vinilos v1',
    precio: 15990,
    imagen: '/img/limpiadorVinilos.jpg',
  },
  {
    id: 'acc-2',
    categoria: 'accesorios',
    nombre: 'Limpiador de Vinilos Pro',
    precio: 17990,
    imagen: '/img/Limpiavinilo2.jpg',
  },
];

export const Categorias = ({ agregarAlCarrito }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [toast, setToast] = useState('');

  // Sincronización dinámica de productos desde localStorage o listas base
  const [todosLosProductos, setTodosLosProductos] = useState(() => {
    const productosAdmin = localStorage.getItem('adminProductos');
    if (productosAdmin) {
      const parsed = JSON.parse(productosAdmin);
      return parsed.map((p) => ({
        ...p,
        nombre: p.nombre || p.titulo,
        categoria: p.categoria || (String(p.id).startsWith('eq-') ? 'equipos' : String(p.id).startsWith('acc-') ? 'accesorios' : 'vinilos'),
      }));
    }

    const vinilosFormateados = albumes.map((alb) => ({
      id: alb.id,
      categoria: 'vinilos',
      nombre: alb.titulo ? `${alb.titulo} - ${alb.artista}` : alb.nombre,
      precio: alb.precio,
      imagen: alb.imagen,
      ...alb,
    }));

    return [...vinilosFormateados, ...productosEquiposBase, ...productosAccesoriosBase];
  });

  useEffect(() => {
    const productosAdmin = localStorage.getItem('adminProductos');
    if (productosAdmin) {
      const parsed = JSON.parse(productosAdmin);
      const formateados = parsed.map((p) => ({
        ...p,
        nombre: p.nombre || p.titulo,
        categoria: p.categoria || (String(p.id).startsWith('eq-') ? 'equipos' : String(p.id).startsWith('acc-') ? 'accesorios' : 'vinilos'),
      }));
      setTodosLosProductos(formateados);
    }
  }, []);

  // Filtrar según la categoría seleccionada
  const productosFiltrados =
    categoriaSeleccionada === 'todas'
      ? todosLosProductos
      : todosLosProductos.filter((prod) => prod.categoria === categoriaSeleccionada);

  const handleAgregar = (producto) => {
    if (agregarAlCarrito) {
      agregarAlCarrito({
        id: producto.id,
        nombre: producto.nombre || producto.titulo,
        precio: producto.precio,
        imagen: producto.imagen,
      });
    }

    setToast(`¡"${producto.nombre || producto.titulo}" se agregó al carrito!`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <main className="container py-5 text-white position-relative">
      {/* Toast Notificación Flotante */}
      {toast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055, marginTop: '70px' }}>
          <div className="toast show align-items-center text-bg-success border-0 shadow-lg" role="alert">
            <div className="d-flex">
              <div className="toast-body fw-bold fs-6">
                <i className="bi bi-check-circle-fill me-2"></i>
                {toast}
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToast('')}
              ></button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-center fw-bold mb-4 text-uppercase">CATEGORÍAS</h1>

      {/* Botones de Filtro */}
      <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
        {[
          { key: 'todas', label: 'Todas' },
          { key: 'vinilos', label: 'Vinilos' },
          { key: 'equipos', label: 'Equipos' },
          { key: 'accesorios', label: 'Accesorios' },
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategoriaSeleccionada(cat.key)}
            className={`btn fw-bold px-4 ${
              categoriaSeleccionada === cat.key ? 'btn-danger' : 'btn-outline-light'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Productos */}
      <div className="row g-4">
        {productosFiltrados.map((prod) => (
          <article key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 bg-dark text-white border-secondary shadow-sm">
              <img
                src={prod.imagen}
                className="card-img-top"
                alt={prod.nombre || prod.titulo}
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h2 className="h6 card-title fw-bold text-center mb-2">{prod.nombre || prod.titulo}</h2>
                  <p className="fs-5 fw-bold text-danger text-center mb-3">
                    $ {Number(prod.precio).toLocaleString('es-CL')}
                  </p>
                </div>

                <div className="d-flex gap-2 mt-auto">
                  <Link
                    to={`/producto/${prod.id}`}
                    className="btn btn-outline-light btn-sm flex-fill fw-bold"
                  >
                    Ver Detalle
                  </Link>

                  <button
                    className="btn btn-danger btn-sm flex-fill fw-bold"
                    onClick={() => handleAgregar(prod)}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};