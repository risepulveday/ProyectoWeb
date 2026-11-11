// Esta prueba simula el llenado del formulario de registro y valida que el nuevo usuario quede almacenado dentro del arreglo usuariosApp en el localStorage.

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { Registro } from './Registro';

describe('Prueba Unitaria - Registro', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe registrar un nuevo usuario con rol Cliente en localStorage', () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('193091180'), { target: { value: '193091180' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Alexander' } });
    fireEvent.change(screen.getByLabelText(/Apellidos/i), { target: { value: 'Lagos' } });
    fireEvent.change(screen.getByPlaceholderText('usuario@duoc.cl'), { target: { value: 'alexander@gmail.com' } });
    
    const inputsPassword = screen.getAllByLabelText(/Contraseña/i);
    fireEvent.change(inputsPassword[0], { target: { value: '1234' } });
    fireEvent.change(inputsPassword[1], { target: { value: '1234' } });

    fireEvent.change(screen.getByLabelText(/Región/i), { target: { value: 'Coquimbo' } });
    fireEvent.change(screen.getByLabelText(/Comuna/i), { target: { value: 'La Serena' } });
    fireEvent.change(screen.getByPlaceholderText('Av. Siempre Viva 123'), { target: { value: 'Calle Principal 456' } });

    fireEvent.click(screen.getByRole('button', { name: /Registrarme/i }));

    const usuarios = JSON.parse(localStorage.getItem('usuariosApp')) || [];
    const nuevoUsuario = usuarios.find((u) => u.correo === 'alexander@gmail.com');

    expect(nuevoUsuario).toBeDefined();
    expect(nuevoUsuario.rol).toBe('Cliente');
  });
});