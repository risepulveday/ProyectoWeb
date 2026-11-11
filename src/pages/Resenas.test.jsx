import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Resenas } from './Resena';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, api: { ...actual.api, resenas: vi.fn() } };
});

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista Resenas', () => {
  beforeEach(() => {
    api.resenas.mockResolvedValue([]);
  });

  it('debe renderizar el título principal y la lista de reseñas de álbumes', async () => {
    renderWithRouter(<Resenas />);

    // Verificar encabezado de la página
    expect(screen.getByRole('heading', { level: 1, name: /Reseñas de Álbumes/i })).toBeInTheDocument();

    // Usar getAllByText para evitar fallos si el nombre se repite en descripción
    const elementosNaturaleza = screen.getAllByText(/Naturaleza Muerta/i);
    expect(elementosNaturaleza.length).toBeGreaterThan(0);

    const elementosKaseo = screen.getAllByText(/Kase.O/i);
    expect(elementosKaseo.length).toBeGreaterThan(0);

    // Las reseñas de la comunidad se piden a la API
    expect(api.resenas).toHaveBeenCalled();
  });
});
