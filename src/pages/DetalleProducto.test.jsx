import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DetalleProducto } from './DetalleProducto';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, api: { ...actual.api, producto: vi.fn() } };
});

describe('Prueba Unitaria - Vista DetalleProducto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.producto.mockResolvedValue({
      id: 'eq-1',
      titulo: 'Amplificador de Guitarra Marshall',
      artista: 'Marshall',
      categoria: 'equipos',
      precio: 399990,
      stock: 5,
      imagen: '/img/amplificadorMarshall.jpg',
      descripcion: 'Amplificador de alta fidelidad.',
    });
  });

  it('debe renderizar la información del producto y ejecutar agregarAlCarrito al presionar el botón', async () => {
    const agregarAlCarritoMock = vi.fn();

    // Simulamos la navegación a la ruta con el ID 'eq-1'
    render(
      <MemoryRouter initialEntries={['/producto/eq-1']}>
        <Routes>
          <Route
            path="/producto/:id"
            element={<DetalleProducto agregarAlCarrito={agregarAlCarritoMock} />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Esperar a que el producto llegue desde la API
    expect(await screen.findByText(/Amplificador de Guitarra Marshall/i)).toBeInTheDocument();
    expect(api.producto).toHaveBeenCalledWith('eq-1');

    // Simular el clic en el botón de agregar al carrito
    fireEvent.click(screen.getByRole('button', { name: /Añadir al Carrito/i }));

    expect(agregarAlCarritoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'eq-1',
        nombre: 'Amplificador de Guitarra Marshall',
        precio: 399990
      })
    );
  });
});
