
"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';
import { CheckCircle2, CreditCard, Wallet, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formattedPrice, setFormattedPrice] = useState<string | null>(null);

  useEffect(() => {
    setFormattedPrice(totalPrice.toLocaleString());
  }, [totalPrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const orderId = Math.random().toString(36).substring(7).toUpperCase();
      clearCart();
      router.push(`/order-status/${orderId}`);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-headline font-bold mb-8 text-center">Finalizar Pedido</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-none shadow-md bg-card/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Truck className="w-5 h-5" /> Datos de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" required placeholder="Ej: Juan Pérez" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" required placeholder="Ej: 300 123 4567" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección de Entrega</Label>
                  <Input id="address" required placeholder="Ej: Calle 10 #20-30, Apto 402" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas para el domiciliario</Label>
                  <Textarea id="notes" placeholder="Ej: Portería, timbre dañado..." className="bg-background/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-card/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CreditCard className="w-5 h-5" /> Método de Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="cash" className="space-y-3">
                  <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-secondary/10 cursor-pointer">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center gap-2 flex-grow cursor-pointer font-medium">
                      <Wallet className="w-4 h-4 text-primary" /> Efectivo contra entrega
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg bg-primary text-white sticky top-24 neon-shadow-magenta">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Resumen de Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between text-lg border-b border-white/20 pb-4">
                  <span>Total a Pagar</span>
                  <span className="font-bold text-3xl">${formattedPrice || '...'}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <p>Entrega estimada en 25-40 minutos.</p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-white text-primary hover:bg-white/90 font-bold py-8 text-xl rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
