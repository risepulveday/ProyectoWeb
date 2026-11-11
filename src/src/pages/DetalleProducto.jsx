import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { albumes } from '../data/albumesData';

// Lista de equipos de sonido
const productosEquipos = [
  {
    id: 'eq-1',
    categoria: 'equipos',
    nombre: 'Amplificador de Guitarra Marshall',
    precio: 399990,
    imagen: '/img/amplificadorMarshall.jpg',
    sku: 'AUDIO-MARSHALL-50W',
    descripcion: 'Amplificador de alta fidelidad; con tono cálido, distorsión clásica y potencia ideal para ensayos y estudio.',
    stock: 8,
  },
  {
    id: 'eq-2',
    categoria: 'equipos',
    nombre: 'Micrófono de Condensador',
    precio: 149990,
    imagen: '/img/microfonopro.jpg',
    sku: 'MIC-COND-PRO',
    descripcion: 'Micrófono profesional de condensador, captura sonidos nítidos y detallados para grabaciones de voz e instrumentos.',
    stock: 12,
  },
  {
    id: 'eq-3',
    categoria: 'equipos',
    nombre: 'Controladora DJ Pro',
    precio: 399990,
    imagen: '/img/tornamesa.jpg',
    sku: 'DJ-CTRL-PRO',
    descripcion: 'Controladora DJ con jogwheels de alta precisión y mezcla multicanal integrada.',
    stock: 5,
  },
  {
    id: 'eq-4',
    categoria: 'equipos',
    nombre: 'Parlante de P.A. Profesional',
    precio: 199990,
    imagen: '/img/parlantejbl.jpg',
    sku: 'SPK-PA-PRO',
    descripcion: 'Parlante activo de alta potencia ideal para eventos y presentaciones en vivo.',
    stock: 10,
  },
  {
    id: 'eq-5',
    categoria: 'equipos',
    nombre: 'Tornamesa Estéreo Retro Hi-Fi',
    precio: 99990,
    imagen: '/img/tocadiscos.jpg',
    sku: 'TRN-RETRO-HIFI',
    descripcion: 'Tornamesa estilo retro con reproducción a varias velocidades y salida RCA/Bluetooth.',
    stock: 7,
  },
  {
    id: 'eq-6',
    categoria: 'equipos',
    nombre: 'Parlantes Monitor Audio Bronze',
    precio: 149990,
    imagen: '/img/parlante2.jpg',
    sku: 'SPK-MONITOR-BRZ',
    descripcion: 'Monitores de estudio con excelente respuesta de frecuencia para mezcla y producción.',
    stock: 4,
  },
];

export const DetalleProducto = ({ agregarAlCarrito }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  // Unificar álbumes y equipos en una sola lista para buscar por ID
  const todosLosProductos = [
    ...albumes.map((alb) => ({
      id: alb.id,
      nombre: `${alb.titulo} - ${alb.artista}`,
      precio: alb.precio,
      imagen: alb.imagen,
      sku: `VINILO-${alb.id.toUpperCase()}`,
      descripcion: alb.descripcion || `Álbum oficial de ${alb.artista}, edición especial en vinilo.`,
      stock: alb.stock || 10,
    })),
    ...productosEquipos,
  ];

  // Buscar el producto que coincida con el ID de la URL
  const producto = todosLosProductos.find((prod) => prod.id === id);

  // Manejar el clic en "Añadir al Carrito"
  const handleAgregar = () => {
    if (producto) {
      if (agregarAlCarrito) {
        agregarAlCarrito({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
        });
      }

      // Mostrar el mensaje flotante Toast por 3 segundos
      setToast(`¡"${producto.nombre}" se agregó al carrito!`);
      setTimeout(() => setToast(''), 3000);
    }
  };

  if (!producto) {
    return (
      <main className="container py-5 text-center text-white">
        <h2>Producto no encontrado</h2>
        <button className="btn btn-outline-light mt-3" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </main>
    );
  }

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

      {/* Botón Volver */}
      <button className="btn btn-outline-light mb-4" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {/* Tarjeta de Detalle del Producto */}
      <div className="card bg-dark text-white border-secondary p-4 shadow-lg">
        <div className="row g-4 align-items-center">
          
          {/* Imagen */}
          <div className="col-12 col-md-5 text-center">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded border border-secondary shadow"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>

          {/* Información y Acción */}
          <div className="col-12 col-md-7">
            <span className="badge bg-danger mb-2 px-3 py-2 text-uppercase fw-bold">
              SKU: {producto.sku}
            </span>

            <h1 className="fw-bold mb-3">{producto.nombre}</h1>

            <p className="text-secondary fs-6 mb-4">{producto.descripcion}</p>

            <div className="mb-4">
              <span className="display-6 fw-bold text-danger">
                $ {producto.precio.toLocaleString('es-CL')}
              </span>
              <p className="text-success small mt-1 fw-semibold">
                Stock disponible: {producto.stock} unidades
              </p>
            </div>

            <button
              className="btn btn-danger btn-lg w-100 fw-bold shadow py-3"
              onClick={handleAgregar}
            >
              Añadir al Carrito
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default DetalleProducto;