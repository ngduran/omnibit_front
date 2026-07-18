import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function Button({ children, variant = 'primary', size = 'md', icon, className, ...props }) {
  const styles = {
    // Adicionamos 'transform' para permitir escalas e tornamos a transição um pouco mais rápida (150ms) para dar um sentido de resposta imediata
    base: "inline-flex items-center justify-center font-bold transition-all duration-150 transform cursor-pointer active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]",
    variants: {
      // Aumentamos o brilho para 125% e adicionamos um leve scale para o botão "saltar" ao passar o mouse
      primary: "bg-pastoral-primary text-pastoral-bg-soft shadow-md hover:brightness-125 hover:shadow-xl",
      // Mudamos para slate-200 no hover para garantir um contraste claro em qualquer fundo
      secondary: "bg-pastoral-bg-soft text-slate-600 border border-pastoral-border hover:bg-slate-200 hover:text-slate-900 shadow-sm",
      danger: "bg-red-50 text-red-600 hover:bg-red-200 hover:text-red-800",
      // O ghost agora fica com um fundo cinza mais visível ao passar o mouse
      ghost: "bg-transparent text-slate-500 hover:bg-slate-200/70 hover:text-slate-800",
    },
    sizes: {
      sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-5 py-2.5 text-sm rounded-xl gap-2",
      lg: "px-6 py-3 text-base rounded-2xl gap-3",
    }
  };

  return (
    <button 
      className={cn(styles.base, styles.variants[variant], styles.sizes[size], className)} 
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}