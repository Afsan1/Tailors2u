import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk v7: run middleware passively — no auth.protect() here.
// Auth is enforced per-page/layout for protected routes.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and media files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|mp3|mov|webm|ogg|wav|avi|mkv)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk frontend API routes
    "/__clerk/:path*",
  ],
};
