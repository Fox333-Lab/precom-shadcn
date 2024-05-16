export { default } from "next-auth/middleware";
//"/admin/:path*" is a wildcard route that matches any route that starts with /admin followed by anything else.
export const config = {
  matcher: ["/checkout", "/order/:path*", "/user/:path*", "/admin/:path*"],
};
