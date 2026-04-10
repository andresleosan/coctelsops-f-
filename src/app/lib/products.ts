
import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'granizado' | 'cocktail' | 'special';
  availableFlavors: string[];
  availableAddOns: { name: string; price: number }[];
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fresa Salvaje',
    description: 'Granizado de fresa natural con un toque de limón y fruta fresca picada.',
    price: 8500,
    image: PlaceHolderImages.find(img => img.id === 'product-strawberry')?.imageUrl || '',
    category: 'granizado',
    availableFlavors: ['Fresa', 'Mora', 'Limón'],
    availableAddOns: [
      { name: 'Leche Condensada', price: 1000 },
      { name: 'Gomitas', price: 1500 },
      { name: 'Fruta Picada Extra', price: 2000 }
    ]
  },
  {
    id: '2',
    name: 'Mango Biche Special',
    description: 'El clásico sabor colombiano: mango biche con sal, limón y un toque de pimienta.',
    price: 9000,
    image: PlaceHolderImages.find(img => img.id === 'product-mango')?.imageUrl || '',
    category: 'granizado',
    availableFlavors: ['Mango Biche', 'Limón'],
    availableAddOns: [
      { name: 'Sal de Gusano', price: 1500 },
      { name: 'Chile en Polvo', price: 1000 }
    ]
  },
  {
    id: '3',
    name: 'Coco Loco Tropical',
    description: 'Combinación refrescante de coco y piña, ideal para los días de sol.',
    price: 12000,
    image: PlaceHolderImages.find(img => img.id === 'product-coco')?.imageUrl || '',
    category: 'cocktail',
    availableFlavors: ['Coco', 'Piña', 'Maracuyá'],
    availableAddOns: [
      { name: 'Coco Rallado', price: 1000 },
      { name: 'Cereza', price: 500 }
    ]
  },
  {
    id: '4',
    name: 'Explosión de Maracuyá',
    description: 'Sabor intenso a fruta de la pasión con semillas crocantes.',
    price: 9500,
    image: PlaceHolderImages.find(img => img.id === 'product-maracuya')?.imageUrl || '',
    category: 'granizado',
    availableFlavors: ['Maracuyá', 'Hierbabuena'],
    availableAddOns: [
      { name: 'Leche Condensada', price: 1000 },
      { name: 'Miel', price: 1500 }
    ]
  },
  {
    id: '5',
    name: 'Lulo Refrescante',
    description: 'Granizado tradicional de lulo con ese toque ácido que te despierta.',
    price: 8500,
    image: PlaceHolderImages.find(img => img.id === 'product-lulo')?.imageUrl || '',
    category: 'granizado',
    availableFlavors: ['Lulo', 'Limón'],
    availableAddOns: [
      { name: 'Hierbabuena', price: 500 }
    ]
  }
];
