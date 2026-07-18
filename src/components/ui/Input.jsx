import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Input = React.forwardRef(({ label, icon, className, error, isValid, type = "text", tooltip, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const styles = {
    container: "space-y-1.5 w-full",
    labelWrapper: "flex items-center gap-1.5", // Adicionado para alinhar label e tooltip
    label: "text-xs font-bold uppercase tracking-wider text-slate-500 block",
    wrapper: "relative",
    iconWrapper: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400",
    eyeIconWrapper: "absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 cursor-pointer hover:text-slate-600 transition-colors",
    
    input: cn(
      "w-full py-2.5 bg-pastoral-bg-soft border rounded-xl text-pastoral-text-dark focus:outline-none transition-all text-sm font-medium",
      error 
        ? "border-pastoral-error bg-pastoral-error-bg focus:border-pastoral-error focus:ring-2 focus:ring-pastoral-error/20" 
        : isValid 
          ? "border-green-500 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
          : "border-pastoral-border focus:border-pastoral-accent focus:ring-2 focus:ring-pastoral-accent/20"
    ),
    errorText: "text-xs text-pastoral-error mt-1 font-medium",
    padding: cn(
      icon ? "pl-11" : "pl-4",
      isPassword ? "pr-11" : "pr-4"
    )
  };

  return (
    <div className={cn(styles.container, className)}>
      {label && (
        <div className={styles.labelWrapper}>
          <label className={styles.label}>{label}</label>
          {tooltip && (
            <div className="group relative">
              <svg className="w-4 h-4 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {/* Tooltip box */}
              <div className="absolute left-full ml-2 top-0 w-48 p-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl">
                {tooltip}
              </div>
            </div>
          )}
        </div>
      )}
      <div className={styles.wrapper}>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
        
        <input 
          ref={ref}
          type={inputType}
          {...props} 
          className={cn(styles.input, styles.padding)}
          autoComplete="off" 
        />

        {isPassword && (
          <button
            type="button"
            className={styles.eyeIconWrapper}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            )}
          </button>
        )}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;