
"use client";

import { use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Package, MapPin, Clock, Home } from 'lucide-react';

export default function OrderStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <div className="bg-green-100 p-6 rounded-full animate-bounce">
            <CheckCircle2 className="w-20 h-20 text-green-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold text-primary">¡Pedido Recibido!</h1>
          <p className="text-xl text-muted-foreground">Tu orden <span className="font-bold text-foreground">#{id}</span> ya está en camino.</p>
        </div>

        <Card className="border-none shadow-xl overflow-hidden bg-white text-left">
          <CardContent className="p-8">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> Estado del Pedido
            </h3>
            
            <div className="relative space-y-10 before:absolute before:left-3 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-muted">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-4 border-white shadow-sm"></div>
                <div>
                  <h4 className="font-bold text-sm">Pedido Recibido</h4>
                  <p className="text-xs text-muted-foreground">Hemos recibido tu solicitud y estamos asignando un chef.</p>
                  <span className="text-[10px] font-medium text-primary mt-1 inline-block">Hace 2 minutos</span>
                </div>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-muted flex items-center justify-center border-4 border-white shadow-sm"></div>
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground">En Preparación</h4>
                  <p className="text-xs text-muted-foreground">Tus granizados están siendo preparados con fruta fresca.</p>
                </div>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-muted flex items-center justify-center border-4 border-white shadow-sm"></div>
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground">En Camino</h4>
                  <p className="text-xs text-muted-foreground">Un domiciliario está llevando tu refrescancia.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 border-t pt-8">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> Tiempo Estimado
                </div>
                <p className="text-sm font-bold">25 - 35 min</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" /> Entrega en
                </div>
                <p className="text-sm font-bold truncate">Tu dirección guardada</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button variant="outline" className="rounded-full px-8 py-6" asChild>
            <Link href="/">
              <Home className="mr-2 w-4 h-4" /> Volver al Inicio
            </Link>
          </Button>
          <Button className="rounded-full px-8 py-6 shadow-lg shadow-primary/20" asChild>
            <Link href="/menu">Seguir Comprando</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
