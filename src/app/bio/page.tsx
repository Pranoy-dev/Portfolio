import { BioPageContent } from "@/components/portfolio/bio-page-content"
import { pageMetadata } from "@/lib/site-metadata"

export const metadata = pageMetadata(
  "Bio",
  "Senior UX/UI designer in Stockholm — 8 years across automotive, fintech, biotech, and gaming.",
)

export default function BioPage() {
  return <BioPageContent />
}
