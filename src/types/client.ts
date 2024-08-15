export interface Client {
  name: string;
  link: string;
  accessCode: number;
  location: string;
  date: string;
  hasPaid: boolean;
  photoCount: number | null;
}
