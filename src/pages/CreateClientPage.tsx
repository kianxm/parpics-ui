import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT } from "../mutations/client";
import { GraphQLFormattedError } from "graphql";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import { useForm } from "../utils/hooks";
import { Separator } from "../components/ui/separator";
import { ROUTES } from "../routes";

export default function CreateClientPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState<readonly GraphQLFormattedError[]>([]);

  function createClientCallback() {
    createClient();
  }

  const { onChange, onSubmit, values } = useForm(createClientCallback, {
    name: "",
    date: "",
    link: "",
    accessCode: "",
    location: "",
    hasPaid: false,
  });

  const [createClient, { loading }] = useMutation(CREATE_CLIENT, {
    onCompleted: () => {
      navigate(ROUTES.CLIENTS.CLIENTS);
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
    variables: { clientInput: values, userId: user.user_id },
  });

  return (
    <>
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create a new client</CardTitle>
          <CardDescription>
            Enter information about your client.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                placeholder="Name"
                type="text"
                required
                onChange={onChange}
              />
            </div>
            <div className="sm:col-span-1">
              <Label htmlFor="date">Date</Label>
              <Input
                name="date"
                placeholder="Date"
                type="date"
                required
                onChange={onChange}
              />
            </div>
            <div className="sm:col-span-1">
              <Label htmlFor="link">Link</Label>
              <Input
                name="link"
                placeholder="Link"
                type="text"
                required
                onChange={onChange}
                autoComplete="off"
              />
            </div>
            <div className="sm:col-span-1">
              <Label htmlFor="accessCode">Access Code</Label>
              <Input
                name="accessCode"
                placeholder="Access Code"
                type="text"
                required
                onChange={onChange}
                autoComplete="off"
              />
            </div>
            <div className="sm:col-span-1">
              <Label htmlFor="location">Location</Label>
              <Input
                name="location"
                placeholder="Location"
                type="text"
                required
                onChange={onChange}
                autoComplete="off"
              />
            </div>
            <div className="sm:col-span-2 flex gap-4 items-center mt-3 mb-1">
              <Label htmlFor="hasPaid">Paid?</Label>
              <input type="checkbox" name="hasPaid" onChange={onChange} />
            </div>
            <Separator className="sm:col-span-3 my-4 bg-gray-300" />

            {errors.map(function (error, index) {
              return (
                <div key={index} className="text-sm text-red-500 text-center">
                  {error.message}
                </div>
              );
            })}

            <div className="sm:col-span-3">
              <Button
                type="submit"
                className="w-full"
                onClick={onSubmit}
                disabled={loading}
              >
                Create client
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
