
'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Clock, TrendingUp, Users, DollarSign, Package } from 'lucide-react';
import { useMemoFirebase } from '@/firebase/firestore/use-memo-firebase';

export default function AdminDashboard() {
  const db = useFirestore();

  const ordersQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(50));
  }, [db]);

  const { data: orders, loading } = useCollection(ordersQuery);

  const stats = useMemoFirebase(() => {
    if (!orders) return { totalSales: 0, pending: 0, newClients: 0 };
    const today = new Date().toDateString();
    
    return {
      totalSales: orders.reduce((acc, curr) => acc + (curr.total || 0), 0),
      pending: orders.filter(o => o.status === 'Pendiente').length,
      newClients: new Set(orders.map(o => o.phone)).size
    };
  }, [orders]);

  const updateStatus = (id: string, newStatus: string) => {
    if (!db) return;
    updateDoc(doc(db, 'orders', id), { status: newStatus });
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-headline font-bold text-primary italic neon-text-magenta uppercase">PANEL DE CONTROL</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs mt-1">Gestión real de Coctels OPS</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none border-primary text-primary hover:bg-primary/10">Hoy</Button>
          <Button className="flex-1 md:flex-none bg-primary text-white shadow-lg shadow-primary/20">Refrescar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Ventas Totales', value: `$${stats.totalSales.toLocaleString()}`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Pedidos Pendientes', value: stats.pending.toString(), icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Clientes Únicos', value: stats.newClients.toString(), icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Pedidos Hoy', value: orders?.length.toString() || '0', icon: Package, color: 'text-purple-400', bg: 'bg-purple-400/10' }
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-xl bg-card/60 backdrop-blur-sm border border-white/5">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-inner`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-card/40 border border-primary/20">
        <CardHeader className="bg-secondary/20 px-8 py-6 flex flex-row items-center justify-between border-b border-primary/10">
          <CardTitle className="text-xl font-headline uppercase tracking-tighter">Pedidos Recientes</CardTitle>
          <Badge variant="outline" className="border-primary text-primary font-bold">REAL TIME</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/10">
                <TableRow className="border-primary/10">
                  <TableHead className="pl-8 text-xs font-black uppercase tracking-widest">Cliente</TableHead>
                  <TableHead className="text-xs font-black uppercase tracking-widest">Productos</TableHead>
                  <TableHead className="text-xs font-black uppercase tracking-widest">Total</TableHead>
                  <TableHead className="text-xs font-black uppercase tracking-widest">Estado</TableHead>
                  <TableHead className="text-right pr-8 text-xs font-black uppercase tracking-widest">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic">
                      Cargando pedidos en tiempo real...
                    </TableCell>
                  </TableRow>
                ) : orders?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic">
                      No hay pedidos registrados aún.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders?.map((order) => (
                    <TableRow key={order.id} className="border-primary/5 hover:bg-white/5 transition-colors">
                      <TableCell className="pl-8 py-6">
                        <p className="font-bold text-white">{order.customerName}</p>
                        <p className="text-[10px] text-muted-foreground">{order.phone}</p>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate text-xs">
                          {order.items.map((it: any) => `${it.quantity}x ${it.name}`).join(', ')}
                        </div>
                        <p className="text-[9px] text-primary/60 mt-1 uppercase font-bold">{order.address}</p>
                      </TableCell>
                      <TableCell className="font-bold text-white">${order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            order.status === 'Pendiente' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                            order.status === 'Preparando' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                            'bg-green-500/10 text-green-500 border-green-500/20'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs font-bold hover:bg-primary/10 hover:text-primary"
                            onClick={() => updateStatus(order.id, 'Preparando')}
                          >
                            Preparar
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
