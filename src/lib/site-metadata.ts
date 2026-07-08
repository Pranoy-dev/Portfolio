import type { Metadata } from "next"

export const siteUrl = "https://www.pranoymathew.com"

export const siteMetadata = {
  name: "Pranoy Mathew",
  title: "Pranoy Mathew — Senior UX/UI Designer",
  description:
    "Senior UX/UI designer in Stockholm. 8 years across automotive, fintech, and biotech — designing complex systems, shipping prototypes, and building clarity into products.",
  ogImage: "/Images/bio/bio-chalkboard.png",
} as const

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s · ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  applicationName: siteMetadata.name,
  authors: [{ name: siteMetadata.name }],
  creator: siteMetadata.name,
  keywords: [
    "Pranoy Mathew",
    "UX designer",
    "UI designer",
    "product design",
    "Stockholm",
    "portfolio",
    "case studies",
    "automotive UX",
    "fintech design",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: siteMetadata.name,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: siteMetadata.ogImage,
        alt: `${siteMetadata.name} — Senior UX/UI Designer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export function pageMetadata(title: string, description: string): Metadata {
  const fullTitle = `${title} · ${siteMetadata.name}`

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: [{ url: siteMetadata.ogImage, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [siteMetadata.ogImage],
    },
  }
}
