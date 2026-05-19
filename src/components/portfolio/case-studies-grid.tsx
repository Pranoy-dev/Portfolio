"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { caseStudies } from "@/data/portfolio-home"

export function CaseStudiesGrid() {
  const router = useRouter()

  const navigateToCaseStudy = (id: number) => {
    const targetElement = document.querySelector("main") as HTMLElement | null
    if (targetElement) {
      targetElement.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out"
      targetElement.style.opacity = "0"
      targetElement.style.transform = "translateY(8px)"
    }
    window.setTimeout(() => {
      router.push(`/case-study/${id}`)
    }, 300)
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-muted/30 to-background border border-border/40 p-8 md:p-10 backdrop-blur-xl shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
      <div className="relative z-10">
        <div className="grid gap-5 md:grid-cols-3">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              role="button"
              tabIndex={0}
              onClick={() => navigateToCaseStudy(study.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  navigateToCaseStudy(study.id)
                }
              }}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${study.gradient} border ${study.borderColor} hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 hover:-translate-y-1 flex flex-col cursor-pointer`}
            >
              <div className={`relative h-48 bg-gradient-to-br ${study.imageGradient} overflow-hidden`}>
                <Image
                  src={study.image}
                  alt={study.problem}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              <div className="p-6 space-y-5 relative z-10 flex-1 flex flex-col">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Problem</p>
                  <p className="text-base font-semibold leading-snug text-foreground">{study.problem}</p>
                </div>
                <div className="pt-2 border-t border-border/20">
                  <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Role</p>
                  <p className="text-sm text-foreground/80">{study.role}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-3 mt-auto">
                  {study.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs font-medium rounded-full px-3 py-1 bg-background/60 backdrop-blur-sm border-border/40">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${study.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
