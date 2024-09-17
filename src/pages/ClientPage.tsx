import { useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { getClient } from "../queries/queries";
import { Client } from "../types/client";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import ClientWebsiteSettings from "../components/client/ClientWebsiteSettings";
import { useCurrentUser } from "../utils/useCurrentUser";
import { ClientSettingsType } from "../types/settings";
import ClientSettings from "../components/client/ClientSettings";

export default function ClientPage() {
  const user = useCurrentUser();

  const { clientId } = useParams();

  const { loading, error, data, refetch } = useQuery(getClient, {
    variables: { clientId },
  });

  const [deleteAllClientPhotos, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_ALL_CLIENT_PHOTOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const client: Client = data?.getClient;
  const photos: Photo[] = data?.getClient.photos;
  const settings: ClientSettingsType = data?.getClient.settings;

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
        <span className="font-semibold text-2xl mt-1 flex gap-2 items-center mb-2">
          {client.name}
          {settings.enableWebsite && client.photoCount !== 0 && (
            <Link to={uriAlbum(user.username, client.link)}>
              <Button variant="ghost" className="px-3 py-0">
                <IconLink size={16} />
              </Button>
            </Link>
          )}
          <Tag text={client.hasPaid ? CLIENT_PAID : CLIENT_UNPAID} />
        </span>
        <div className="flex gap-2">
          <EditClientDialog client={client} refetch={refetch} />
          <PhotoUploader refetch={refetch} />
          <div className="hidden md:block">
            <Button
              onClick={handleDeleteAll}
              disabled={deleting}
              variant="destructive"
            >
              {deleting ? "Deleting..." : "Delete All"}
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="flex gap-12 mb-4">
        <span>Access Code: {client.accessCode}</span>
        <span>Location: {client.location}</span>
        <span>Date: {formatDate(client.date)}</span>
        <span>Photo Count: {client.photoCount}</span>
      </div> */}

      <Tabs defaultValue="photos">
        <TabsList>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="photos">
          {photos.length > 0 ? (
            <PhotoTable photos={photos as Photo[]} refetch={refetch} />
          ) : (
            <div className="flex items-center justify-center h-full w-full text-center mt-16">
              No client photos
            </div>
          )}
        </TabsContent>
        <TabsContent value="website">
          <ClientWebsiteSettings client={client} refetch={refetch} />
        </TabsContent>
        <TabsContent value="settings">
          <ClientSettings client={client} refetch={refetch} />
        </TabsContent>
      </Tabs>

      {deleteError && (
        <div className="text-red-500 mt-4">
          Error deleting photos: {deleteError.message}
        </div>
      )}
    </>
  );
}
