import { useLazyQuery, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkAccessCode, getUserByUsername } from "../../queries/queries";
import { LOGO_SVG_PATH } from "../../utils/constants";
import { ROUTES } from "../../routes";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { capitalizeFirstLetter } from "../../utils/format";
import { useState } from "react";
import { uriAlbum } from "../../utils/uri";

export default function UserAccessPage() {
  const navigate = useNavigate();

  const { username } = useParams();
  const {
    data: userData,
    loading: userLoading,
    error,
  } = useQuery(getUserByUsername, {
    variables: { username: username },
    onError: () => {
      navigate(ROUTES.SITE);
    },
  });

  const [accessCode, setAccessCode] = useState<number>(null);
  const [errors, setErrors] = useState<string>("");

  const [
    checkAccessCodeQuery,
    { data: checkAccessCodeData, loading: checkAccessCodeLoading },
  ] = useLazyQuery(checkAccessCode);

  const handleAccessCode = async () => {
    try {
      const response = await checkAccessCodeQuery({
        variables: { accessCode: accessCode },
      });
      const { isValid, link } = response.data.checkAccessCode;

      if (isValid) {
        if (link) {
          navigate(uriAlbum(username, link));
        } else {
          setErrors("No link found");
        }
      } else {
        setErrors("Invalid access code");
      }
    } catch (error) {
      setErrors("Error checking access code " + error.message);
    }
  };

  if (userLoading) return <div>Loading user data...</div>;
  if (error) return <div>Error loading user data</div>;

  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center flex-col gap-5">
      <Link to={ROUTES.DASHBOARD.DASHBOARD} className="flex items-center gap-2">
        <img src={LOGO_SVG_PATH} alt="parpics logo" height={60} width={60} />
        <span className="text-3xl font-bold">Parpics.</span>
      </Link>
      <Card className="mx-auto min-w-[360px]">
        <CardHeader>
          <CardTitle className="text-2xl">Access Code</CardTitle>
          <CardDescription>
            Enter the code given to you by&nbsp;
            {capitalizeFirstLetter(userData?.getUserByUsername?.username)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Input
                name="accessCode"
                type="number"
                required
                placeholder="1234567890"
                autoComplete="off"
                onChange={(e) => setAccessCode(parseInt(e.target.value))}
              />
            </div>

            {errors && (
              <div className="text-sm text-red-500 text-center">{errors}</div>
            )}

            <Button
              className="w-full"
              onClick={handleAccessCode}
              disabled={checkAccessCodeLoading}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
