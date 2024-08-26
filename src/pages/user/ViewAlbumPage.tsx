import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Photo } from "../../types/photo";
import { Button } from "../../components/ui/button";
import { Download, Heart, LogOut, MessageSquareIcon } from "lucide-react";
import { getAlbumPage, getUserById } from "../../queries/queries";
import { Client } from "../../types/client";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Watermark } from "@hirohe/react-watermark";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/context";
import { Viewer } from "../../types/user";
import ViewerSignUpDialog from "../../components/viewer/ViewerSignUpDialog";
import { TOGGLE_FAVORITE_PHOTO } from "../../mutations/client";
import { IconCreditCardPay, IconHeartFilled } from "@tabler/icons-react";
import { ImageModal } from "../../components/viewer/ImageModal";
import { Comment } from "../../types/comment";

const AlbumHeader = ({
  client,
  photoUrls,
  viewer,
  clientId,
  logout,
}: {
  client: Client;
  photoUrls: string[];
  viewer: Viewer | null;
  clientId: string;
  logout: () => void;
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-5 text-gray-800 z-10 bg-white shadow-sm">
      <h1 className="text-2xl font-semibold">{client.name}</h1>
      <div className="flex gap-2">
        {client.hasPaid && (
          <Button
            className="px-3 py-1 bg-transparent rounded"
            variant="custom"
            onClick={() => alert("Upgrade to premium")}
          >
            <IconCreditCardPay size={16} />
          </Button>
        )}
        <Button className="px-3 py-1 bg-transparent rounded" variant="custom">
          <MessageSquareIcon size={16} />
        </Button>
        <Button
          className="px-3 py-1 bg-transparent text-gray-800 rounded"
          variant="custom"
          onClick={() => downloadAllImages(photoUrls)}
          disabled={!client.hasPaid}
        >
          <Download size={16} />
        </Button>
        {viewer && (
          <Button
            className="px-3 py-1 bg-transparent rounded"
            variant="custom"
            onClick={logout}
          >
            <LogOut size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

const GridItem = ({
  photo,
  showWatermark,
  viewer,
  openSignInDialog,
  clientId,
  handleToggleFavoritePhoto,
  index,
  openModal,
}: {
  photo: Photo;
  showWatermark: boolean;
  viewer: Viewer | null;
  openSignInDialog: () => void;
  clientId: string;
  handleToggleFavoritePhoto: (clientId: string, publicId: string) => void;
  index: number;
  openModal: (index: number) => void;
}) => {
  const Content = () => (
    <div
      className="relative mb-4 break-inside-avoid"
      onClick={() => {
        openModal(index);
      }}
    >
      <img
        src={photo.url}
        className="w-full object-cover rounded-lg"
        alt={photo.name}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg cursor-pointer">
        <div className="flex space-x-2">
          <Button
            className="px-3 py-1 bg-transparent text-white rounded"
            variant="custom"
            onClick={(e) => {
              e.stopPropagation();
              if (!viewer) {
                openSignInDialog();
              } else {
                handleToggleFavoritePhoto(clientId, photo.publicId);
              }
            }}
          >
            {!photo.isFavorite ? (
              <Heart size={24} />
            ) : (
              <IconHeartFilled size={24} className="text-red-500" />
            )}
          </Button>
          <Button
            className="px-3 py-1 bg-transparent text-white rounded"
            variant="custom"
          >
            <MessageSquareIcon size={24} />
          </Button>
          <Button
            className="px-3 py-1 bg-transparent text-white rounded"
            variant="custom"
            onClick={() => downloadImage(photo.url)}
          >
            <Download size={24} />
          </Button>
        </div>
      </div>
    </div>
  );

  return showWatermark ? (
    <Watermark text="Parpics">
      <Content />
    </Watermark>
  ) : (
    <Content />
  );
};

const MasonryGrid = ({
  images,
  showWatermark,
  viewer,
  openSignInDialog,
  clientId,
  handleToggleFavoritePhoto,
  openModal,
}: {
  images: Photo[];
  showWatermark: boolean;
  viewer: Viewer | null;
  openSignInDialog: () => void;
  clientId: string;
  handleToggleFavoritePhoto: (clientId: string, publicId: string) => void;
  openModal: (index: number) => void;
}) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 px-12 md:px-24 lg:px-36 gap-4 pb-12">
      {images.map((photo: Photo, index: number) => (
        <GridItem
          key={photo.publicId}
          photo={photo}
          showWatermark={showWatermark}
          viewer={viewer}
          clientId={clientId}
          openSignInDialog={openSignInDialog}
          handleToggleFavoritePhoto={handleToggleFavoritePhoto}
          index={index}
          openModal={openModal}
        />
      ))}
    </div>
  );
};

const downloadImage = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = url.split("/").pop() || "image";
  saveAs(blob, filename);
};

const downloadAllImages = async (urls: string[]) => {
  const zip = new JSZip();

  await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split("/").pop() || "image";
      zip.file(filename, blob);
    })
  );

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, ".zip");
  });
};

export default function ViewAlbumPage() {
  const { user, logout } = useContext(AuthContext);

  const { data: userData } = useQuery(getUserById, {
    variables: { userId: user?.user_id },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openSignInDialog = () => setIsDialogOpen(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const { link } = useParams();

  const { loading, error, data, refetch } = useQuery(getAlbumPage, {
    variables: { link },
  });

  const clientId = data?.getAlbumPage.id;

  const [toggleFavoritePhoto] = useMutation(TOGGLE_FAVORITE_PHOTO);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const currentUser = userData?.getUserById as Viewer;
  const client = data?.getAlbumPage as Client;
  const photos = data?.getAlbumPage.photos;
  const mainPhoto = data?.getAlbumPage.photos[0];

  if (!photos) return <p>No photos found</p>;

  const photoUrls = photos.map((photo: Photo) => photo.url);

  return (
    <div className="flex flex-col min-h-screen">
      <AlbumHeader
        client={client}
        photoUrls={photoUrls}
        viewer={user}
        clientId={clientId}
        logout={logout}
      />

      <div className="relative w-screen flex-1 mb-8">
        <img
          src={mainPhoto.url}
          alt={mainPhoto.name}
          className="w-full h-screen object-cover"
        />
      </div>

      <MasonryGrid
        images={photos}
        showWatermark={!client.hasPaid}
        viewer={user}
        clientId={clientId}
        openSignInDialog={openSignInDialog}
        handleToggleFavoritePhoto={handleToggleFavoritePhoto}
        openModal={openModal}
      />

      <ViewerSignUpDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />

      <ImageModal
        images={photos}
        initialIndex={modalIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        client={client}
        viewer={currentUser}
        refetch={refetch}
      />
    </div>
  );
}
