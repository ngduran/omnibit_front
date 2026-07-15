// src/components/layout/AppToaster.jsx
import { Toaster } from 'sonner';

export default function AppToaster() {
  return (
    <Toaster 
      richColors 
      position="top-center" 
      expand={false}
      toastOptions={{
        style: {
          padding: '12px 20px',
          fontSize: '16px',
          fontWeight: '500',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: 'none',
          maxWidth: '400px'
        },
      }}
    />
  );
}