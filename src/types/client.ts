import { Photo } from "./photo";
import { ClientSettings } from "./settings";

export interface Client {
  id: string;
  userId: string;
  name: string;
  link: string;
  accessCode: number;
  location: string;
  date: string;
  hasPaid: boolean;
  photoCount: number | null;
  createdAt: string;
  updatedAt: string;
  photos: [Photo];
  websiteTemplate: number;
  settings: ClientSettings;
}

export interface DashboardOverview {
  totalClients: number;
  totalPhotos: number;
  totalPaidClients: number;
}
