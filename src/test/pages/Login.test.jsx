import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import * as AuthContext from '../../context/AuthContext';

// Criamos o mock da função login
const mockLogin = vi.fn();

// Mock do hook useAuth para retornar nossa função fake
vi.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
  login: mockLogin,
}));

describe('Componente Login', () => {
  it('deve submeter o formulário corretamente e chamar a função login', async () => {
    // Configura o mock para resolver com sucesso
    mockLogin.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/seu@email.com/i);
    const senhaInput = screen.getByPlaceholderText(/digite a sua senha/i);
    const botaoEntrar = screen.getByText(/entrar/i);

    // Simulamos a digitação
    fireEvent.change(emailInput, { target: { value: 'usuario@teste.com' } });
    // Disparamos o blur para disparar a validação 'onBlur' do hook form
    fireEvent.blur(emailInput);
    
    // Usamos uma senha forte que provavelmente atende à validação (requisito comum)
    fireEvent.change(senhaInput, { target: { value: 'Senha123!' } });
    fireEvent.blur(senhaInput);
    
    // Clicamos no botão
    fireEvent.click(botaoEntrar);

    // Aguardamos a chamada da função
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'usuario@teste.com',
        senha: 'Senha123!'
      });
    });
  });
});