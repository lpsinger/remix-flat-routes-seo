import { generateSitemap } from "@nasa-gcn/remix-seo";
import type { LoaderFunctionArgs, ServerBuild } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  //@ts-ignore - This may fail during docker build typecheck if the app isn't build yet
  let build = (await import("../../build/index.js")) as ServerBuild;

  return generateSitemap(request, build.routes, {
    siteUrl: "https://balavishnuvj.com",
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}`,
    },
  });
}
