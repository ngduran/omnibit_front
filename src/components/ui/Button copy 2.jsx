import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function Button({ children, variant = 'primary', size = 'md', icon, className, ...props }) {
  const styles = {
    // Adicionei 'duration-200' para que a transição seja suave e perceptível
    base: "inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
    variants: {
      // O 'brightness-110' aumenta o brilho sutilmente no hover, criando um efeito de "glow" muito moderno
      primary: "bg-pastoral-primary text-pastoral-bg-soft shadow-md hover:brightness-110 hover:shadow-lg",
      // O secondary e ghost agora usam cores neutras de hover para garantir contraste, evitando o problema de "se misturar com o fundo"
      secondary: "bg-pastoral-bg-soft text-slate-600 border border-pastoral-border hover:bg-slate-50 hover:text-slate-800 shadow-sm",
      danger: "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700",
      // Alterado para um cinza bem claro que sempre se destaca, independente do fundo do card
      ghost: "bg-transparent text-slate-500 hover:bg-slate-100/80 hover:text-slate-700",
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