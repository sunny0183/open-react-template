export { default } from "next-auth/middleware"

export const config = { matcher: ["/userpost/:path*", "/client-page/:path*","/server-page/:path*"] } //, "/client-page/:path*","/server-page/:path*"