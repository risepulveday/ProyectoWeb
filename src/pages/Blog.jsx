import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

// Ajustes de imagen por artículo (el recorte de la nota aguda se ve mejor desde arriba)
const estilosImagen = {
  caso3: { objectPosition: 'top' },
};

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.blogs()
      .then(setBlogs)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main>
      <section className="py-5 bg-dark text-light rounded my-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-uppercase tracking-wider">
            Blog de Curiosidades
          </h2>

          {error && <div className="alert alert-danger text-center">{error}</div>}

          <div className="d-flex flex-column gap-4">
            {blogs.map((item) => (
              <div key={item.id} className="bg-dark text-light p-4 rounded shadow-sm border border-secondary">
                <div className="row align-items-center g-4">
                  <div className="col-lg-6 d-flex flex-column justify-content-between">
                    <div>
                      <h3 className="fw-bold text-uppercase mb-3">{item.title}</h3>
                      <p className="text-secondary mb-3">{item.summary}</p>
                    </div>
                    <div>
                      {/* Botón que navega a la noticia extendida */}
                      <Link
                        to={`/blog/${item.id}`}
                        className="btn btn-outline-light border-2 custom-btn-case fw-bold text-uppercase mt-2"
                      >
                        Leer Noticia Completa <i className="bi bi-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <img
                      src={item.image}
                      className="img-fluid rounded w-100 object-fit-cover"
                      style={{ maxHeight: '280px', ...estilosImagen[item.id] }}
                      alt={item.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
