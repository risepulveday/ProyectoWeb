// Esta prueba verifica que al ingresar credenciales correctas (validadas por la API), los datos se guardan en el localStorage en la clave usuarioSesion.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IniciarSesion } from './IniciarSesion';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, api: { ...actual.api, login: vi.fn() } };
});

describe('Prueba Unitaria - IniciarSesion', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('debe iniciar sesión correctamente y guardar usuarioSesion en localStorage', async () => {
    api.login.mockResolvedValue({
      id: 1,
      nombre: 'Administrador Principal',
      correo: 'admin@duoc.cl',
      rol: 'Administrador'
    });

    render(
      <BrowserRouter>
        <IniciarSesion />
      </BrowserRouter>
    );

    const inputCorreo = screen.getByPlaceholderText('nombre@duoc.cl');
    const inputPassword = screen.getByPlaceholderText('••••••••');
    const botonSubmit = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(inputCorreo, { target: { value: 'admin@duoc.cl' } });
    fireEvent.change(inputPassword, { target: { value: 'admin' } });
    fireEvent.click(botonSubmit);

    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith('admin@duoc.cl', 'admin');
      const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));
      expect(usuarioSesion).not.toBeNull();
      expect(usuarioSesion.correo).toBe('admin@duoc.cl');
    });
  });

  it('debe mostrar un mensaje de error si la API rechaza las credenciales', async () => {
    api.login.mockRejectedValue(new Error('Correo o contraseña incorrectos.'));

    render(
      <BrowserRouter>
        <IniciarSesion />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('nombre@duoc.cl'), { target: { value: 'admin@duoc.cl' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'mala1234' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    expect(await screen.findByText(/Correo o contraseña incorrectos/i)).toBeInTheDocument();
    expect(localStorage.getItem('usuarioSesion')).toBeNull();
  });
});
