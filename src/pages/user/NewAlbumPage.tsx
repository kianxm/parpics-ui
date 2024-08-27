import { useMutation, useQuery } from "@apollo/client";
import { Suspense, useContext } from "react";
import { useParams } from "react-router-dom";
import { getAlbumPage, getUserById } from "../../queries/queries";
import { templates } from "../../utils/templates";
import { AuthContext } from "../../context/context";
import { TOGGLE_FAVORITE_PHOTO } from "../../mutations/client";
import { Viewer } from "../../types/user";
import { Client } from "../../types/client";
import { Photo } from "../../types/photo";

export default function NewAlbumPage() {
  const { link } = useParams();

  const { user } = useContext(AuthContext);

  const { data: userData } = useQuery(getUserById, {
    variables: { userId: user?.user_id },
    skip: !user,
  });

  const { data, loading, error, refetch } = useQuery(getAlbumPage, {
    variables: { link },
  });

  const [toggleFavoritePhoto] = useMutation(TOGGLE_FAVORITE_PHOTO);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Template handling
  const templateId = data?.getAlbumPage.websiteTemplate;
  const template = templates.find((t) => t.id === templateId);
  if (!template || !template.component) {
    return <div>Template not found</div>;
  }
  const TemplateComponent = template.component;

  // Extract data for the template component
  const currentUser = userData?.getUserById as Viewer;
  const client = data?.getAlbumPage as Client;
  const photos = data?.getAlbumPage.photos || [];
  const mainPhoto = photos[0];
  const photoUrls = photos.map((photo: Photo) => photo.url);

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
    <Suspense fallback={<div>Loading template...</div>}>
      <TemplateComponent
        client={client}
        photos={photos}
        mainPhoto={mainPhoto}
        photoUrls={photoUrls}
        viewer={currentUser}
        handleToggleFavoritePhoto={handleToggleFavoritePhoto}
        refetch={refetch}
      />
    </Suspense>
  );
}
