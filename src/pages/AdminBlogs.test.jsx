import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AdminBlogs } from './AdminBlogs';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, api: { ...actual.api, blogs: vi.fn(), crearBlog: vi.fn(), eliminarBlog: vi.fn() } };
});

describe('Prueba Unitaria - Módulo AdminBlogs conectado a la API', () => {
  let lista;

  beforeEach(() => {
    vi.clearAllMocks();
    lista = [];
    api.blogs.mockImplementation(async () => lista);
    api.crearBlog.mockImplementation(async (b) => {
      const nuevo = { id: 'blog-1', fecha: '11 de noviembre, 2026', ...b };
      lista = [nuevo, ...lista];
      return nuevo;
    });
  });

  it('debe abrir el modal, completar el formulario y enviar el nuevo artículo a la API', async () => {
    render(<AdminBlogs />);

    // 1. Abrir modal
    fireEvent.click(screen.getByRole('button', { name: /Nuevo Artículo/i }));

    // 2. Completar el formulario
    fireEvent.change(screen.getByPlaceholderText(/Ej: El álbum grabado bajo el agua\.../i), {
      target: { value: 'Nueva Curiosidad del Rock' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Breve resumen que aparecerá en la tarjeta principal\.../i), {
      target: { value: 'Resumen de prueba para el test unitario' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Escribe aquí los párrafos completos de la noticia\.../i), {
      target: { value: 'Este es el contenido extendido completo del artículo.' }
    });

    // 3. Publicar artículo
    fireEvent.click(screen.getByRole('button', { name: /Publicar Artículo/i }));

    // 4. La API recibe los datos y el artículo aparece en la tabla
    await waitFor(() => {
      expect(api.crearBlog).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Nueva Curiosidad del Rock',
          summary: 'Resumen de prueba para el test unitario'
        })
      );
    });
    expect(await screen.findByText('Nueva Curiosidad del Rock')).toBeInTheDocument();
  });
});
