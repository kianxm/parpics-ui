import { Link } from "react-router-dom";
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

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  // const supabase = useSupabaseServer();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user) {
  //   redirect(ROUTES.DASHBOARD.DASHBOARD);
  // }

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
          <form id="login-form" className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                placeholder="kian@parpics.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                placeholder="********"
              />
            </div>
            {/* {searchParams.message && (
              <div className="text-sm font-medium text-destructive">
                {searchParams.message}
              </div>
            )} */}
            <Button className="w-full">Login</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <button form="login-form" className="underline">
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
