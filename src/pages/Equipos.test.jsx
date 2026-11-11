import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Equipos } from './Equipos';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, api: { ...actual.api, productos: vi.fn() } };
});

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista Equipos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.productos.mockResolvedValue([
      { id: 'eq-1', titulo: 'Amplificador de Guitarra Marshall', categoria: 'equipos', precio: 399990, imagen: '/img/amplificadorMarshall.jpg', descripcion: 'Amplificador de prueba' },
    ]);
  });

  it('debe llamar a la función agregarAlCarrito al presionar Añadir al Carrito', async () => {
    const mockAgregar = vi.fn();
    renderWithRouter(<Equipos agregarAlCarrito={mockAgregar} />);

    // Esperar a que los equipos lleguen desde la API
    const botonesAgregar = await screen.findAllByRole('button', { name: /Añadir al Carrito/i });
    fireEvent.click(botonesAgregar[0]);

    expect(mockAgregar).toHaveBeenCalledTimes(1);
  });
});
