import { useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { getClient } from "../queries/queries";
import { Client } from "../types/client";
import { formatDate } from "../utils/format";
import Tag from "../components/ui/tag";
import { CLIENT_PAID, CLIENT_UNPAID } from "../utils/constants";
import PhotoUploader from "../components/photo-uploader/PhotoUploader";
import { Photo } from "../types/photo";
import PhotoTable from "../components/client/PhotoTable";
import { Button } from "../components/ui/button";
import { DELETE_ALL_CLIENT_PHOTOS } from "../mutations/client";
import EditClientDialog from "../components/client/EditClientDialog";
import { uriAlbum } from "../utils/uri";
import { IconLink } from "@tabler/icons-react";

export default function ClientPage() {
  const { clientId } = useParams();

  const { loading, error, data, refetch } = useQuery(getClient, {
    variables: { clientId },
  });

  const [deleteAllClientPhotos, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_ALL_CLIENT_PHOTOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const client = data?.getClient as Client;
  const photos = data?.getClient.photos;

  const handleDeleteAll = async () => {
    try {
      await deleteAllClientPhotos({ variables: { clientId } });
      refetch();
    } catch (error) {
      console.error("Error deleting all client photos:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <span className="font-semibold text-2xl mt-1 flex gap-2 items-center">
          {client.name}
          <Link to={uriAlbum("admin", client.link)}>
            <Button variant="ghost" className="px-3 py-0">
              <IconLink size={16} />
            </Button>
          </Link>
          <Tag text={client.hasPaid ? CLIENT_PAID : CLIENT_UNPAID} />
        </span>
        <div className="flex gap-2">
          <EditClientDialog client={client} refetch={refetch} />
          <PhotoUploader refetch={refetch} />
          <Button
            onClick={handleDeleteAll}
            disabled={deleting}
            variant="destructive"
          >
            {deleting ? "Deleting..." : "Delete All"}
          </Button>
        </div>
      </div>

      <div className="flex gap-12 px-4">
        <span>Access Code: {client.accessCode}</span>
        <span>Location: {client.location}</span>
        <span>Date: {formatDate(client.date)}</span>
        <span>Photo Count: {client.photoCount}</span>
      </div>

      {photos.length > 0 ? (
        <PhotoTable photos={photos as Photo[]} refetch={refetch} />
      ) : (
        <div className="mx-auto font-semibold justify-center">
          No client photos
        </div>
      )}
      {deleteError && (
        <div className="text-red-500 mt-4">
          Error deleting photos: {deleteError.message}
        </div>
      )}
    </>
  );
}
