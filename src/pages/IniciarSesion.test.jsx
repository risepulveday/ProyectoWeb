// Esta prueba verifica que al ingresar credenciales correctas, los datos se guardan en el localStorage en la clave usuarioSesion.

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { IniciarSesion } from './IniciarSesion';

describe('Prueba Unitaria - IniciarSesion', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe iniciar sesión correctamente y guardar usuarioSesion en localStorage', () => {
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

    const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));
    expect(usuarioSesion).not.toBeNull();
    expect(usuarioSesion.correo).toBe('admin@duoc.cl');
  });
});