import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Categorias } from './Categorias';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, api: { ...actual.api, productos: vi.fn() } };
});

const productosMock = [
  { id: 'alb-1', titulo: 'Naturaleza Muerta', artista: 'Ley 20 mil', categoria: 'vinilos', precio: 17990, imagen: '/img/Ley20mil.jpg' },
  { id: 'eq-1', titulo: 'Amplificador de Guitarra Marshall', artista: 'Marshall', categoria: 'equipos', precio: 399990, imagen: '/img/amplificadorMarshall.jpg' },
];

// Wrapper para componentes que usan <Link> de react-router-dom
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Pruebas Unitarias para Categorias', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.productos.mockResolvedValue(productosMock);
  });

  // 1. Renderizado correcto (título y filtros)
  it('debe renderizar el título de Categorías y los botones de filtro', async () => {
    renderWithRouter(<Categorias agregarAlCarrito={() => {}} />);

    expect(screen.getByRole('heading', { name: /CATEGORÍAS/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Todas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Vinilos/i })).toBeInTheDocument();

    // Productos cargados desde la API
    expect(await screen.findByText(/Naturaleza Muerta - Ley 20 mil/i)).toBeInTheDocument();
  });

  // 2. Renderizado condicional / Filtros
  it('debe filtrar productos al hacer clic en el botón de la categoría "Equipos"', async () => {
    renderWithRouter(<Categorias agregarAlCarrito={() => {}} />);
    await screen.findByText(/Naturaleza Muerta - Ley 20 mil/i);

    fireEvent.click(screen.getByRole('button', { name: /^Equipos$/i }));

    expect(screen.getByText(/Amplificador de Guitarra Marshall/i)).toBeInTheDocument();
    expect(screen.queryByText(/Naturaleza Muerta/i)).not.toBeInTheDocument();
  });

  // 3. Pruebas de Props y Manejo de Eventos (onClick)
  it('debe llamar a la función agregarAlCarrito al presionar "Añadir"', async () => {
    const mockAgregarAlCarrito = vi.fn();
    renderWithRouter(<Categorias agregarAlCarrito={mockAgregarAlCarrito} />);

    const botonesAñadir = await screen.findAllByRole('button', { name: /Añadir/i });
    fireEvent.click(botonesAñadir[0]);

    expect(mockAgregarAlCarrito).toHaveBeenCalledTimes(1);
  });

  // 4. Pruebas de Estado (Notificación Toast)
  it('debe mostrar la notificación Toast tras añadir un producto', async () => {
    renderWithRouter(<Categorias agregarAlCarrito={() => {}} />);

    const botonesAñadir = await screen.findAllByRole('button', { name: /Añadir/i });
    fireEvent.click(botonesAñadir[0]);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/se agregó al carrito/i)).toBeInTheDocument();
  });
});
