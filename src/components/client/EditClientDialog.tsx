import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Client } from "../../types/client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useMutation } from "@apollo/client";
import { EDIT_CLIENT } from "../../mutations/client";
import { useState } from "react";

interface EditClientDialogProps {
  client: Client;
  refetch: () => void;
}

export default function EditClientDialog({
  client,
  refetch,
}: EditClientDialogProps) {
  const [editClient] = useMutation(EDIT_CLIENT);

  const [name, setName] = useState<string>(client.name);
  const [link, setLink] = useState<string>(client.link);
  const [accessCode, setAccessCode] = useState<number>(client.accessCode);
  const [location, setLocation] = useState<string>(client.location);
  const [date, setDate] = useState<string>(client.date);

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await editClient({
        variables: {
          clientId: client.id,
          clientInput: {
            name,
            link,
            accessCode: accessCode.toString(),
            location,
            date,
          },
        },
      });
      refetch();
      setOpen(false);
      setLoading(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const generateRandomCode = () => {
    const random = Math.floor(Math.random() * 100000);
    setAccessCode(random);
  };

  const generateRandomLink = () => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }

    setLink(randomString);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleOnSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your client here
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-5"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-2">
              <Label htmlFor="link" className="text-right mr-1">
                Link
              </Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="col-span-4"
              />
              <Button
                variant="outline"
                className="col-span-1"
                type="button"
                onClick={generateRandomLink}
              >
                x
              </Button>
            </div>
            <div className="grid grid-cols-6 items-center gap-2">
              <Label htmlFor="accessCode" className="text-right mr-1">
                Access Code
              </Label>
              <Input
                id="accessCode"
                type="number"
                value={accessCode.toString()}
                onChange={(e) => setAccessCode(parseInt(e.target.value))}
                className="col-span-4"
              />
              <Button
                variant="outline"
                type="button"
                className="col-span-1"
                onClick={generateRandomCode}
              >
                x
              </Button>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-5"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
