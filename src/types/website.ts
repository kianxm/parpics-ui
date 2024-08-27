import { Client } from "./client";
import { Photo } from "./photo";
import { User, Viewer } from "./user";

export interface WebsiteTemplateProps {
  user: User;
  client: Client;
  photos: Photo[];
  mainPhoto: Photo;
  photoUrls: string[];
  handleToggleFavoritePhoto: (clientId: string, publicId: string) => void;
  refetch: () => void;
}
