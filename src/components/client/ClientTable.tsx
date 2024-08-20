import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { CLIENT_PAID, CLIENT_UNPAID } from "../../utils/constants";
import { Trash } from "lucide-react";
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
              {
                <Tag
                  text={String(client.hasPaid ? CLIENT_PAID : CLIENT_UNPAID)}
                />
              }
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {client.photoCount}
            </TableCell>
            <TableCell className="text-right w-0">
              <Button
                size={"icon"}
                className="text-foreground bg-transparent hover:bg-red-500 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(client.id);
                }}
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
