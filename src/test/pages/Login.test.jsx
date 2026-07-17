import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import * as AuthContext from '../../context/AuthContext'; // Importamos o módulo todo

// Criamos um mock da função login
const mockLogin = vi.fn();

// Mock do hook useAuth para retornar nossa função fake
vi.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
  login: mockLogin,
}));

describe('Componente Login', () => {
  it('deve submeter o formulário corretamente e chamar a função login', async () => {
    mockLogin.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/seu@email.com/i);
    const senhaInput = screen.getByPlaceholderText(/digite a sua senha/i);
    const botaoEntrar = screen.getByText(/entrar/i);

    fireEvent.change(emailInput, { target: { value: 'usuario@teste.com' } });
    fireEvent.change(senhaInput, { target: { value: 'senha123' } });
    fireEvent.click(botaoEntrar);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'usuario@teste.com',
        senha: 'senha123'
      });
    });
  });
});