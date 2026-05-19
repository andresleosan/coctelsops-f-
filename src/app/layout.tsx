
import type {Metadata} from 'next';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Coctels OPS | ¡¡ QUE CHIMBA UN OPS !!',
  description: 'Los mejores granizados y cocteles neón en Medellín. Domicilios en Villa Hermosa.',
  icons: {
    icon: '/favicon.ico',
    apple: '/Contels_OPS.Perfil.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/Contels_OPS.Perfil.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/Contels_OPS.Perfil.png?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
