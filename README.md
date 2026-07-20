This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## AI Tool Specification: `scoreProject`

* **Name:** `scoreProject`
* **Description:** Audits the current frontend workspace metrics and returns performance/accessibility scores.
* **Zod Schema Contract:**
  ```typescript
  z.object({
    projectName: z.string().describe('Target project workspace name'),
    performanceScore: z.number().min(0).max(100),
    accessibilityScore: z.number().min(0).max(100),
    status: z.enum(['excellent', 'needs_work', 'critical']),
    recommendation: z.string().describe('Actionable optimization suggestion'),
  })


  ## Motion & State Transitions: Action Button

### State Choreography
The button manages 5 explicit operational states:
1. **Idle:** Baseline interactive ready state.
2. **Hover / Focus:** Elevation via `-translate-y-0.5` and a visible `focus-visible:ring-4` outline for high accessibility.
3. **Loading:** Micro-spinner display with disabled pointer-events to prevent spam clicking.
4. **Success:** Smooth transition into an emerald confirmation checkmark before returning to idle.
5. **Error:** Color shift to rose with a single subtle horizontal shake animation.

### Motion Decisions
* **Easing:** Utilized custom `cubic-bezier(0.16, 1, 0.3, 1)` easing curve for an immediate tactile response without harsh snapping.
* **Duration:** 300ms for state transitions to balance responsiveness with clear visual feedback.
* **Compositor Efficiency:** Animated properties are strictly limited to `opacity` and `transform` to ensure zero layout recalculation.
* **Reduced Motion Support:** Motion animations like shaking are disabled under `@media (prefers-reduced-motion: reduce)` while preserving distinct state color changes.