import { PRODUCTS } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import { LaptopDetailsClient } from './LaptopDetailsClient';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps) {
    const params = await props.params;
    const product = PRODUCTS.find((p) => p.id === params.id);
    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} | Premium PC Shop`,
        description: product.description || `Buy ${product.name} - ${product.specs?.chipset}, ${product.specs?.vram} VRAM.`,
    };
}

export default async function LaptopDetailsPage(props: PageProps) {
    const params = await props.params;
    const product = PRODUCTS.find((p) => p.id === params.id);

    if (!product) {
        return notFound();
    }

    // Related products (same brand, excluding current)
    const relatedProducts = PRODUCTS.filter(
        (p) => p.brand === product.brand && p.id !== product.id && p.category === 'laptops'
    ).slice(0, 3);

    return <LaptopDetailsClient product={product} relatedProducts={relatedProducts} />;
}
