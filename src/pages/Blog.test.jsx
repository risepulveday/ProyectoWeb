import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Blog } from './Blog';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, api: { ...actual.api, blogs: vi.fn() } };
});

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista Blog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.blogs.mockResolvedValue([
      { id: 'caso1', title: 'La canción más corta de la historia', summary: 'Resumen 1', image: '/img/cancion_corta.jpg' },
      { id: 'caso2', title: 'La obra musical más larga jamás interpretada', summary: 'Resumen 2', image: '/img/cancion_larga.jpg' },
    ]);
  });

  it('debe renderizar el título del blog y las publicaciones de curiosidades', async () => {
    renderWithRouter(<Blog />);

    // Verificar encabezado principal
    expect(screen.getByRole('heading', { level: 2, name: /Blog de Curiosidades/i })).toBeInTheDocument();

    // Verificar noticias que llegan desde la API
    expect(await screen.findByText(/La canción más corta de la historia/i)).toBeInTheDocument();
    expect(screen.getByText(/La obra musical más larga jamás interpretada/i)).toBeInTheDocument();
  });
});
