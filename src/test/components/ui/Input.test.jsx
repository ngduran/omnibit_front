import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../../../components/ui/Input';

describe('Componente Input', () => {
  it('deve renderizar o label corretamente', () => {
    render(<Input label="E-mail" />);
    expect(screen.getByText(/e-mail/i)).toBeInTheDocument();
  });

  it('deve renderizar o ícone quando fornecido', () => {
    // Usamos um teste simples (span) para simular o ícone SVG
    render(<Input icon={<span data-testid="icon">🔍</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('deve permitir que o usuário digite no campo', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Digite algo" />);
    
    const input = screen.getByPlaceholderText(/digite algo/i);
    fireEvent.change(input, { target: { value: 'texto teste' } });
    
    expect(input.value).toBe('texto teste');
    expect(handleChange).toHaveBeenCalled();
  });
});