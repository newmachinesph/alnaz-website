import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/category-page";
import { CATEGORIES, getCategory } from "@/lib/catalog";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const lines = category.groups.map((g) => g.name).join(", ");

  return {
    title: category.title,
    description: `${category.title} sourced and shipped by ALNAZ International: ${lines}.`,
    alternates: { canonical: `/products/${category.slug}` },
    openGraph: {
      title: `${category.title} — ALNAZ International`,
      description: `${category.title} sourced and shipped by ALNAZ International: ${lines}.`,
      images: category.hero ? [category.hero] : undefined,
    },
  };
}

export default async function Page({ params }: Params) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const index = CATEGORIES.findIndex((c) => c.slug === category.slug);
  const next = CATEGORIES[(index + 1) % CATEGORIES.length];

  return <CategoryPage category={category} next={next} />;
}
