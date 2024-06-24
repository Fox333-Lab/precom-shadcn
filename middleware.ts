export { default } from "next-auth/middleware";
// import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
// import { redirect } from "next/navigation";
// import { NextResponse } from "next/server";

//"/admin/:path*" is a wildcard route that matches any route that starts with /admin followed by anything else.

// export default withAuth(
//   function middleware(request: NextRequestWithAuth) {
//     console.log("request.nextUrl : ", request.nextUrl);
//     if (request.nextUrl.pathname.startsWith("/signin")) {
//       return NextResponse.redirect("/products");
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   },
// );

export const config = {
  matcher: ["/checkout", "/order/:path*", "/user/:path*"],
};
