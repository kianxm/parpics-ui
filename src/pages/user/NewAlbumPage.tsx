import { useMutation, useQuery } from "@apollo/client";
import { Suspense, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbumPage, getUserById } from "../../queries/queries";
import { templates } from "../../utils/templates";
import { Viewer } from "../../types/user";
import { Client } from "../../types/client";
import { AuthContext } from "../../context/context";
import { Photo } from "../../types/photo";
import { TOGGLE_FAVORITE_PHOTO } from "../../mutations/client";

export default function NewAlbumPage() {
  const { link } = useParams();

  const { user } = useContext(AuthContext);

  const { data: userData } = useQuery(getUserById, {
    variables: { userId: user?.user_id },
    skip: !user,
  });

  const { loading, error, data, refetch } = useQuery(getAlbumPage, {
    variables: { link },
  });
  const [toggleFavoritePhoto] = useMutation(TOGGLE_FAVORITE_PHOTO);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const templateId = data?.getAlbumPage.websiteTemplate;
  const template = templates.find((t) => t.id === templateId);

  if (!template || !template.component) {
    return <div>Template not found</div>;
  }

  const TemplateComponent = template.component;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const currentUser = userData?.getUserById as Viewer;
  const client = data?.getAlbumPage as Client;
  const photos = data?.getAlbumPage.photos;
  const mainPhoto = data?.getAlbumPage.photos[0];

  if (!photos) return <p>No photos found</p>;

  const photoUrls = photos.map((photo: Photo) => photo.url);

  const handleToggleFavoritePhoto = async (
    clientId: string,
    publicId: string
  ) => {
    try {
      await toggleFavoritePhoto({
        variables: { clientId, publicId },
        onCompleted: () => refetch(),
      });
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
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
