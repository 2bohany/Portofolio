/**
 * General technical approach — each principle is grounded in work described
 * in the CV and in data/projects.ts.
 */
export interface ApproachPrinciple {
  title: string;
  description: string;
}

export const approachPrinciples: ApproachPrinciple[] = [
  {
    title: "Layered, Typed Backends",
    description:
      "APIs are built in NestJS or Express with clear layers (Controller, Service, Repository) and typed data access through Prisma or Mongoose, as in the Attendance Desktop App and the Online Examination System.",
  },
  {
    title: "Secure by Default",
    description:
      "JWT and Passport authentication, bcrypt password hashing, role-based access control and DTO validation on the server, plus route guards on the client. In Electron, context isolation, sandboxing and a controlled preload IPC bridge.",
  },
  {
    title: "Reusable, Component-Driven UI",
    description:
      "Interfaces are assembled from reusable components with React or Angular standalone components, with state handled by TanStack Query, Zustand or RxJS depending on the stack.",
  },
  {
    title: "Responsive and RTL-Ready",
    description:
      "Every interface is built to work across breakpoints and in Arabic right-to-left layouts, as in RakebnyMaak and the Online Examination System.",
  },
  {
    title: "Quality and Delivery",
    description:
      "Code is kept consistent with ESLint, Prettier and automated tests (Jest, Vitest), managed through Git/GitHub reviews, and shipped to production on Vercel or as a Windows installer.",
  },
];
