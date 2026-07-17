import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function Input({ label, icon, className, ...props }) {
  const styles = {
    container: "space-y-1.5",
    label: "text-xs font-bold uppercase tracking-wider text-slate-500 block",
    wrapper: "relative",
    iconWrapper: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400",
    // Aqui incluímos o foco com a cor accent e o shadow conforme seu estilo antigo
    input: "w-full py-2.5 bg-pastoral-bg-soft border border-pastoral-border rounded-xl text-pastoral-text-dark focus:outline-none focus:border-pastoral-accent focus:ring-2 focus:ring-pastoral-accent/20 transition-all text-sm font-medium",
    padding: icon ? "pl-11 pr-4" : "px-4"
  };

  return (
    <div className={cn(styles.container, className)}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div className={styles.wrapper}>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
        <input {...props} className={cn(styles.input, styles.padding)} />
      </div>
    </div>
  );
}