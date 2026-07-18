import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function Button({ children, variant = 'primary', size = 'md', icon, className, ...props }) {
  const styles = {
    // 1. 'relative' para a película (before)
    // 2. 'overflow-hidden' para garantir que a película não saia das bordas arredondadas
    // 3. 'active:scale-[0.95]' (Feedback tátil funciona em todos os dispositivos)
    // 4. 'md:hover:scale-[1.02]' (Escala só acontece em telas médias/desktop)
    // 5. 'before:...' cria a película de vidro
    base: cn(
      "relative inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer overflow-hidden transform",
      "active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed",
      "md:hover:scale-[1.02]", 
      "before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:transition-opacity",
      "hover:before:opacity-100 focus:before:opacity-100"
    ),
    variants: {
      primary: "bg-pastoral-primary text-pastoral-bg-soft shadow-md",
      secondary: "bg-pastoral-bg-soft text-slate-600 border border-pastoral-border shadow-sm",
      danger: "bg-red-50 text-red-600",
      ghost: "bg-transparent text-slate-500",
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
      {/* z-10 garante que o texto fique acima da película de escurecimento */}
      {icon && <span className="flex-shrink-0 relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
}