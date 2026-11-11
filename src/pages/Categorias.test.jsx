import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { Categorias } from './Categorias';

// Wrapper para componentes que usan <Link> de react-router-dom
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Pruebas Unitarias para Categorias', () => {

  // 1. Renderizado correcto (Lista de productos)
  it('debe renderizar el título de Categorías y los productos iniciales', () => {
    renderWithRouter(<Categorias agregarAlCarrito={() => {}} />);
    
    // Verificar título principal
    expect(screen.getByRole('heading', { name: /CATEGORÍAS/i })).toBeInTheDocument();
    
    // Verificar que existen botones de filtro
    expect(screen.getByRole('button', { name: /Todas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Vinilos/i })).toBeInTheDocument();
  });

  // 2. Renderizado condicional / Filtros
  it('debe filtrar productos al hacer clic en el botón de la categoría "Equipos"', () => {
    renderWithRouter(<Categorias agregarAlCarrito={() => {}} />);

    const btnEquipos = screen.getByRole('button', { name: /^Equipos$/i });
    fireEvent.click(btnEquipos);

    // Verificar que se renderiza un producto de la categoría equipos
    expect(screen.getByText(/Amplificador de Guitarra Marshall/i)).toBeInTheDocument();
  });

  // 3. Pruebas de Props y Manejo de Eventos (onClick)
  it('debe llamar a la función agregarAlCarrito al presionar "Añadir"', () => {
    const mockAgregarAlCarrito = vi.fn();
    renderWithRouter(<Categorias agregarAlCarrito={mockAgregarAlCarrito} />);

    // Buscar el primer botón "Añadir"
    const botonesAñadir = screen.getAllByRole('button', { name: /Añadir/i });
    fireEvent.click(botonesAñadir[0]);

    // Validar que la prop función fue ejecutada
    expect(mockAgregarAlCarrito).toHaveBeenCalledTimes(1);
  });

  // 4. Pruebas de Estado (Notificación Toast)
  it('debe mostrar la notificación Toast tras añadir un producto', () => {
    renderWithRouter(<Categorias agregarAlCarrito={() => {}} />);

    const botonesAñadir = screen.getAllByRole('button', { name: /Añadir/i });
    fireEvent.click(botonesAñadir[0]);

    // Verificar que el estado cambie y renderice la alerta Toast
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/se agregó al carrito/i)).toBeInTheDocument();
  });
});