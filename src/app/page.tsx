
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, MessageSquare, MapPin } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS } from './lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 3);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-granizado')?.imageUrl || '';
  const logoImage = PlaceHolderImages.find(img => img.id === 'logo-ops')?.imageUrl || '';

  return (
    <div className="flex flex-col gap-20 pb-20 bg-background text-white">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
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
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-10 animate-fade-in">
          <div className="flex justify-center">
            {/* El logo circular con el estilo de la imagen */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary p-2 shadow-[0_0_60px_rgba(233,30,99,0.7)] bg-black overflow-hidden group">
              <Image 
                src={logoImage} 
                alt="COCTELS OPS OFICIAL" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-accent font-bold tracking-[0.4em] uppercase text-sm animate-pulse neon-text-cyan">
              LOS ORIGINALES
            </p>
            <h1 className="text-7xl md:text-9xl font-headline font-bold mb-6 leading-tight tracking-tighter">
              COCTELS <span className="text-primary italic neon-text-magenta">OPS</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/70 max-w-2xl mx-auto font-light tracking-wide">
              ¡¡ QUE CHIMBA UN OPS !! <br />
              La experiencia refrescante más potente de Medellín.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Button size="lg" className="rounded-full text-lg px-12 py-8 bg-primary text-white hover:bg-primary/90 neon-shadow-magenta transition-all" asChild>
              <Link href="/menu">
                VER EL MENÚ <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-lg px-12 py-8 border-accent text-accent hover:bg-accent/10 transition-all" asChild>
              <Link href="https://wa.me/573245545530" target="_blank">
                <MessageSquare className="mr-2 w-5 h-5" /> WHATSAPP
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Info Domicilios Section */}
      <section className="container mx-auto px-4">
        <div className="bg-card/50 border border-primary/30 rounded-[3.5rem] p-10 md:p-16 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-3">
                <h2 className="text-5xl md:text-6xl font-headline font-bold tracking-tighter neon-text-magenta uppercase">DOMICILIOS</h2>
                <div className="h-2 w-32 bg-accent shadow-[0_0_15px_rgba(0,188,212,0.8)]"></div>
              </div>
              
              <div className="space-y-6">
                <Link 
                  href="https://wa.me/573245545530" 
                  target="_blank"
                  className="flex items-center gap-6 p-8 rounded-3xl bg-black/60 border border-primary/20 group hover:border-primary/60 transition-all"
                >
                  <div className="bg-primary/20 p-5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-[0_0_20px_rgba(233,30,99,0.3)]">
                    <MessageSquare className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-accent mb-1 font-bold">Pide por WhatsApp</p>
                    <p className="text-3xl font-bold text-white tracking-widest">324 554 5530</p>
                  </div>
                </Link>

                <div className="flex items-center gap-6 p-8 rounded-3xl bg-black/60 border border-accent/20">
                  <div className="bg-accent/20 p-5 rounded-2xl text-accent shadow-[0_0_20px_rgba(0,188,212,0.3)]">
                    <Truck className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1 font-bold">También en</p>
                    <div className="flex gap-6 items-center flex-wrap">
                      <span className="font-black text-xl text-[#FF4D00]">DiDi Food</span>
                      <span className="text-white/20">|</span>
                      <span className="font-black text-xl text-[#FF441F]">Rappi</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 border-l-4 border-accent bg-accent/5 rounded-r-3xl">
                <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-white font-medium">Carrera 37 # 66 D 36, Villa Hermosa</p>
                  <p className="text-sm text-muted-foreground italic">"Llegamos frío y potente a todo el barrio."</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5">
              <Image 
                src="https://picsum.photos/seed/ops-delivery/800/800" 
                alt="Delivery OPS" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/90 backdrop-blur-xl p-5 rounded-2xl border border-primary/40 flex items-center justify-between">
                  <span className="font-bold text-sm uppercase tracking-widest text-white">SERVICIO ACTIVO</span>
                  <span className="flex items-center gap-3 text-green-400 text-sm font-black">
                    <span className="w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="space-y-2">
            <h2 className="text-5xl font-headline font-bold uppercase tracking-tight">LOS MÁS <span className="text-primary italic neon-text-magenta">TOP</span></h2>
            <p className="text-muted-foreground tracking-widest uppercase text-xs">Mezclas exclusivas de la casa</p>
          </div>
          <Button variant="outline" className="border-primary text-primary rounded-full hover:bg-primary/10 px-8" asChild>
            <Link href="/menu">CATÁLOGO COMPLETO <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
