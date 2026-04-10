'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Clock, Users, DollarSign, Package, RefreshCw } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-8 md:py-12 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary italic neon-text-magenta uppercase">PANEL OPS</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px] mt-1">Gestión real de pedidos</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" size="sm" className="flex-1 md:flex-none border-primary text-primary hover:bg-primary/10 rounded-full">
            Hoy
          </Button>
          <Button size="sm" className="flex-1 md:flex-none bg-primary text-white rounded-full">
            <RefreshCw className="w-4 h-4 mr-2" /> Actualizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        {[
          { label: 'Ventas', value: `$${stats.totalSales.toLocaleString()}`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Pendientes', value: stats.pending.toString(), icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Clientes', value: stats.newClients.toString(), icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Total Hoy', value: stats.totalOrders.toString(), icon: Package, color: 'text-purple-400', bg: 'bg-purple-400/10' }
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-xl bg-card/60 backdrop-blur-sm border border-white/5">
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4">
              <div className={`p-3 md:p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-card/40 border border-primary/20">
        <CardHeader className="bg-secondary/20 px-4 md:px-8 py-4 md:py-6 flex flex-row items-center justify-between border-b border-primary/10">
          <CardTitle className="text-lg md:text-xl font-headline uppercase tracking-tighter">Pedidos Recientes</CardTitle>
          <Badge variant="outline" className="border-primary text-primary font-bold text-[10px]">VIVO</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/10">
                <TableRow className="border-primary/10">
                  <TableHead className="pl-4 md:pl-8 text-[10px] font-black uppercase tracking-widest">Cliente</TableHead>
                  <TableHead className="hidden md:table-cell text-[10px] font-black uppercase tracking-widest">Pedido</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Total</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
                  <TableHead className="text-right pr-4 md:pr-8 text-[10px] font-black uppercase tracking-widest">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic text-sm">
                      Conectando con la base de datos...
                    </TableCell>
                  </TableRow>
                ) : orders?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic text-sm">
                      No hay pedidos registrados hoy.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders?.map((order: any) => (
                    <TableRow key={order.id} className="border-primary/5 hover:bg-white/5 transition-colors">
                      <TableCell className="pl-4 md:pl-8 py-4 md:py-6">
                        <p className="font-bold text-white text-sm">{order.customerName}</p>
                        <p className="text-[10px] text-muted-foreground">{order.phone}</p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="max-w-xs truncate text-xs">
                          {order.items?.map((it: any) => `${it.quantity}x ${it.name}`).join(', ')}
                        </div>
                        <p className="text-[9px] text-primary/60 mt-1 uppercase font-bold">{order.address}</p>
                      </TableCell>
                      <TableCell className="font-bold text-white text-sm">${order.total?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`text-[9px] px-2 py-0 ${
                            order.status === 'Pendiente' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                            order.status === 'Preparando' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                            'bg-green-500/10 text-green-500 border-green-500/20'
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-4 md:pr-8">
                        <div className="flex justify-end gap-2">
                          {order.status === 'Pendiente' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-[10px] font-bold hover:bg-primary/10 hover:text-primary"
                              onClick={() => updateStatus(order.id, 'Preparando')}
                            >
                              LISTO
                            </Button>
                          )}
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
