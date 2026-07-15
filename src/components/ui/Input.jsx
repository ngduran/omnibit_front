import React from 'react';

export default function Input({ 
  label, 
  icon, 
  className = '', 
  ...props 
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Se passarmos a propriedade "label", ele renderiza o texto em cima */}
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Se passarmos a propriedade "icon", ele injeta o SVG dentro do input */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        
        <input
          {...props} // Aqui entram coisas como type="text", placeholder, onChange, etc.
          className={`
            w-full py-2.5 bg-pastoral-bg-soft border border-pastoral-border rounded-xl 
            text-pastoral-text-dark focus:outline-none focus:border-pastoral-primary-light 
            focus:ring-2 focus:ring-pastoral-primary-light/20 transition-all text-sm font-medium
            ${icon ? 'pl-11 pr-4' : 'px-4'} 
          `}
        />
      </div>
    </div>
  );
}