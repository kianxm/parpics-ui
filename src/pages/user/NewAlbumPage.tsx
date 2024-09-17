import { useMutation, useQuery } from "@apollo/client";
import { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAlbumPage, getUserById } from "../../queries/queries";
import { templates } from "../../utils/templates";
import { TOGGLE_FAVORITE_PHOTO } from "../../mutations/client";
import { Client } from "../../types/client";
import { Photo } from "../../types/photo";
import { useCurrentUser } from "../../utils/useCurrentUser";
import Spinner from "../../components/Spinner";
import { ROUTES } from "../../routes";

export default function NewAlbumPage() {
  const user = useCurrentUser();

  const { link } = useParams();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(getAlbumPage, {
    variables: { link },
  });

  const [toggleFavoritePhoto] = useMutation(TOGGLE_FAVORITE_PHOTO);

  if (loading)
    return (
      <div className="w-full h-full justify-center items-center">
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  // Extract data for the template component
  const client: Client = data?.getAlbumPage;
  const photos: Photo[] = data?.getAlbumPage.photos || [];
  const mainPhoto = photos[0];
  const photoUrls: string[] = photos?.map((photo: Photo) => photo.url) || [];

  // Template handling
  const templateId = data?.getAlbumPage.websiteTemplate;
  const template = templates.find((t) => t.id === templateId);
  if (!template || !template.component) {
    navigate(ROUTES.DASHBOARD.DASHBOARD);
  }
  const TemplateComponent = template.component;

  const handleToggleFavoritePhoto = async (
    clientId: string,
    publicId: string
  ) => {
    await toggleFavoritePhoto({
      variables: { clientId, publicId },
      onCompleted: () => refetch(),
    });
  };

  return (
    <Suspense
      fallback={
        <div className="w-full h-full justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <TemplateComponent
        user={user}
        client={client}
        photos={photos}
        mainPhoto={mainPhoto}
        photoUrls={photoUrls}
        handleToggleFavoritePhoto={handleToggleFavoritePhoto}
        refetch={refetch}
      />
    </Suspense>
  );
}
