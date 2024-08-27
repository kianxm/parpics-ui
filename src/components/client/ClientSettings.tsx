import { useState } from "react";
import { Client } from "../../types/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "@apollo/client";
import { UPDATE_CLIENT_SETTINGS } from "../../mutations/client";

export default function ClientSettings({
  client,
  refetch,
}: {
  client: Client;
  refetch: () => void;
}) {
  const [settings, setSettings] = useState(client.settings);

  const [updateClientSettings] = useMutation(UPDATE_CLIENT_SETTINGS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]: checked,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const settingsInput = Object.keys(settings).reduce((acc, key) => {
      if (key !== "__typename") {
        acc[key] = settings[key as keyof typeof settings];
      }
      return acc;
    }, {} as Record<string, any>);

    try {
      await updateClientSettings({
        variables: {
          clientId: client.id,
          settingsInput,
        },
      });
      refetch();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Define the available settings options
  const settingsOptions = [
    { id: "enableWebsite", label: "Enable Website" },
    { id: "allowPhotoComments", label: "Allow Photo Comments" },
    { id: "allowAlbumComments", label: "Allow Album Comments" },
    { id: "allowSingleDownload", label: "Allow Single Download" },
    { id: "allowBulkDownload", label: "Allow Bulk Download" },
    { id: "allowFavorites", label: "Allow Favorites" },
    { id: "allowSharing", label: "Allow Sharing" },
    { id: "allowViewing", label: "Allow Viewing" },
    { id: "allowPayment", label: "Allow Payment" },
    { id: "showWatermark", label: "Show Watermarks" },
  ];

  return (
    <div className="flex flex-col py-4 gap-4">
      <h1 className="font-medium text-2xl">Settings</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {settingsOptions.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-2">
            <Input
              className="w-4 h-4"
              type="checkbox"
              id={id}
              defaultChecked={settings[id as keyof typeof settings]}
              onChange={handleChange}
            />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
        <Button className="col-span-1 w-16">Save</Button>
      </form>
    </div>
  );
}
