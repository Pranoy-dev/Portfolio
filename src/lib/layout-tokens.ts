/** Shared responsive layout tokens for portfolio pages. */
export const headerNavClearance =
  "pt-[calc(4.5rem+env(safe-area-inset-top,0px))]"

/** @deprecated Use headerNavClearance */
export const mobileNavClearance = headerNavClearance

export const pageXPadding = "px-3 sm:px-4 md:px-5 lg:px-6"

export const pageXPaddingNeg = "-mx-3 sm:-mx-4 md:-mx-5 lg:-mx-6"

export const safeAreaX =
  "pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))]"

export const pageContent = `mx-auto w-full max-w-[1280px] ${pageXPadding}`

/** Vertical rhythm — matches home hero section spacing. */
export const pageSectionY = "py-8 sm:py-10 md:py-12"

/** Standard inner page shell — same width, padding, and spacing as home. */
export const pageSectionShell = `${pageContent} flex w-full min-w-0 flex-col gap-12 ${pageSectionY}`
