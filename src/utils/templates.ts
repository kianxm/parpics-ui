import React from "react";

export const templates = [
  {
    id: 0,
    name: "Modern",
    description: "First template",
    component: React.lazy(() => import("../components/templates/TemplateOne")),
  },
  {
    id: 1,
    name: "Sleek",
    description: "Second template",
    component: React.lazy(() => import("../components/templates/TemplateTwo")),
  },
];
