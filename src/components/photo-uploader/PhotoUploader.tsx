import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useMutation } from "@apollo/client";
import { ADD_PHOTO_TO_CLIENT } from "../../mutations/client";
import { useParams } from "react-router-dom";
import { Input } from "../ui/input";

export default function PhotoUploader({ refetch }: { refetch: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false); // State to control the dialog visibility

  const [addPhotoToClient] = useMutation(ADD_PHOTO_TO_CLIENT);
  const { clientId } = useParams();

  const [uploading, setUploading] = useState(false);

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!files.length) {
      alert("No files selected");
      return;
    }
    setUploading(true);

    const uploadedPhotos = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "upload-preset");
        formData.append("api_key", process.env.CLOUDINARY_API_KEY);

        const results = await fetch(
          `https://api.cloudinary.com/v1_1/dy7e4k0ow/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        return {
          name: results.original_filename,
          createdAt: results.created_at,
          format: results.format,
          bytes: results.bytes,
          url: results.url,
          publicId: results.public_id,
          version: results.version,
          assetId: results.asset_id,
        };
      })
    );

    try {
      await Promise.all(
        uploadedPhotos.map((photoInput) =>
          addPhotoToClient({
            variables: {
              clientId,
              photoInput,
            },
          })
        )
      );
      refetch();
      setUploading(false);
      setOpen(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Add Photos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleOnSubmit}>
          <DialogHeader>
            <DialogTitle>Add Photos</DialogTitle>
          </DialogHeader>
          <Input
            type="file"
            multiple
            onChange={handleChange}
            className="my-4"
          />
          <DialogFooter>
            <Button type="submit" disabled={uploading || files.length === 0}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
