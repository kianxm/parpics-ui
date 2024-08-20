import { Photo } from "./photo";

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
  photo: Photo;
}

export interface DashboardOverview {
  totalClients: number;
  totalPhotos: number;
  totalPaidClients: number;
}
