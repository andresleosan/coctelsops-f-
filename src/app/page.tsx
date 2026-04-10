import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, MessageSquare, MapPin, Star } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS } from './lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 3);
  
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-granizado')?.imageUrl || 'https://picsum.photos/seed/ops-hero/1200/800';
  const logoImage = PlaceHolderImages.find(img => img.id === 'logo-ops')?.imageUrl || 'https://picsum.photos/seed/ops-logo/600/600';
  const deliveryImage = PlaceHolderImages.find(img => img.id === 'delivery-info')?.imageUrl || 'https://picsum.photos/seed/ops-delivery/800/600';

  return (
    <div className="flex flex-col gap-12 md:gap-20 pb-20 bg-background text-white">
      {/* Hero Section - Optimizado para máximo impacto móvil */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Ambiente nocturno OPS"
            fill
            className="object-cover opacity-30 grayscale-[0.3]"
            priority
            data-ai-hint="neon cocktail"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/90 to-black"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <div className="relative w-48 h-48 md:w-80 md:h-80 rounded-full border-4 border-primary p-2 shadow-[0_0_50px_rgba(233,30,99,0.5)] bg-black overflow-hidden group transition-all">
              <Image 
                src={logoImage} 
                alt="COCTELS OPS OFICIAL" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                data-ai-hint="neon logo"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-accent font-black tracking-[0.3em] uppercase text-[10px] md:text-sm animate-pulse neon-text-cyan">
              LOS ORIGINALES
            </p>
            <h1 className="text-5xl md:text-9xl font-headline font-bold leading-tight tracking-tighter">
              COCTELS <span className="text-primary italic neon-text-magenta">OPS</span>
            </h1>
            <p className="text-base md:text-2xl text-white/70 max-w-2xl mx-auto font-light tracking-wide px-4">
              ¡¡ QUE CHIMBA UN OPS !! <br />
              La experiencia refrescante más potente de Medellín.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 px-4">
            <Button size="lg" className="rounded-full h-16 md:h-20 px-10 bg-primary text-white hover:bg-primary/90 neon-shadow-magenta font-black uppercase tracking-widest text-base" asChild>
              <Link href="/menu">
                VER EL MENÚ <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-16 md:h-20 px-10 border-accent text-accent hover:bg-accent/10 font-bold uppercase tracking-widest text-base" asChild>
              <Link href="https://wa.me/573245545530" target="_blank">
                <MessageSquare className="mr-2 w-5 h-5" /> WHATSAPP
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Domicilios & Info - Rediseñado para Mobile */}
      <section className="container mx-auto px-4">
        <div className="bg-card/40 border border-primary/20 rounded-[2.5rem] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter neon-text-magenta uppercase">DOMICILIOS</h2>
                <div className="h-2 w-24 bg-accent shadow-[0_0_15px_rgba(0,188,212,0.8)]"></div>
              </div>
              
              <div className="grid gap-4">
                <Link 
                  href="https://wa.me/573245545530" 
                  target="_blank"
                  className="flex items-center gap-5 p-6 rounded-2xl bg-black/60 border border-primary/20 group hover:border-primary/60 transition-all active:scale-95"
                >
                  <div className="bg-primary/20 p-4 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-[0_0_20px_rgba(233,30,99,0.3)]">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-0.5 font-bold">Pide por WhatsApp</p>
                    <p className="text-2xl font-bold text-white">324 554 5530</p>
                  </div>
                </Link>

                <div className="flex items-center gap-5 p-6 rounded-2xl bg-black/60 border border-accent/20">
                  <div className="bg-accent/20 p-4 rounded-xl text-accent shadow-[0_0_20px_rgba(0,188,212,0.3)]">
                    <Truck className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5 font-bold">Plataformas</p>
                    <div className="flex gap-4 items-center">
                      <span className="font-black text-sm text-[#FF4D00]">DiDi Food</span>
                      <span className="text-white/20">|</span>
                      <span className="font-black text-sm text-[#FF441F]">Rappi</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 border-l-4 border-accent bg-accent/5 rounded-r-2xl">
                <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-sm text-white font-medium">Carrera 37 # 66 D 36, Villa Hermosa</p>
                  <p className="text-xs text-muted-foreground italic tracking-wide">"Llegamos frío y potente a todo el barrio."</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 order-first md:order-last">
              <Image 
                src={deliveryImage} 
                alt="Delivery OPS" 
                fill 
                className="object-cover"
                data-ai-hint="delivery motorcycle"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-black/90 backdrop-blur-xl p-4 rounded-xl border border-primary/40 flex items-center justify-between">
                  <span className="font-bold text-[10px] uppercase tracking-widest text-white">ESTADO OPS</span>
                  <span className="flex items-center gap-2 text-green-400 text-[10px] font-black uppercase">
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tight">LOS MÁS <span className="text-primary italic neon-text-magenta">TOP</span></h2>
            <p className="text-muted-foreground tracking-[0.2em] uppercase text-[9px]">Mezclas exclusivas de la casa</p>
          </div>
          <Button variant="outline" className="border-primary text-primary rounded-full hover:bg-primary/10 px-8 h-12 uppercase font-black text-xs" asChild>
            <Link href="/menu">CATÁLOGO COMPLETO <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI CTA Section - Optimizado */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-purple-900 p-10 md:p-24 text-white">
          <div className="md:w-1/2 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/30">
              <Star className="w-4 h-4 fill-white" />
              <span>Sugeridor Inteligente</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-headline font-bold leading-none tracking-tighter uppercase">¿CUÁL ES TU <span className="text-black italic">OPS</span> IDEAL?</h2>
            <p className="text-white/80 text-base md:text-xl font-light leading-relaxed">
              Nuestra IA diseña la mezcla perfecta basándose en tus antojos. Dulce, ácido o una explosión tropical... tú decides.
            </p>
            <Button size="lg" variant="secondary" className="w-full md:w-auto rounded-full bg-white text-primary hover:bg-white/90 px-10 h-16 md:h-20 font-black text-lg shadow-2xl uppercase tracking-widest" asChild>
              <Link href="/ai-suggest">¡SORPRÉNDEME AHORA!</Link>
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-full h-full opacity-20 md:opacity-100 md:w-1/2 -z-0">
             <Image 
                src="https://picsum.photos/seed/ops-ai-splash/800/600" 
                alt="AI Flavor" 
                fill 
                className="object-cover"
                data-ai-hint="neon cocktail"
              />
          </div>
        </div>
      </section>
    </div>
  );
}
