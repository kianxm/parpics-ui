import { useContext, useState } from "react";
import ClientTable from "../components/client/ClientTable";
import { useMutation, useQuery } from "@apollo/client";
import { getAllClientsByUserId } from "../queries/queries";
import ClientGrid from "../components/client/ClientGrid";
import FilterButtons from "../components/client/FilterButtons";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import { Button } from "../components/ui/button";
import { Grid, List, Plus } from "lucide-react";
import { Client } from "../types/client";
import { AuthContext } from "../context/context";
import { CREATE_CLIENT } from "../mutations/client";
import { mockClients } from "../utils/mock";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export default function ClientsPage() {
  const { user } = useContext(AuthContext);
  const [createClient] = useMutation(CREATE_CLIENT);

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

  const { loading, error, data, refetch } = useQuery(getAllClientsByUserId, {
    variables: { userId: user.user_id },
  });

  const [isGrid, setIsGrid] = useState(false);
  const handleViewChange = (isGridView: boolean) => {
    setIsGrid(isGridView);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex justify-between mx-4">
        <span className="font-semibold text-2xl mt-1">Clients</span>
        <div className="flex gap-2 ">
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

      <Tabs defaultValue="table" className="space-y-4">
        <div className="flex justify-between mx-4 mt-1">
          <FilterButtons />

          <TabsList>
            <TabsTrigger value="table">
              <List size={20} />
            </TabsTrigger>
            <TabsTrigger value="grid">
              <Grid size={20} />
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="table">
          <ClientTable
            clients={data.getAllClientsByUserId as Client[]}
            refetch={refetch}
          />
        </TabsContent>
        <TabsContent value="grid">
          <ClientGrid clients={data.getAllClientsByUserId as Client[]} />
        </TabsContent>
      </Tabs>
    </>
  );
}
