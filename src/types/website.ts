import { Client } from "./client";
import { Photo } from "./photo";
import { Viewer } from "./user";

export interface WebsiteTemplateProps {
  client: Client;
  photos: Photo[];
  mainPhoto: Photo;
  photoUrls: string[];
  viewer: Viewer | null;
  handleToggleFavoritePhoto: (clientId: string, publicId: string) => void;
  refetch: () => void;
}
