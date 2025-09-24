import NextAuth from "next-auth";
import { authRoutes, publicRoutes, providerApiPrefix } from "./routes";
import authConfig from "./auth.config";

const { auth } = NextAuth({ ...authConfig });
export default auth(async (req) => {
  const { nextUrl } = req;
  const session = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isProvider = nextUrl.pathname.startsWith(providerApiPrefix);

  if (session && isAuthRoute && !isProvider) {
    return Response.redirect(new URL("/", nextUrl));
  }

  if (!session && !isPublicRoute && !isProvider && !isAuthRoute) {
    const callbackUrl = nextUrl.pathname;

    const encodeCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/login?redirect=${encodeCallbackUrl}`, nextUrl)
    );
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
