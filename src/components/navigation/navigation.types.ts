import type { FileRouteTypes } from "@/routeTree.gen";

export type NavigationItem = {
  to: FileRouteTypes["to"];
  label: string;
};
