import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
// Ajustado: subindo dois níveis para sair de 'test/components/ui' e entrar em 'components/ui'
import Button from '../../../components/ui/Button'; 

describe('Componente Button', () => {
  it('deve renderizar o botão com o texto correto', () => {
    render(<Button>Clique Aqui</Button>);
    const buttonElement = screen.getByText(/clique aqui/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('deve disparar a função onClick ao ser clicado', () => {
    const handleClick = vi.fn(); 
    render(<Button onClick={handleClick}>Enviar</Button>);
    
    const buttonElement = screen.getByText(/enviar/i);
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});