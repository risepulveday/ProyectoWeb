import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { Ofertas } from './Ofertas';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista Ofertas', () => {
  it('debe ejecutar agregarAlCarrito al presionar Aprovechar Oferta', () => {
    const mockAgregar = vi.fn();
    renderWithRouter(<Ofertas agregarAlCarrito={mockAgregar} />);

    // Buscar los botones de oferta y presionar el primero
    const botonesOferta = screen.getAllByRole('button', { name: /Aprovechar Oferta/i });
    fireEvent.click(botonesOferta[0]);

    // Verificar que la función fue invocada correctamente
    expect(mockAgregar).toHaveBeenCalledTimes(1);
  });
});