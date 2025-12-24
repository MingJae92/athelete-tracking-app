# Cloudathlete – Coach Scheduling Tool

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It allows users to view coaches, filter by availability, create sessions with athletes, and manage scheduling. This project emphasizes accessibility, responsive design, and modular React components.

---

## Key Assumptions / Trade-offs

1. **Static Data for Coaches and Athletes**  
   - Coaches and athletes currently come from an in-memory store for simplicity.  
   - Trade-off: Fast development and testing, but not persistent or scalable.

2. **Session Creation is Synchronous**  
   - Sessions update the UI immediately.  
   - Trade-off: Quick feedback, but lacks backend validation and persistence.

3. **Client-Side Filtering and Responsiveness**  
   - Filtering by coach/date is handled on the client.  
   - Trade-off: Works well for small datasets, but may be slow for large datasets.

4. **Accessibility Enhancements**  
   - Basic ARIA roles, labels, and keyboard navigation applied.  
   - Trade-off: Covers common use cases, but not exhaustively tested on all assistive technologies.

5. **Testing**  
   - Unit and component tests implemented with **React Testing Library / Vitest** for core components (`CoachDetail`, `SessionsPage`, `FeatureCard`).  
   - Trade-off: Covers key functionality, but not all edge cases.

---

## What Could Be Improved with More Time

1. **Backend & Persistence**  
   - Add **Prisma** + database persistence for coaches, athletes, and sessions.  
   - Implement ability to **cancel a session and free the slot**.

2. **Optimistic UI Updates**  
   - Reflect changes immediately in the UI while awaiting API responses.

3. **Enhanced Athlete Selection**  
   - Add **search within multi-select** for choosing athletes efficiently.

4. **Conflict Detection & Validation**  
   - Detect **time conflicts** for coaches/athletes when creating or editing sessions.

5. **Scalability & UX Enhancements**  
   - Server-side filtering/pagination, calendar-based slot selection, mobile-friendly layouts, and visual feedback animations.

6. **Expanded Testing**  
   - Add integration and end-to-end tests for workflows like creating/cancelling sessions, filtering coaches, and modal interactions.

---

## Getting Started

Git clone project---> npm i ---> npm run dev, then the application will load to http://localhost:3000/

First, run the development server:


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
