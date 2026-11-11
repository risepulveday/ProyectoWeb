import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DetalleResena } from './DetalleResena';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    api: { ...actual.api, usuarios: vi.fn(), resenas: vi.fn(), crearResena: vi.fn() }
  };
});

describe('Prueba Unitaria - Vista DetalleResena conectada a la API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    // Usuario logueado (la sesión sigue en localStorage)
    localStorage.setItem(
      'usuarioSesion',
      JSON.stringify({ nombre: 'Usuario Prueba', correo: 'usuario@duoc.cl', rol: 'Cliente' })
    );

    api.usuarios.mockResolvedValue([]);
    api.resenas.mockResolvedValue([]);
    api.crearResena.mockImplementation(async (r) => ({ id: 99, fecha: '2026-11-11', ...r }));
  });

  it('debe permitir a un usuario publicar una reseña y enviarla a la API', async () => {
    render(
      <MemoryRouter initialEntries={['/resena/alb-1']}>
        <Routes>
          <Route path="/resena/:id" element={<DetalleResena />} />
        </Routes>
      </MemoryRouter>
    );

    // Escribir comentario y publicar
    const textarea = screen.getByPlaceholderText(/¿Qué opinas de este disco\?.../i);
    fireEvent.change(textarea, { target: { value: 'Excelente álbum de culto' } });
    fireEvent.click(screen.getByRole('button', { name: /Publicar Reseña/i }));

    // La reseña aparece en la interfaz
    expect(await screen.findByText(/"Excelente álbum de culto"/i)).toBeInTheDocument();

    // La API recibió los datos correctos
    await waitFor(() => {
      expect(api.crearResena).toHaveBeenCalledWith(
        expect.objectContaining({
          albumId: 'alb-1',
          comentario: 'Excelente álbum de culto',
          usuarioCorreo: 'usuario@duoc.cl',
          usuarioNombre: 'Usuario Prueba'
        })
      );
    });
  });
});
