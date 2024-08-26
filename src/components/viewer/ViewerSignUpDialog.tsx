import { useMutation } from "@apollo/client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LOGIN_USER, REGISTER_VIEWER } from "../../mutations/user";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/context";
import { GraphQLFormattedError } from "graphql";
import { useForm } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";

interface ViewerSignUpDialog {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ViewerSignUpDialog({
  isOpen,
  onOpenChange,
}: ViewerSignUpDialog) {
  const context = useContext(AuthContext);
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<readonly GraphQLFormattedError[]>([]);

  function registerViewerCallback() {
    registerViewer();
  }

  function loginUserCallback() {
    loginUser();
  }

  const initialValues = {
    ...(!isSignIn ? {} : { name: "" }),
    email: "",
    password: "",
  };

  const { onChange, onSubmit, values } = useForm(
    isSignIn ? loginUserCallback : registerViewerCallback,
    initialValues
  );

  const [registerViewer, { loading: registerLoading }] = useMutation(
    REGISTER_VIEWER,
    {
      onCompleted: (data) => {
        const { registerViewer: userData } = data;
        context.login(userData);
        onOpenChange(false);
        navigate(0);
      },
      onError: ({ graphQLErrors }) => {
        setErrors(graphQLErrors);
      },
      variables: { registerInput: values },
    }
  );

  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { loginUser: userData } = data;
      context.login(userData);
      onOpenChange(false);
      navigate(0);
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isSignIn ? "Log in" : "Let's get you signed up!"}
          </DialogTitle>
          <DialogDescription>
            {isSignIn ? "Access the album" : "Register to like and comment"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!isSignIn && (
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                required
                placeholder="Kian Malakooti"
                onChange={onChange}
              />
            </div>
          )}
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              required
              placeholder="kian@parpics.com"
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              required
              placeholder="********"
              onChange={onChange}
            />
          </div>

          {errors.map(function (error, index) {
            return (
              <div key={index} className="text-sm text-red-500">
                {error.message}
              </div>
            );
          })}

          <div className="text-center text-sm">
            <span className="mr-1">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
            </span>
            <span
              className="underline cursor-pointer"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Sign up" : "Log in"}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={registerLoading || loginLoading}
          >
            {isSignIn ? "Log in" : "Sign up"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
