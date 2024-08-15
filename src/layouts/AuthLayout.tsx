import React from "react";
import { NewSidebar } from "../components/dashboard/Sidebar";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <NewSidebar children={children} />;
};

export default AuthLayout;
