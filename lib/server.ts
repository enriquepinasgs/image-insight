export function getServerURL() {
  if (
    process.env.NEXT_PUBLIC_SERVER_PROTOCOL &&
    process.env.NEXT_PUBLIC_SERVER_DOMAIN
  )
    return `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}`;
}
