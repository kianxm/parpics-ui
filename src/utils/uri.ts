import { generatePath, ROUTES } from "../routes";

export function uriDashboard() {
  return generatePath(ROUTES.DASHBOARD.DASHBOARD);
}

export function uriClients() {
  return generatePath(ROUTES.CLIENTS.CLIENTS);
}

export function uriClient(clientId: number | string) {
  return generatePath(ROUTES.CLIENTS.CLIENT, { params: { clientId } });
}

export function uriClientCreate() {
  return generatePath(ROUTES.CLIENTS.CREATE);
}

export function uriAbout() {
  return generatePath(ROUTES.ABOUT);
}

export function uriPricing() {
  return generatePath(ROUTES.PRICING);
}

export function uriAlbum(username: string, link: number | string) {
  return generatePath(ROUTES.USER_ALBUM, { params: { username, link } });
}
