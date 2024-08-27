import { WebsiteTemplateProps } from "../../types/website";

export default function TemplateTwo({
  client,
  photos,
  mainPhoto,
  photoUrls,
  viewer,
  handleToggleFavoritePhoto,
  refetch,
}: WebsiteTemplateProps) {
  return <div>second template</div>;
}
