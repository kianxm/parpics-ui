import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Photo } from "../../types/photo";
import { Edit2, Heart, Trash } from "lucide-react";
import { useMutation } from "@apollo/client";
import { DELETE_PHOTO, TOGGLE_FAVORITE_PHOTO } from "../../mutations/client";
import { useState } from "react";
import { formatSize } from "../../utils/format";
import { Link } from "react-router-dom";
import Tag from "../ui/tag";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IconDotsVertical, IconHeartFilled } from "@tabler/icons-react";

interface PhotoTableProps {
  photos: Photo[];
  refetch: () => void;
}

export default function PhotoTable({ photos, refetch }: PhotoTableProps) {
  const [deletePhoto] = useMutation(DELETE_PHOTO);

  const handleDelete = async (publicId: string) => {
    try {
      const { data } = await deletePhoto({ variables: { publicId } });

      if (data.deletePhoto) {
        refetch();
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  return (
    <Table className="w-full">
      <TableHeader className="whitespace-nowrap">
        <TableRow className="hover:bg-transparent">
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Format</TableHead>
          <TableHead>Size</TableHead>
        </TableRow>
      </TableHeader>
      <tbody>
        {photos?.map((photo, index) => (
          <TableRow key={index} className="cursor-pointer text-left">
            <TableCell className="whitespace-nowrap py-1 min-w-20 w-0">
              <img
                src={photo.url}
                alt={photo.name}
                className="w-16 h-16 object-fit"
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
            <TableCell className="whitespace-nowrap">
              {!photo.isFavorite ? (
                <Heart className="h-4 w-4" />
              ) : (
                <IconHeartFilled className="h-4 w-4 text-red-500" />
              )}
            </TableCell>
            <TableCell className="w-0">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IconDotsVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" className="w-36">
                  <DropdownMenuItem className="cursor-pointer">
                    <Edit2 className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      //TODO: Favorite photo here
                    }}
                  >
                    {!photo.isFavorite ? (
                      <Heart className="mr-2 h-4 w-4" />
                    ) : (
                      <IconHeartFilled className="mr-2 h-4 w-4 text-red-500" />
                    )}
                    <span>{photo.isFavorite ? "Unfavorite" : "Favorite"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(photo.publicId);
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
