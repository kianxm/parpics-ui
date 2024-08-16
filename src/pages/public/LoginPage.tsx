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
import { LOGIN_USER } from "../../mutations/user";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/context";
import { useForm } from "../../utils/hooks";
import { GraphQLFormattedError } from "graphql";

export default function LoginPage() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<readonly GraphQLFormattedError[]>([]);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { loginUser: userData } = data;
      context.login(userData);
      navigate(ROUTES.DASHBOARD.DASHBOARD);
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center flex-col gap-5">
      <Link to={ROUTES.DASHBOARD.DASHBOARD} className="flex items-center gap-2">
        <img src={LOGO_SVG_PATH} alt="parpics logo" height={60} width={60} />
        <span className="text-3xl font-bold">Parpics.</span>
      </Link>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Log in</CardTitle>
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

            {errors.map(function (error, index) {
              return (
                <div key={index} className="text-sm text-red-500 text-center">
                  {error.message}
                </div>
              );
            })}

            <Button className="w-full" onClick={onSubmit} disabled={loading}>
              Login
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={ROUTES.SIGN_UP} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
