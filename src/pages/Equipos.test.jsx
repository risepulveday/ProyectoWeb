import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { Equipos } from './Equipos';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista Equipos', () => {
  it('debe llamar a la función agregarAlCarrito al presionar Añadir al Carrito', () => {
    const mockAgregar = vi.fn();
    renderWithRouter(<Equipos agregarAlCarrito={mockAgregar} />);

    // Buscar todos los botones de "Añadir al Carrito" y hacer clic en el primero
    const botonesAgregar = screen.getAllByRole('button', { name: /Añadir al Carrito/i });
    fireEvent.click(botonesAgregar[0]);

    // Verificar que la función fue ejecutada
    expect(mockAgregar).toHaveBeenCalledTimes(1);
  });
});