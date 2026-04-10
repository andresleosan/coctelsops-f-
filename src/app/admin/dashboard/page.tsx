'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, DollarSign, Package, RefreshCw, Eye, CheckCircle2 } from 'lucide-react';
import { useMemoFirebase } from '@/firebase/firestore/use-memo-firebase';
import { errorEmitter, FirestorePermissionError } from '@/firebase';

export default function AdminDashboard() {
  const db = useFirestore();

  const ordersQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(50));
  }, [db]);

  const { data: orders, loading } = useCollection(ordersQuery);

  const stats = {
    totalSales: orders?.reduce((acc, curr: any) => acc + (curr.total || 0), 0) || 0,
    pending: orders?.filter((o: any) => o.status === 'Pendiente').length || 0,
    newClients: new Set(orders?.map((o: any) => o.phone)).size || 0,
    totalOrders: orders?.length || 0
  };

  const updateStatus = (id: string, newStatus: string) => {
    if (!db) return;
    const orderRef = doc(db, 'orders', id);
    updateDoc(orderRef, { status: newStatus })
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: orderRef.path,
          operation: 'update',
          requestResourceData: { status: newStatus }
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary italic neon-text-magenta uppercase tracking-tighter">PANEL OPS</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-[10px] mt-1">Gestión real de pedidos</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button size="sm" className="flex-1 md:flex-none bg-primary text-white rounded-full font-bold text-xs h-10 px-6" onClick={() => window.location.reload()}>
            <RefreshCw className="w-3.5 h-3.5 mr-2" /> ACTUALIZAR
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
        {[
          { label: 'Ventas', value: `$${stats.totalSales.toLocaleString()}`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Pendientes', value: stats.pending.toString(), icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Clientes', value: stats.newClients.toString(), icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Total Hoy', value: stats.totalOrders.toString(), icon: Package, color: 'text-purple-400', bg: 'bg-purple-400/10' }
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-xl bg-card/60 backdrop-blur-sm border border-white/5">
            <CardContent className="p-3 md:p-6 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4">
              <div className={`p-2 md:p-4 rounded-xl md:rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-0.5 md:mb-1">{stat.label}</p>
                <h3 className="text-sm md:text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-headline font-bold uppercase tracking-tight text-white/90">PEDIDOS RECIENTES</h2>
          <Badge variant="outline" className="border-primary text-primary font-bold text-[9px] animate-pulse">VIVO</Badge>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground italic text-sm">
            Conectando con la base de datos...
          </div>
        ) : orders?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground italic text-sm">
            No hay pedidos registrados hoy.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders?.map((order: any) => (
              <Card key={order.id} className="border-none bg-card/40 border border-white/5 shadow-lg hover:border-primary/20 transition-all">
                <CardContent className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-base">{order.customerName}</h4>
                      <p className="text-xs text-primary font-bold tracking-wider">{order.phone}</p>
                    </div>
                    <Badge 
                      className={`text-[9px] px-2 py-0.5 ${
                        order.status === 'Pendiente' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                        order.status === 'Preparando' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        'bg-green-500/10 text-green-500 border-green-500/20'
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 py-3 border-y border-white/5">
                    {order.items?.map((it: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-xs text-white/80">
                        <span>{it.quantity}x {it.name}</span>
                        <span className="font-bold">${it.price?.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="pt-2 flex justify-between items-end border-t border-white/5">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total</span>
                      <span className="text-lg font-bold text-primary">${order.total?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Dirección de Entrega</p>
                    <p className="text-xs text-white/90">{order.address}</p>
                    {order.notes && <p className="text-[10px] italic text-muted-foreground mt-1">Nota: {order.notes}</p>}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {order.status === 'Pendiente' && (
                      <Button 
                        className="flex-1 bg-primary text-white h-9 text-[10px] font-black tracking-widest rounded-full"
                        onClick={() => updateStatus(order.id, 'Preparando')}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> PREPARAR
                      </Button>
                    )}
                    {order.status === 'Preparando' && (
                      <Button 
                        className="flex-1 bg-green-500 text-white h-9 text-[10px] font-black tracking-widest rounded-full"
                        onClick={() => updateStatus(order.id, 'En Camino')}
                      >
                        <Package className="w-3.5 h-3.5 mr-2" /> ENVIAR
                      </Button>
                    )}
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-white/10">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
