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
import { convertToSlug, formatDate } from "../../utils/format";
import { Client } from "../../types/client";
import { uriClient } from "../../utils/uri";
import { useNavigate } from "react-router-dom";

interface ClientTableProps {
  clients: Client[];
}

export default function ClientTable({ clients }: ClientTableProps) {
  const navigate = useNavigate();

  // const handleDelete = async (clientId: number) => {
  //   setIsLoading(true);
  //   try {
  //     // await deleteClient(clientId);
  //     toast({
  //       title: "Success!",
  //       description: "Client has been deleted.",
  //     });
  //     // Optionally, you can refresh the client list or navigate
  //     // router.refresh() or router.push('/some-path')
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete the client.",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
          <TableHead>Paid Status</TableHead>
          <TableHead>Count</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <tbody>
        {clients?.map((client, index) => (
          <TableRow
            key={index}
            className="cursor-pointer text-left"
            onClick={() => navigate(uriClient(convertToSlug(client.name)))}
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
                // onClick={(e) => {
                //   e.stopPropagation();
                //   handleDelete(client.id);
                // }}
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
