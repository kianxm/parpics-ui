// src/layouts/PublicLayout.tsx
import React from "react";
import Navigation from "../components/site/navigation";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <Navigation />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default PublicLayout;
