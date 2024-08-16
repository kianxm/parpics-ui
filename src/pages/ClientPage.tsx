import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getClient } from "../queries/queries";
import { Client } from "../types/client";
import { formatDate } from "../utils/format";
import Tag from "../components/ui/tag";
import { CLIENT_PAID, CLIENT_UNPAID } from "../utils/constants";
import { Button } from "../components/ui/button";

export default function ClientPage() {
  const { clientId } = useParams();

  const { loading, error, data } = useQuery(getClient, {
    variables: { clientId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const client = data?.getClient as Client;

  return (
    <>
      <div className="flex justify-between mx-4">
        <span className="font-semibold text-2xl mt-1">{client.name}</span>
        <Button>Add Photos</Button>
      </div>
      <div className="flex gap-12 px-4">
        <span>Link: {client.link}</span>
        <span>Access Code: {client.accessCode}</span>
        <span>Location: {client.location}</span>
        <span>Date: {formatDate(client.date)}</span>
        <Tag text={client.hasPaid ? CLIENT_PAID : CLIENT_UNPAID} />
        <span>Photo Count: {client.photoCount}</span>
      </div>
    </>
  );
}
