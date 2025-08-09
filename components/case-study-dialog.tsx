"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/profile"

type Props = {
  project: Project | null
  open: boolean
  onOpenChange: (v: boolean) => void
}

export default function CaseStudyDialog({ project, open, onOpenChange }: Props) {
  if (!project) return null
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 p-0">
        <article className="overflow-y-auto">
          <header className="border-b border-foreground/10 p-5">
            <DialogHeader>
              <DialogTitle className="text-xl">{project.title}</DialogTitle>
              <DialogDescription className="text-foreground/60">
                {project.year}
                {project.role ? " · " + project.role : ""}
              </DialogDescription>
            </DialogHeader>
            {project.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <Badge key={t} variant="outline" className="border-foreground/15 text-foreground/60">
                    {t}
                  </Badge>
                ))}
              </div>
            ) : null}
          </header>

          {project.image ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              <img
                src={project.image || "/placeholder.svg"}
                alt={`${project.title} cover`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}

          <div className="space-y-5 p-5">
            <p className="text-sm text-foreground/80">{project.description}</p>

            {project.highlights?.length ? (
              <section>
                <h4 className="text-sm font-medium">Highlights</h4>
                <ul className="mt-2 grid list-disc gap-1 pl-5 text-sm text-foreground/70">
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {(project.problem || project.solution || project.outcome) && (
              <div className="grid gap-4 sm:grid-cols-3">
                {project.problem ? (
                  <div className="rounded-lg border border-foreground/10 p-3">
                    <div className="text-xs uppercase tracking-wide text-foreground/50">Problem</div>
                    <p className="mt-1 text-sm text-foreground/80">{project.problem}</p>
                  </div>
                ) : null}
                {project.solution ? (
                  <div className="rounded-lg border border-foreground/10 p-3">
                    <div className="text-xs uppercase tracking-wide text-foreground/50">Solution</div>
                    <p className="mt-1 text-sm text-foreground/80">{project.solution}</p>
                  </div>
                ) : null}
                {project.outcome ? (
                  <div className="rounded-lg border border-foreground/10 p-3">
                    <div className="text-xs uppercase tracking-wide text-foreground/50">Outcome</div>
                    <p className="mt-1 text-sm text-foreground/80">{project.outcome}</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </article>
      </DialogContent>
    </Dialog>
  )
}
