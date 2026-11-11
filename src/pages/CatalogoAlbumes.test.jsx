// Esta prueba asegura que los productos/álbumes se estén renderizando correctamente en la pantalla a partir de los datos de la API.

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CatalogoAlbumes } from './CatalogoAlbumes';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, api: { ...actual.api, productos: vi.fn() } };
});

describe('Prueba Unitaria - Catálogo Albumes', () => {
  beforeEach(() => {
    api.productos.mockResolvedValue([
      { id: 'alb-1', titulo: 'Naturaleza Muerta', artista: 'Ley 20 mil', anio: 2011, precio: 17990, imagen: '/img/Ley20mil.jpg' }
    ]);
  });

  it('debe renderizar la lista de productos correctamente en la pantalla', async () => {
    render(
      <BrowserRouter>
        <CatalogoAlbumes />
      </BrowserRouter>
    );

    // Verifica que exista un encabezado propio de la vista
    const titulo = screen.getByRole('heading', { level: 1 });
    expect(titulo).toBeInTheDocument();

    // El álbum llega desde la API
    expect(await screen.findByText('Naturaleza Muerta')).toBeInTheDocument();
  });
});
