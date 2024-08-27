import { JwtPayload } from "jwt-decode";

export interface User extends JwtPayload {
  user_id: string;
  name: string;
  username: string;
  email: string;
  token: string;
}

export interface Viewer {
  user_id: string;
  name: string;
  email: string;
}
