import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Checkout = ({ carrito, setCarrito, setOrdenActual }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    depto: '',
    region: 'Región Metropolitana',
    comuna: 'Santiago',
    indicaciones: ''
  });

  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  // AUTO-RELLENADO: Leer usuarioSesion desde localStorage al cargar la página
  useEffect(() => {
    const sesionActiva = JSON.parse(localStorage.getItem('usuarioSesion'));

    if (sesionActiva && sesionActiva.rol === 'Cliente') {
      setUsuarioAutenticado(true);

      // Separar nombre y apellidos si vienen en un solo campo desde la sesión
      const partesNombre = sesionActiva.nombre ? sesionActiva.nombre.split(' ') : ['', ''];
      const nombreUsuario = partesNombre[0] || '';
      const apellidosUsuario = partesNombre.slice(1).join(' ') || '';

      setFormData({
        nombre: nombreUsuario,
        apellidos: apellidosUsuario,
        correo: sesionActiva.correo || '',
        calle: sesionActiva.direccion || '',
        depto: '',
        region: sesionActiva.region || 'Región Metropolitana',
        comuna: sesionActiva.comuna || 'Santiago',
        indicaciones: ''
      });
    }
  }, []);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePagar = (e) => {
    e.preventDefault();
    const nuevaOrden = {
      nroOrden: `#${Math.floor(100000 + Math.random() * 900000)}`,
      cliente: formData,
      items: carrito,
      total
    };

    setOrdenActual(nuevaOrden);

    // Simulación de pasarela de pago (90% éxito / 10% fallo)
    const exito = Math.random() > 0.4;
    if (exito) {
      setCarrito([]); // Vaciar carrito tras compra exitosa
      navigate('/pago-exitoso');
    } else {
      navigate('/pago-error');
    }
  };

  return (
    <main className="container py-5 text-white">
      <h1 className="fw-bold mb-4">CHECKOUT - PROCESAR PAGO</h1>

      {/* AVISO INFORMATIVO SI EL CLIENTE TIENE SESIÓN ACTIVA */}
      {usuarioAutenticado && (
        <div className="alert alert-success bg-success bg-opacity-25 border-success text-white d-flex align-items-center mb-4 shadow-sm" role="alert">
          <span className="fs-4 me-2">👤</span>
          <div>
            <strong>¡Sesión iniciada!</strong> Hemos autorellenado tus datos personales y de despacho.
          </div>
        </div>
      )}

      <form onSubmit={handlePagar} className="row g-4">
        <div className="col-lg-7">
          <div className="card bg-dark border-secondary p-4 text-white">
            <h5 className="fw-bold mb-3 border-bottom border-secondary pb-2">Información del Cliente</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input 
                  type="text" 
                  name="nombre" 
                  value={formData.nombre} 
                  required 
                  className="form-control bg-secondary text-white border-0" 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellidos</label>
                <input 
                  type="text" 
                  name="apellidos" 
                  value={formData.apellidos} 
                  required 
                  className="form-control bg-secondary text-white border-0" 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-12">
                <label className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  name="correo" 
                  value={formData.correo} 
                  required 
                  className="form-control bg-secondary text-white border-0" 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <h5 className="fw-bold mt-4 mb-3 border-bottom border-secondary pb-2">Dirección de Entrega</h5>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label">Calle y Número</label>
                <input 
                  type="text" 
                  name="calle" 
                  value={formData.calle} 
                  required 
                  className="form-control bg-secondary text-white border-0" 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Depto / Casa</label>
                <input 
                  type="text" 
                  name="depto" 
                  value={formData.depto} 
                  className="form-control bg-secondary text-white border-0" 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Comuna</label>
                <input 
                  type="text" 
                  name="comuna" 
                  value={formData.comuna} 
                  required 
                  className="form-control bg-secondary text-white border-0" 
                  onChange={handleChange} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Región</label>
                <input 
                  type="text" 
                  name="region" 
                  value={formData.region} 
                  readOnly 
                  className="form-control bg-secondary text-white border-0" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card bg-dark border-secondary p-4 text-white">
            <h5 className="fw-bold mb-3 border-bottom border-secondary pb-2">Resumen de Compra</h5>
            {carrito.map((item, idx) => (
              <div key={idx} className="d-flex justify-content-between mb-2 small">
                <span>{item.nombre} x{item.cantidad}</span>
                <strong>$ {(item.precio * item.cantidad).toLocaleString('es-CL')}</strong>
              </div>
            ))}
            <div className="border-top border-secondary pt-3 mt-3 d-flex justify-content-between fs-4 fw-bold">
              <span>Total:</span>
              <span className="text-danger">$ {total.toLocaleString('es-CL')}</span>
            </div>
            <button type="submit" className="btn btn-danger btn-lg w-100 fw-bold mt-4" disabled={carrito.length === 0}>
              PAGAR AHORA $ {total.toLocaleString('es-CL')}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};