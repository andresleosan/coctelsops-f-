
"use client";

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Product } from '@/app/lib/products';
import { useState } from 'react';
import ProductCustomizer from './ProductCustomizer';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white">
        <CardHeader className="p-0 relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint="refreshing granizado"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-primary font-bold">
              ${product.price.toLocaleString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-headline font-bold text-lg mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full gap-2 rounded-full group-hover:translate-y-[-2px] transition-transform" 
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Personalizar
          </Button>
        </CardFooter>
      </Card>

      <ProductCustomizer 
        product={product} 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
}
