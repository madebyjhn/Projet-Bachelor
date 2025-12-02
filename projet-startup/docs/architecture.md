## Why Monolithic Architecture

The project follows a **monolithic architecture** because:

1. **Simplicity**: With a small team and a limited scope, a monolithic structure allows for faster development and easier management of components, pages, and shared logic.

2. **Rapid Iteration**: Changes to UI, data, or services can be implemented quickly without having to manage multiple microservices or deployments.

3. **Cohesion**: All code, components, and assets are in a single codebase, which makes it easier to maintain consistency in styling, state management, and integrations (e.g., React Calendly, Formspree).

4. **Deployment Ease**: A monolithic Next.js app can be deployed easily to Vercel or any hosting platform without the overhead of orchestrating multiple services.

5. **Scalability Not Critical Yet**: The project is small and intended as a portfolio / small client project. The complexity of microservices is unnecessary at this stage.

Overall, a monolithic architecture is **more pragmatic** for this project while still allowing modularity through components and folders.

## Structure

```txt
src
└── app
    ├── api
    │   └── route.tsx
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
```
