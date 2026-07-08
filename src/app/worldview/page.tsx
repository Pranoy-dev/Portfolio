import { WorldviewPageContent } from "@/components/portfolio/worldview-page-content"
import { pageMetadata } from "@/lib/site-metadata"

export const metadata = pageMetadata(
  "World view",
  "How I see work, life, and achievement — perspectives on design, teams, AI, and the future.",
)

export default function WorldviewPage() {
  return <WorldviewPageContent />
}
