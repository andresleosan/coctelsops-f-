
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, ShieldCheck, Zap, MessageSquare, Phone } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS } from './lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 3);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-granizado')?.imageUrl || '';
  const logoImage = PlaceHolderImages.find(img => img.id === 'logo-ops')?.imageUrl || '';

  return (
    <div className="flex flex-col gap-20 pb-20 bg-background">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Delicious tropical granizado"
            fill
            className="object-cover opacity-40 grayscale-[0.5]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/80 to-background"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 rounded-full border-4 border-primary p-2 shadow-[0_0_30px_rgba(255,0,255,0.4)] bg-black">
              <Image 
                src={logoImage} 
                alt="Coctels OPS Logo" 
                fill 
                className="object-contain rounded-full"
                data-ai-hint="neon logo"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm animate-pulse">
              ¡¡ QUE CHIMBA UN OPS !!
            </p>
            <h1 className="text-6xl md:text-8xl font-headline font-bold mb-6 leading-tight text-white drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">
              Coctels <span className="text-primary italic">OPS</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-3xl mx-auto font-light">
              La experiencia refrescante más potente de Medellín. Granizados y cocteles que activan tus sentidos.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="rounded-full text-lg px-10 py-8 bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(255,0,255,0.3)]" asChild>
              <Link href="/menu">
                VER EL MENÚ <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-lg px-10 py-8 border-primary text-primary hover:bg-primary/10" asChild>
              <Link href="https://wa.me/573245545530" target="_blank">
                <MessageSquare className="mr-2 w-5 h-5" /> WHATSAPP
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Domicilios & Platforms Section */}
      <section className="container mx-auto px-4">
        <div className="bg-card border border-primary/20 rounded-[3rem] p-12 shadow-[0_0_50px_rgba(255,0,255,0.05)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-headline font-bold">DOMICILIOS</h2>
                <div className="h-1 w-20 bg-primary"></div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-secondary/50 border border-primary/10 group hover:border-primary/40 transition-all">
                  <div className="bg-primary/20 p-4 rounded-xl text-primary">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Pide por WhatsApp</p>
                    <p className="text-2xl font-bold text-white tracking-wider">324 554 5530</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-6 rounded-2xl bg-secondary/50 border border-primary/10">
                  <div className="bg-primary/20 p-4 rounded-xl text-primary">
                    <Truck className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Encuéntranos en</p>
                    <div className="flex gap-4 items-center">
                      <span className="font-bold text-lg text-[#FF4D00]">DiDi Food</span>
                      <span className="text-muted-foreground">|</span>
                      <span className="font-bold text-lg text-[#FF441F]">Rappi</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-l-4 border-primary bg-primary/5 rounded-r-2xl">
                <p className="text-sm italic text-white/90">
                  "Estamos a tu alcance en Villa Hermosa y alrededores. ¡Llegamos rápido y frío!"
                </p>
                <p className="text-xs mt-2 text-muted-foreground">Carrera 37 # 66 D 36, Medellín</p>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/delivery/800/600" 
                alt="Delivery OPS" 
                fill 
                className="object-cover"
                data-ai-hint="delivery motorcycle"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-primary/30 flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-widest">Estado del Servicio</span>
                  <span className="flex items-center gap-2 text-green-400 text-xs font-bold">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                    ABIERTO AHORA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-headline font-bold mb-2 tracking-tight">LOS MÁS <span className="text-primary italic">TOP</span></h2>
            <p className="text-muted-foreground">Las mezclas que no te puedes perder.</p>
          </div>
          <Button variant="outline" className="border-primary text-primary rounded-full hover:bg-primary/10" asChild>
            <Link href="/menu">VER TODO EL CATÁLOGO <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Suggestion CTA */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-purple-900 p-8 md:p-20 text-white flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/30">
              <Star className="w-4 h-4 fill-white" />
              <span>Sugeridor Inteligente</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-headline font-bold leading-none tracking-tighter">¿CUÁL ES TU <span className="text-black italic">OPS</span> IDEAL?</h2>
            <p className="text-white/80 text-lg font-light leading-relaxed">
              Nuestra IA diseña la mezcla perfecta basándose en tus antojos. Dulce, ácido o una explosión tropical... tú decides.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90 px-10 py-8 font-bold text-lg shadow-2xl" asChild>
              <Link href="/ai-suggest">¡SORPRÉNDEME AHORA!</Link>
            </Button>
          </div>
          <div className="md:w-1/2 relative h-[400px] w-full group">
            <div className="absolute inset-0 bg-primary blur-[80px] opacity-30 animate-pulse"></div>
            <Image
              src={PlaceHolderImages.find(img => img.id === 'ai-feature')?.imageUrl || ''}
              alt="AI Concept"
              fill
              className="object-cover rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
