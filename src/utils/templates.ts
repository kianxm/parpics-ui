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
  {
    id: 2,
    name: "Casual",
    description: "Third template",
  },
  {
    id: 3,
    name: "Formal",
    description: "Fourth template",
  },
  {
    id: 4,
    name: "Classic",
    description: "Fifth template",
  },
];
