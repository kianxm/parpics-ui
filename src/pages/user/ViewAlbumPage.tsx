import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Photo } from "../../types/photo";
import { Button } from "../../components/ui/button";
import { Download, Heart, MessageSquareIcon } from "lucide-react";
import { getAlbumPage } from "../../queries/queries";
import { Client } from "../../types/client";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Watermark } from "@hirohe/react-watermark";

const AlbumHeader = ({
  title,
  photoUrls,
}: {
  title: string;
  photoUrls: string[];
}) => {
  return (
    <div className="sticky top-0 left-0 right-0 flex justify-between items-center px-8 py-5 text-gray-800 z-10">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex gap-2">
        <Button className="px-3 py-1 bg-transparent rounded" variant="custom">
          <Heart size={16} />
        </Button>
        <Button className="px-3 py-1 bg-transparent rounded" variant="custom">
          <MessageSquareIcon size={16} />
        </Button>
        <Button
          className="px-3 py-1 bg-transparent text-gray-800 rounded"
          variant="custom"
          onClick={() => downloadAllImages(photoUrls)}
        >
          <Download size={16} />
        </Button>
      </div>
    </div>
  );
};

const GridItem = ({
  photo,
  showWatermark,
}: {
  photo: Photo;
  showWatermark: boolean;
}) => {
  const Content = () => (
    <div className="relative mb-4 break-inside-avoid">
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
          >
            <Heart size={24} />
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
}: {
  images: Photo[];
  showWatermark: boolean;
}) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 px-36 gap-4 pb-12">
      {images.map((photo: Photo) => (
        <GridItem
          key={photo.publicId}
          photo={photo}
          showWatermark={showWatermark}
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
  const { link } = useParams();

  const { loading, error, data } = useQuery(getAlbumPage, {
    variables: { link },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const client = data?.getAlbumPage as Client;
  const mainPhoto = data?.getAlbumPage.photos[1];
  const photos = data?.getAlbumPage.photos;

  if (!photos) return <p>No photos found</p>;

  const photoUrls = photos.map((photo: Photo) => photo.url);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-screen flex-1">
        <img
          src={mainPhoto.url}
          alt={mainPhoto.name}
          className="w-full h-screen object-cover"
        />
      </div>

      <AlbumHeader title={client.name} photoUrls={photoUrls} />

      <MasonryGrid images={photos} showWatermark={!client.hasPaid} />
    </div>
  );
}
