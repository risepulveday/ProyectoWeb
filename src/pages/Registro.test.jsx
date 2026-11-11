// Esta prueba simula el llenado del formulario de registro y valida que los datos se envíen a la API de registro.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Registro } from './Registro';
import { api } from '../services/api';

vi.mock('../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, api: { ...actual.api, registro: vi.fn() } };
});

describe('Prueba Unitaria - Registro', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe enviar el nuevo usuario a la API y mostrar el mensaje de éxito', async () => {
    api.registro.mockResolvedValue({ id: 10, correo: 'alexander@gmail.com', rol: 'Cliente' });

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

    await waitFor(() => {
      expect(api.registro).toHaveBeenCalledWith(
        expect.objectContaining({ correo: 'alexander@gmail.com', nombre: 'Alexander Lagos' })
      );
    });
    expect(await screen.findByText(/Usuario creado correctamente/i)).toBeInTheDocument();
  });
});
