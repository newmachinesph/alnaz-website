// Nav is one array. About and Contact are still homepage sections; point them at
// standalone routes here the day those pages exist and nothing else changes.
export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/#contact" },
] as const;

export const STATS = [
  { value: 2004, suffix: "", label: "Trading since" },
  { value: 125, suffix: "+", label: "Specialists" },
  { value: 5, suffix: "", label: "Commodity desks" },
  { value: 6, suffix: "", label: "Market offices" },
] as const;

export const CERTIFICATIONS = ["ISO 22000", "HACCP", "Halal", "BRC", "FDA"] as const;

export const MARKETS = [
  "Turkey",
  "Taiwan",
  "Thailand",
  "Malaysia",
  "Philippines",
  "United Arab Emirates",
] as const;

export const TICKER = [
  "Bulk Agricultural Commodities",
  "Private Label Manufacturing",
  "Unbranded Bulk Goods",
  "Construction Materials",
  "FMCG Distribution",
  "Global Sourcing",
] as const;

export const CONTACT = {
  company: "Alnaz (Shanghai) International Trading Co. Ltd.",
  address: "No. 550 Xujiahui Road, Huangpu District, Shanghai, China",
  tel: "+86 13929727208",
  telHref: "+8613929727208",
  email: "info@alnazintl.com",
} as const;
