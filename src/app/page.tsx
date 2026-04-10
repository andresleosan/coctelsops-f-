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
      {/* Hero Section - Optimizado Mobile */}
      <section className="relative min-h-[85vh] md:h-[95vh] flex items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Ambiente nocturno OPS"
            fill
            className="object-cover opacity-30 grayscale-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8 md:space-y-12 animate-fade-in">
          <div className="flex justify-center">
            <div className="relative w-44 h-44 md:w-80 md:h-80 rounded-full border-4 border-primary p-2 shadow-[0_0_40px_rgba(233,30,99,0.5)] bg-black overflow-hidden group transition-all">
              <Image 
                src={logoImage} 
                alt="COCTELS OPS OFICIAL" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <p className="text-accent font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-[10px] md:text-sm animate-pulse neon-text-cyan">
              LOS ORIGINALES
            </p>
            <h1 className="text-4xl md:text-9xl font-headline font-bold mb-4 leading-tight tracking-tighter">
              COCTELS <span className="text-primary italic neon-text-magenta">OPS</span>
            </h1>
            <p className="text-base md:text-2xl mb-8 text-white/70 max-w-2xl mx-auto font-light tracking-wide px-4">
              ¡¡ QUE CHIMBA UN OPS !! <br />
              La experiencia refrescante más potente de Medellín.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 px-4">
            <Button size="lg" className="rounded-full text-base md:text-lg h-14 md:h-20 px-8 md:px-12 bg-primary text-white hover:bg-primary/90 neon-shadow-magenta transition-all font-black uppercase tracking-widest" asChild>
              <Link href="/menu">
                VER EL MENÚ <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base md:text-lg h-14 md:h-20 px-8 md:px-12 border-accent text-accent hover:bg-accent/10 transition-all font-bold uppercase tracking-widest" asChild>
              <Link href="https://wa.me/573245545530" target="_blank">
                <MessageSquare className="mr-2 w-5 h-5" /> WHATSAPP
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Domicilios & Info - Optimizado para Mobile */}
      <section className="container mx-auto px-4">
        <div className="bg-card/50 border border-primary/30 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-8 md:space-y-10">
              <div className="space-y-2 md:space-y-3">
                <h2 className="text-3xl md:text-6xl font-headline font-bold tracking-tighter neon-text-magenta uppercase">DOMICILIOS</h2>
                <div className="h-1.5 md:h-2 w-20 md:w-32 bg-accent shadow-[0_0_15px_rgba(0,188,212,0.8)]"></div>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                <Link 
                  href="https://wa.me/573245545530" 
                  target="_blank"
                  className="flex items-center gap-4 md:gap-6 p-4 md:p-8 rounded-2xl md:rounded-3xl bg-black/60 border border-primary/20 group hover:border-primary/60 transition-all"
                >
                  <div className="bg-primary/20 p-3 md:p-5 rounded-xl md:rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-[0_0_20px_rgba(233,30,99,0.3)]">
                    <MessageSquare className="w-6 h-6 md:w-10 md:h-10" />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-accent mb-1 font-bold">Pide por WhatsApp</p>
                    <p className="text-xl md:text-3xl font-bold text-white tracking-widest">324 554 5530</p>
                  </div>
                </Link>

                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-8 rounded-2xl md:rounded-3xl bg-black/60 border border-accent/20">
                  <div className="bg-accent/20 p-3 md:p-5 rounded-xl md:rounded-2xl text-accent shadow-[0_0_20px_rgba(0,188,212,0.3)]">
                    <Truck className="w-6 h-6 md:w-10 md:h-10" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-1 font-bold">También en</p>
                    <div className="flex gap-4 md:gap-6 items-center flex-wrap">
                      <span className="font-black text-sm md:text-xl text-[#FF4D00]">DiDi Food</span>
                      <span className="text-white/20 hidden md:inline">|</span>
                      <span className="font-black text-sm md:text-xl text-[#FF441F]">Rappi</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 md:p-6 border-l-4 border-accent bg-accent/5 rounded-r-2xl md:rounded-r-3xl">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-sm md:text-base text-white font-medium">Carrera 37 # 66 D 36, Villa Hermosa</p>
                  <p className="text-[10px] md:text-sm text-muted-foreground italic tracking-wide">"Llegamos frío y potente a todo el barrio."</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-video md:aspect-square rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 order-first md:order-last">
              <Image 
                src={deliveryImage} 
                alt="Delivery OPS" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                <div className="bg-black/90 backdrop-blur-xl p-3 md:p-5 rounded-xl md:rounded-2xl border border-primary/40 flex items-center justify-between">
                  <span className="font-bold text-[9px] md:text-sm uppercase tracking-widest text-white">SERVICIO ACTIVO</span>
                  <span className="flex items-center gap-2 md:gap-3 text-green-400 text-[9px] md:text-sm font-black uppercase">
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-ping"></span>
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tight">LOS MÁS <span className="text-primary italic neon-text-magenta">TOP</span></h2>
            <p className="text-muted-foreground tracking-[0.2em] uppercase text-[9px] md:text-[10px]">Mezclas exclusivas de la casa</p>
          </div>
          <Button variant="outline" className="border-primary text-primary rounded-full hover:bg-primary/10 px-6 md:px-8 text-sm md:text-base h-10 md:h-12 uppercase font-black" asChild>
            <Link href="/menu">CATÁLOGO COMPLETO <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI CTA Section - Optimizado para Mobile */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-[2rem] md:rounded-[4rem] overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-purple-900 p-8 md:p-24 text-white">
          <div className="md:w-1/2 space-y-6 md:space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/30">
              <Star className="w-3 h-3 md:w-4 md:h-4 fill-white" />
              <span>Sugeridor Inteligente</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-headline font-bold leading-none tracking-tighter uppercase">¿CUÁL ES TU <span className="text-black italic">OPS</span> IDEAL?</h2>
            <p className="text-white/80 text-sm md:text-xl font-light leading-relaxed">
              Nuestra IA diseña la mezcla perfecta basándose en tus antojos. Dulce, ácido o una explosión tropical... tú decides.
            </p>
            <Button size="lg" variant="secondary" className="w-full md:w-auto rounded-full bg-white text-primary hover:bg-white/90 px-8 md:px-10 h-14 md:h-20 font-black text-base md:text-lg shadow-2xl uppercase tracking-widest" asChild>
              <Link href="/ai-suggest">¡SORPRÉNDEME AHORA!</Link>
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-full h-full opacity-10 md:opacity-100 md:w-1/2 -z-0">
             <div className="relative w-full h-full">
                <Image 
                  src="https://picsum.photos/seed/ops-ai-splash/800/600" 
                  alt="AI Flavor" 
                  fill 
                  className="object-cover"
                />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
