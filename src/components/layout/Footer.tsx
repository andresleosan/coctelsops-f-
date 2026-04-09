
import { Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-primary text-xl">Granizado Go</h3>
            <p className="text-sm text-muted-foreground">
              Llevamos la frescura tropical directamente a tu puerta. Inspirados por los sabores auténticos y la alegría del Caribe.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Explora</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/menu" className="hover:text-primary transition-colors">Nuestro Menú</Link></li>
              <li><Link href="/ai-suggest" className="hover:text-primary transition-colors">Sugeridor de Sabores</Link></li>
              <li><Link href="/checkout" className="hover:text-primary transition-colors">Checkout</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Medellín, Colombia</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Síguenos</h4>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/coctels_ops" target="_blank" className="bg-white p-2 rounded-full shadow-sm hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="bg-white p-2 rounded-full shadow-sm hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Granizado Go. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
