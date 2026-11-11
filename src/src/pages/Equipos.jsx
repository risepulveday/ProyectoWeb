import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const productosEquiposBase = [
  {
    id: 'eq-1',
    nombre: 'Amplificador de Guitarra Marshall',
    descripcion: 'Amplificador de alta fidelidad, con tono cálido, distorsión clásica y potencia ideal para ensayos y estudio.',
    precio: 399990,
    imagen: '/img/amplificadorMarshall.jpg',
  },
  {
    id: 'eq-2',
    nombre: 'Micrófono de Condensador',
    descripcion: 'Micrófono de estudio profesional con patrón polar cardioide, excelente claridad para voces y podcasts.',
    precio: 149990,
    imagen: '/img/microfonopro.jpg',
  },
  {
    id: 'eq-3',
    nombre: 'Controladora DJ Pro',
    descripcion: 'Sistema todo en uno de 2 canales, con pads retroiluminados, jog wheels de precisión y pantalla integrada.',
    precio: 399990,
    imagen: '/img/tornamesa.jpg',
  },
  {
    id: 'eq-4',
    nombre: 'Parlante de P.A. Profesional',
    descripcion: 'Monitor de sonido de alta potencia con respuesta limpia de bajos, ideal para eventos e instalaciones en vivo.',
    precio: 199990,
    imagen: '/img/parlantejbl.jpg',
  },
  {
    id: 'eq-5',
    nombre: 'Tornamesa Estéreo Retro',
    descripcion: 'Reproductor estilo vintage con altavoces integrados, radio FM y velocidad ajustable para vinilos de 33/45 RPM.',
    precio: 99990,
    imagen: '/img/tocadiscos.jpg',
  },
  {
    id: 'eq-6',
    nombre: 'Parlantes Monitor Audio Bronze',
    descripcion: 'Diseño compacto de 2 vías con sonido cálido y de alta resolución para vinilos.',
    precio: 149990,
    imagen: '/img/parlante2.jpg',
  },
];

export const Equipos = ({ agregarAlCarrito }) => {
  const [toast, setToast] = useState('');

  // Sincronización con productos creados/editados en Admin
  const [listaEquipos, setListaEquipos] = useState(() => {
    const productosAdmin = localStorage.getItem('adminProductos');
    if (productosAdmin) {
      const parsed = JSON.parse(productosAdmin);
      const equiposFiltrados = parsed.filter(p => p.categoria === 'equipos' || String(p.id).startsWith('eq-'));
      return equiposFiltrados.length > 0 ? equiposFiltrados : productosEquiposBase;
    }
    return productosEquiposBase;
  });

  useEffect(() => {
    const productosAdmin = localStorage.getItem('adminProductos');
    if (productosAdmin) {
      const parsed = JSON.parse(productosAdmin);
      const equiposFiltrados = parsed.filter(p => p.categoria === 'equipos' || String(p.id).startsWith('eq-'));
      if (equiposFiltrados.length > 0) {
        setListaEquipos(equiposFiltrados);
      }
    }
  }, []);

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

    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  return (
    <main className="container py-5 text-white position-relative">
      
      {/* Toast Notificación Flotante */}
      {toast && (
        <div 
          className="position-fixed top-0 end-0 p-3" 
          style={{ zIndex: 1055, marginTop: '70px' }}
        >
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

      <header className="text-center mb-5">
        <h1 className="display-5 fw-bold text-uppercase">Tornamesas & Equipos de Audio</h1>
        <p className="lead text-white-50">Lleva la alta fidelidad del sonido análogo a tu hogar.</p>
      </header>

      {/* Grid de Productos */}
      <div className="row g-4">
        {listaEquipos.map((producto) => (
          <article key={producto.id} className="col-md-6 col-lg-4">
            <div className="card h-100 bg-dark text-white border-secondary shadow-sm">
              <img
                src={producto.imagen}
                className="card-img-top img-efecto"
                alt={producto.nombre || producto.titulo}
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h2 className="card-title h5 fw-bold">{producto.nombre || producto.titulo}</h2>
                <p className="card-text text-white-50 small flex-grow-1">
                  {producto.descripcion || 'Equipo de sonido de alta fidelidad listo para tu setup.'}
                </p>
                
                <div className="pt-2 border-top border-secondary mt-3">
                  <span className="fs-4 fw-bold text-danger d-block mb-3">
                    $ {Number(producto.precio).toLocaleString('es-CL')}
                  </span>
                  
                  <div className="d-flex gap-2">
                    <Link 
                      to={`/producto/${producto.id}`} 
                      className="btn btn-outline-light btn-sm flex-fill fw-bold"
                    >
                      Ver Detalle
                    </Link>

                    <button
                      className="btn btn-danger btn-sm flex-fill fw-bold"
                      onClick={() => handleAgregar(producto)}
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};