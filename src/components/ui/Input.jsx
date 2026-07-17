import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Input = React.forwardRef(({ label, icon, className, error, isValid, ...props }, ref) => {
  const styles = {
    container: "space-y-1.5 w-full",
    label: "text-xs font-bold uppercase tracking-wider text-slate-500 block",
    wrapper: "relative",
    iconWrapper: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400",
    
    input: cn(
      "w-full py-2.5 bg-pastoral-bg-soft border rounded-xl text-pastoral-text-dark focus:outline-none transition-all text-sm font-medium",
      // Lógica de cores:
      error 
        ? "border-pastoral-error bg-pastoral-error-bg focus:border-pastoral-error focus:ring-2 focus:ring-pastoral-error/20" 
        : isValid 
          ? "border-green-500 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
          : "border-pastoral-border focus:border-pastoral-accent focus:ring-2 focus:ring-pastoral-accent/20"
    ),
    errorText: "text-xs text-pastoral-error mt-1 font-medium",
    padding: icon ? "pl-11 pr-4" : "px-4"
  };

  return (
    <div className={cn(styles.container, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.wrapper}>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
        <input 
          ref={ref}
          {...props} 
          className={cn(styles.input, styles.padding)} 
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;