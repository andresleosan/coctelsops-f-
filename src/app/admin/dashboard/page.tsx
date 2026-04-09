
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Clock, TrendingUp, Users, DollarSign } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'GG-8231', customer: 'Andrés López', items: 3, total: 24500, status: 'Pendiente', time: 'hace 5 min' },
  { id: 'GG-8230', customer: 'María Camila', items: 1, total: 8500, status: 'Preparando', time: 'hace 12 min' },
  { id: 'GG-8229', customer: 'Carlos Ruiz', items: 2, total: 18000, status: 'Enviado', time: 'hace 45 min' },
  { id: 'GG-8228', customer: 'Sofía Herrera', items: 4, total: 36500, status: 'Completado', time: 'hace 1 hora' },
];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-headline font-bold">Panel de Control</h1>
          <p className="text-muted-foreground">Bienvenido, aquí está lo que pasa hoy en Granizado Go.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Descargar Reporte</Button>
          <Button>Configuración</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Ventas Hoy', value: '$245,000', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Nuevos Pedidos', value: '12', icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Clientes Nuevos', value: '8', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Crecimiento', value: '+14%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' }
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-secondary/10 px-6 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Pedidos Recientes</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary font-bold">Ver todos</Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">ID Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Tiempo</TableHead>
                <TableHead className="text-right pr-6">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ORDERS.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-bold pl-6">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={
                        order.status === 'Pendiente' ? 'bg-amber-100 text-amber-700' :
                        order.status === 'Preparando' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Enviado' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{order.time}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
