import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { DetalleProducto } from './DetalleProducto';

describe('Prueba Unitaria - Vista DetalleProducto', () => {
  it('debe renderizar la información del producto y ejecutar agregarAlCarrito al presionar el botón', () => {
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

    // Verificar que se renderice el nombre del producto 'eq-1'
    expect(screen.getByText(/Amplificador de Guitarra Marshall/i)).toBeInTheDocument();

    // Simular el clic en el botón de agregar al carrito
    const botonAgregar = screen.getByRole('button', { name: /Añadir al Carrito/i });
    fireEvent.click(botonAgregar);

    // Verificar que la función fue llamada con el producto correspondiente
    expect(agregarAlCarritoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'eq-1',
        nombre: 'Amplificador de Guitarra Marshall',
        precio: 399990
      })
    );
  });
});