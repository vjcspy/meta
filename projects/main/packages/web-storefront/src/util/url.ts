export function getGraphQlUrl() {
  return `${process.env.NEXT_PUBLIC_PROXY_DEFAULT_URL}/proxy/${process.env.NEXT_PUBLIC_PROXY_APP_NAME}/graphql`;
}
