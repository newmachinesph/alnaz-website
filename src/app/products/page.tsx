import type { Metadata } from "next";
import { ProductsIndex } from "@/components/products-index";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Five commodity desks: building and construction materials, vehicles and machineries, ferrous and non ferrous metals, electronics, and foodstuffs.",
  alternates: { canonical: "/products" },
};

export default function Page() {
  return <ProductsIndex />;
}
