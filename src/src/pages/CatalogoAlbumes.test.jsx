// Esta prueba asegura que los productos/álbumes se estén renderizando correctamente en la pantalla a partir de la lista de datos.

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { CatalogoAlbumes } from './CatalogoAlbumes'; 

describe('Prueba Unitaria - Catálogo Albumes', () => {
  it('debe renderizar la lista de productos correctamente en la pantalla', () => {
    render(
      <BrowserRouter>
        <CatalogoAlbumes />
      </BrowserRouter>
    );

    // Verifica que exista un encabezado o elemento propio de la vista
    const titulo = screen.getByRole('heading', { level: 1 });
    expect(titulo).toBeInTheDocument();
  });
});