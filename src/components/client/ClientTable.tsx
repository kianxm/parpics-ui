import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CLIENT_PAID, CLIENT_UNPAID } from "../../utils/constants";
import { Edit2, Heart, Plus, Trash } from "lucide-react";
import Tag from "../ui/tag";
import { formatDate } from "../../utils/format";
import { Client } from "../../types/client";
import { uriClient } from "../../utils/uri";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  DELETE_ALL_CLIENT_PHOTOS,
  DELETE_CLIENT,
} from "../../mutations/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";

interface ClientTableProps {
  clients: Client[];
  refetch: () => void;
}

export default function ClientTable({ clients, refetch }: ClientTableProps) {
  const navigate = useNavigate();

  const [deleteClient] = useMutation(DELETE_CLIENT);
  const [deleteAllClientPhotos] = useMutation(DELETE_ALL_CLIENT_PHOTOS);

  const handleDelete = async (clientId: string) => {
    try {
      await deleteAllClientPhotos({ variables: { clientId } });
      await deleteClient({ variables: { clientId } });
      refetch();
    } catch (error) {
      throw new Error("Failed to delete client");
    }
  };

  return (
    <Table className="w-full">
      <TableCaption>View your clients here.</TableCaption>
      <TableHeader className="whitespace-nowrap">
        <TableRow className="hover:bg-transparent">
          <TableHead>Name</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Access Code</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Photos</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <tbody>
        {clients?.map((client, index) => (
          <TableRow
            key={index}
            className="cursor-pointer text-left"
            onClick={() => navigate(uriClient(client.id))}
          >
            <TableCell className="whitespace-nowrap">{client.name}</TableCell>
            <TableCell className="whitespace-nowrap">{client.link}</TableCell>
            <TableCell className="whitespace-nowrap">
              {client.accessCode}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {client.location}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDate(client.date)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              <Tag
                text={String(client.hasPaid ? CLIENT_PAID : CLIENT_UNPAID)}
              />
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {client.photoCount}
            </TableCell>
            <TableCell className="text-right w-0">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IconDotsVertical size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" className="w-40">
                  <DropdownMenuItem>
                    <Edit2 className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className=""
                    onClick={(e) => {
                      e.stopPropagation();
                      //TODO: Favorite photo here
                    }}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorite</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New Team</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(client.id);
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
