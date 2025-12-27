export function buildTitle(pageTitle: string, siteName = "Portfolio"): string {
  return pageTitle ? `${pageTitle} - ${siteName}` : siteName;
}
