import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DetalleBlog } from './DetalleBlog';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, api: { ...actual.api, blog: vi.fn() } };
});

describe('Prueba Unitaria - Vista DetalleBlog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.blog.mockResolvedValue({
      id: 'caso1',
      title: 'La canción más corta de la historia',
      subtitle: 'Un récord Guinness',
      fecha: '05 de Octubre, 2026',
      autor: 'Redacción MusicMania',
      image: '/img/cancion_corta.jpg',
      contenidoExtendido:
        'Su tema "You Suffer" dura apenas 1,316 segundos.\n\nSegundo párrafo de la noticia.'
    });
  });

  it('debe renderizar la noticia completa cuando el ID existe', async () => {
    // Simulamos la entrada a la ruta con el ID 'caso1'
    render(
      <MemoryRouter initialEntries={['/blog/caso1']}>
        <Routes>
          <Route path="/blog/:id" element={<DetalleBlog />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificar el título principal de la noticia
    expect(
      await screen.findByRole('heading', { level: 1, name: /La canción más corta de la historia/i })
    ).toBeInTheDocument();

    // Verificar el autor y párrafos de contenido extendido
    expect(screen.getByText(/Redacción MusicMania/i)).toBeInTheDocument();
    expect(screen.getByText(/You Suffer/i)).toBeInTheDocument();
    expect(screen.getByText(/Segundo párrafo de la noticia/i)).toBeInTheDocument();
  });
});
