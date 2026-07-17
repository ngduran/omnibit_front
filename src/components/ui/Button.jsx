import React from 'react';

export default function Button({ 
  children, variant = 'primary', size = 'md', icon, className = '', ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-pastoral-primary text-pastoral-bg-soft shadow-md hover:opacity-90",
    secondary: "bg-pastoral-bg-soft text-slate-600 border border-pastoral-border hover:bg-slate-100 hover:text-slate-800 shadow-sm",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700",
    // Removemos o hover:text-pastoral-primary para dar total controle ao componente pai
    ghost: "bg-transparent text-slate-500 hover:bg-pastoral-bg-soft", 
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-6 py-3 text-base rounded-2xl gap-3",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon && <span className="flex-shrink-0 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
}