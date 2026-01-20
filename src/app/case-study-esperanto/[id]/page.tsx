"use client"

import { useParams } from "next/navigation"
import { EsperantoCaseStudy } from "@/components/case-study-esperanto"
import { esperantoCaseStudies } from "@/data/esperanto-case-studies"

export default function EsperantoCaseStudyPage() {
  const params = useParams()
  const caseStudyId = parseInt(params.id as string)
  const caseStudy = esperantoCaseStudies.find(study => study.id === caseStudyId)

  if (!caseStudy) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Case Study Not Found</h1>
          <p className="text-muted-foreground">The case study you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return <EsperantoCaseStudy project={caseStudy} />
}
