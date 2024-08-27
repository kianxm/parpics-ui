import ClientTable from "../components/client/ClientTable";
import { useMutation, useQuery } from "@apollo/client";
import { getAllClientsByUserId } from "../queries/queries";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { Client } from "../types/client";
import { CREATE_CLIENT } from "../mutations/client";
import { mockClients } from "../utils/mock";
import { useCurrentUser } from "../utils/useCurrentUser";
import Spinner from "../components/Spinner";
import { Suspense } from "react";

export default function ClientsPage() {
  const user = useCurrentUser();

  const [createClient] = useMutation(CREATE_CLIENT);

  const { loading, error, data, refetch } = useQuery(getAllClientsByUserId, {
    variables: { userId: user.user_id },
  });

  const clients: Client[] = data?.getAllClientsByUserId;

  const createMockClient = async () => {
    try {
      // Select a random client from mockClients array
      const randomClient =
        mockClients[Math.floor(Math.random() * mockClients.length)];
      await createClient({
        variables: {
          clientInput: randomClient,
          userId: user.user_id,
        },
      });

      refetch();
    } catch (error) {
      console.error("Failed to create mock client", error);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex justify-between">
        <span className="font-semibold text-2xl mt-1">Clients</span>
        <div className="flex gap-2">
          <Button
            className="flex items-center"
            variant="outline"
            onClick={createMockClient}
          >
            Create Mock Client
          </Button>
          <Link to={ROUTES.CLIENTS.CREATE}>
            <Button className="flex gap-1 items-center">
              <Plus size={16} /> New
            </Button>
          </Link>
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <ClientTable clients={clients} refetch={refetch} />
      </Suspense>
    </>
  );
}
