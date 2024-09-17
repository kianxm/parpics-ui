import { Photo } from "./photo";
import { ClientSettingsType } from "./settings";

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
  settings: ClientSettingsType;
}

export interface DashboardOverview {
  totalClients: number;
  totalPhotos: number;
  totalPaidClients: number;
  storageUsed: number;
  storageRemaining: number;
}
