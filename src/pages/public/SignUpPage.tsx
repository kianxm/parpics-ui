import { Link, useNavigate } from "react-router-dom";
import { LOGO_SVG_PATH } from "../../utils/constants";
import { ROUTES } from "../../routes";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "../../mutations/mutations";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/context";
import { useForm } from "../../utils/hooks";
import { GraphQLFormattedError } from "graphql";

export default function SignUpPage() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<readonly GraphQLFormattedError[]>([]);

  function registerUserCallback() {
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      const { registerUser: userData } = data;
      context.login(userData);
      navigate(ROUTES.DASHBOARD.DASHBOARD);
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center flex-col gap-5">
      <Link to={ROUTES.DASHBOARD.DASHBOARD} className="flex items-center gap-2">
        <img src={LOGO_SVG_PATH} alt="parpics logo" height={60} width={60} />
        <span className="text-3xl font-bold">Parpics.</span>
      </Link>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                required
                placeholder="kian@parpics.com"
                onChange={onChange}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                required
                placeholder="********"
                onChange={onChange}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                required
                placeholder="********"
                onChange={onChange}
              />
            </div>

            {errors.map(function (error, index) {
              return <div key={index}>{error.message}</div>;
            })}

            <Button className="w-full" onClick={onSubmit} disabled={loading}>
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
