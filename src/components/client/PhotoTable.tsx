import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Photo } from "../../types/photo";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@apollo/client";
import { DELETE_PHOTO } from "../../mutations/client";
import { useState } from "react";
import { formatSize } from "../../utils/format";
import { Link } from "react-router-dom";
import Tag from "../ui/tag";

interface PhotoTableProps {
  photos: Photo[];
  refetch: () => void;
}

export default function PhotoTable({ photos, refetch }: PhotoTableProps) {
  const [deletePhoto] = useMutation(DELETE_PHOTO);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (publicId: string) => {
    setLoadingId(publicId);

    try {
      const { data } = await deletePhoto({ variables: { publicId } });

      if (data.deletePhoto) {
        refetch();
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Table className="w-full">
      <TableHeader className="whitespace-nowrap">
        <TableRow className="hover:bg-transparent">
          <TableHead></TableHead>
          <TableHead>File</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Format</TableHead>
          <TableHead>Size</TableHead>
        </TableRow>
      </TableHeader>
      <tbody>
        {photos?.map((photo, index) => (
          <TableRow key={index} className="cursor-pointer text-left">
            <TableCell className="whitespace-nowrap">
              <img
                src={photo.url}
                alt={photo.name}
                className="w-16 h-16 object-contain"
              />
            </TableCell>
            <TableCell className="whitespace-nowrap">{photo.name}</TableCell>
            <TableCell className="whitespace-nowrap hover:text-blue-500 max-w-md truncate">
              <Link to={photo.url} target="_blank">
                {photo.url}
              </Link>
            </TableCell>
            <TableCell className="whitespace-nowrap">
              <Tag text={photo.format} />
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatSize(photo.bytes)}
            </TableCell>
            <TableCell className="text-right w-0">
              <Button
                size={"icon"}
                className="text-foreground bg-transparent hover:bg-red-500 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(photo.publicId);
                }}
                disabled={loadingId === photo.publicId}
              >
                <Trash size={16} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
