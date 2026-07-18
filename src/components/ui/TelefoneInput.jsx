import React from 'react';
import Input from './Input';

export default function TelefoneInput({ onChange, value, ...props }) {
  const handleMask = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número

    // Aplica parênteses no DDD
    if (valor.length > 2) {
      valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
    }

    // Lógica dinâmica para o hífen
    // Se o valor após a máscara for maior que 14 caracteres, é um celular (9 dígitos)
    // Caso contrário, é um telefone fixo (8 dígitos)
    if (valor.length > 14) {
      valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    } else if (valor.length > 9) {
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    }

    // Limita ao tamanho máximo de um celular formatado: (00) 00000-0000 = 15 caracteres
    e.target.value = valor.substring(0, 15);
    
    // Dispara a mudança para o react-hook-form
    onChange(e);
  };

  return (
    <Input 
      {...props} 
      value={value} 
      onChange={handleMask} 
      maxLength={15} 
    />
  );
}