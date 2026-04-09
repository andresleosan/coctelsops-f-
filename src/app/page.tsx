import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, ShieldCheck, Zap } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS } from './lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 3);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-granizado')?.imageUrl || '';

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Delicious tropical granizado"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 leading-tight">
              Refresca tu <span className="text-primary italic">Día</span> con un Click
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Los granizados más vibrantes y frescos de la ciudad, ahora directo a tu hogar. Personaliza tu sabor ideal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full text-lg px-8 py-7" asChild>
                <Link href="/menu">
                  Ver Menú <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full text-lg px-8 py-7 bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/ai-suggest">Probar Sugeridor AI</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: "Envío Rápido", desc: "Tus granizados llegan fríos en menos de 30 min." },
            { icon: ShieldCheck, title: "Ingredientes Naturales", desc: "Fruta 100% real sin conservantes artificiales." },
            { icon: Zap, title: "Personalización Total", desc: "Crea tu mezcla perfecta con adiciones únicas." }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 bg-secondary/20 rounded-2xl border border-primary/10">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-headline font-bold mb-2">Favoritos de la Casa</h2>
            <p className="text-muted-foreground">Nuestros productos más pedidos esta semana.</p>
          </div>
          <Button variant="link" className="text-primary font-bold hidden sm:flex" asChild>
            <Link href="/menu">Ver todo el catálogo <ArrowRight className="ml-1 w-4 h-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Suggestion CTA */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-primary p-8 md:p-16 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-md">
              <Star className="w-4 h-4 fill-white" />
              <span>Nuevo: Sabores Inteligentes</span>
            </div>
            <h2 className="text-4xl font-headline font-bold leading-tight">¿No sabes qué elegir? Deja que nuestra IA te sorprenda</h2>
            <p className="text-white/80 text-lg">
              Nuestro algoritmo analiza las tendencias de la temporada para sugerirte la mezcla perfecta según tus antojos.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/ai-suggest">¡Sorpréndeme ahora!</Link>
            </Button>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-80 w-full">
            <Image
              src={PlaceHolderImages.find(img => img.id === 'ai-feature')?.imageUrl || ''}
              alt="AI Concept"
              fill
              className="object-cover rounded-2xl shadow-2xl rotate-3"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
