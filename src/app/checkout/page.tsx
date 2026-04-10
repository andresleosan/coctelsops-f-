
'use client';

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
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function CheckoutPage() {
  const { totalPrice, items, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const db = getFirestore();
    const orderData = {
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      notes: formData.notes,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        customization: item.customization
      })),
      total: totalPrice,
      status: 'Pendiente',
      createdAt: serverTimestamp()
    };

    addDoc(collection(db, 'orders'), orderData)
      .then((docRef) => {
        clearCart();
        router.push(`/order-status/${docRef.id}`);
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: 'orders',
          operation: 'create',
          requestResourceData: orderData
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-8 text-center uppercase tracking-tighter">Finalizar Pedido</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-none shadow-md bg-card/60 backdrop-blur-sm border border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary font-bold">
                  <Truck className="w-5 h-5" /> DATOS DE ENTREGA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input 
                    id="name" 
                    required 
                    placeholder="Ej: Juan Pérez" 
                    className="bg-background/50 h-12"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input 
                    id="phone" 
                    required 
                    placeholder="Ej: 324 555 0000" 
                    className="bg-background/50 h-12"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección (Villa Hermosa y alrededores)</Label>
                  <Input 
                    id="address" 
                    required 
                    placeholder="Ej: Carrera 37 # 66-36" 
                    className="bg-background/50 h-12"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Indicaciones (Opcional)</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Ej: Portería, timbre dañado..." 
                    className="bg-background/50"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-card/60 border border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary font-bold">
                  <CreditCard className="w-5 h-5" /> MÉTODO DE PAGO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="cash" className="space-y-3">
                  <div className="flex items-center space-x-2 border border-primary/20 p-4 rounded-xl hover:bg-primary/5 cursor-pointer">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center gap-2 flex-grow cursor-pointer font-bold">
                      <Wallet className="w-5 h-5 text-primary" /> EFECTIVO CONTRA ENTREGA
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-2xl bg-primary text-white sticky top-24 neon-shadow-magenta overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px]"></div>
              <CardHeader>
                <CardTitle className="text-2xl font-headline uppercase tracking-tight">RESUMEN OPS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/20 pb-6">
                  <span className="text-lg">Total a Pagar</span>
                  <span className="font-bold text-4xl">${totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="space-y-4 py-2">
                  <div className="flex items-start gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-white" />
                    <p>Tu pedido será recibido de inmediato por nuestro equipo.</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-white" />
                    <p>Entrega estimada: 25-40 minutos.</p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-white text-primary hover:bg-white/90 font-black py-8 text-xl rounded-full shadow-xl transition-all active:scale-95"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'PROCESANDO...' : 'CONFIRMAR PEDIDO'}
                </Button>
                <p className="text-[10px] text-center text-white/60 uppercase tracking-widest mt-4">Al confirmar, acepto los términos de servicio</p>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
