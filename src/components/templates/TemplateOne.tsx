import { IconCreditCardPay, IconHeartFilled } from "@tabler/icons-react";
import { Client } from "../../types/client";
import { Viewer } from "../../types/user";
import { Button } from "../ui/button";
import { Download, Heart, LogOut, MessageSquareIcon } from "lucide-react";
import { downloadAllImages, downloadImage } from "../../utils/download";
import { Photo } from "../../types/photo";
import { Watermark } from "@hirohe/react-watermark";
import { ImageModal } from "../viewer/ImageModal";
import ViewerSignUpDialog from "../viewer/ViewerSignUpDialog";
import { WebsiteTemplateProps } from "../../types/website";
import { AuthContext } from "../../context/context";
import { useContext, useState } from "react";
import { ClientSettings } from "../../types/settings";

// Modern Template
const AlbumHeader = ({
  client,
  photoUrls,
  viewer,
  logout,
}: {
  client: Client;
  photoUrls: string[];
  viewer: Viewer | null;
  logout: () => void;
}) => {
  const settings: ClientSettings = client.settings;

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-5 text-gray-800 z-10 bg-white shadow-sm">
      <h1 className="text-2xl font-semibold">{client.name}</h1>
      <div className="flex gap-2">
        {!client.hasPaid && settings.allowPayment ? (
          <Button
            className="px-3 py-1 bg-transparent rounded"
            variant="custom"
            onClick={() => alert("Upgrade to premium")}
          >
            <IconCreditCardPay size={16} />
          </Button>
        ) : null}
        {settings.allowAlbumComments && (
          <Button className="px-3 py-1 bg-transparent rounded" variant="custom">
            <MessageSquareIcon size={16} />
          </Button>
        )}
        {settings.allowBulkDownload && (
          <Button
            className="px-3 py-1 bg-transparent text-gray-800 rounded"
            variant="custom"
            onClick={() => downloadAllImages(photoUrls)}
            disabled={!client.hasPaid}
          >
            <Download size={16} />
          </Button>
        )}
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
  settings,
}: {
  photo: Photo;
  showWatermark: boolean;
  viewer: Viewer | null;
  openSignInDialog: () => void;
  clientId: string;
  handleToggleFavoritePhoto: (clientId: string, publicId: string) => void;
  index: number;
  openModal: (index: number) => void;
  settings: ClientSettings;
}) => {
  const Content = () => (
    <div
      className="relative mb-4 break-inside-avoid"
      onClick={(e) => {
        e.stopPropagation();
        if (!viewer) {
          openSignInDialog();
        } else {
          openModal(index);
        }
      }}
    >
      <img
        src={photo.url}
        className="w-full object-cover rounded-lg"
        alt={photo.name}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg cursor-pointer">
        <div className="flex space-x-2">
          {settings.allowFavorites && (
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
          )}
          {settings.allowPhotoComments && (
            <Button
              className="px-3 py-1 bg-transparent text-white rounded"
              variant="custom"
              onClick={(e) => {
                e.stopPropagation();
                if (!viewer) {
                  openSignInDialog();
                } else {
                  openModal(index);
                }
              }}
            >
              <MessageSquareIcon size={24} />
            </Button>
          )}
          {settings.allowSingleDownload && (
            <Button
              className="px-3 py-1 bg-transparent text-white rounded"
              variant="custom"
              onClick={(e) => {
                e.stopPropagation();
                downloadImage(photo.url);
              }}
            >
              <Download size={24} />
            </Button>
          )}
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
  settings,
}: {
  images: Photo[];
  showWatermark: boolean;
  viewer: Viewer | null;
  openSignInDialog: () => void;
  clientId: string;
  handleToggleFavoritePhoto: (clientId: string, publicId: string) => void;
  openModal: (index: number) => void;
  settings: ClientSettings;
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
          settings={settings}
        />
      ))}
    </div>
  );
};

export default function TemplateOne({
  client,
  photos,
  mainPhoto,
  photoUrls,
  viewer,
  handleToggleFavoritePhoto,
  refetch,
}: WebsiteTemplateProps) {
  const { logout } = useContext(AuthContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openSignInDialog = () => setIsDialogOpen(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AlbumHeader
        client={client}
        photoUrls={photoUrls}
        viewer={viewer}
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
        showWatermark={!client.hasPaid || client.settings.showWatermark}
        viewer={viewer}
        clientId={client.id}
        openSignInDialog={openSignInDialog}
        handleToggleFavoritePhoto={handleToggleFavoritePhoto}
        openModal={openModal}
        settings={client.settings}
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
        viewer={viewer}
        downloadImage={downloadImage}
        handleToggleFavoritePhoto={handleToggleFavoritePhoto}
        refetch={refetch}
      />
    </div>
  );
}
