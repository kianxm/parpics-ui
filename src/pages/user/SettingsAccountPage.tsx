import { useQuery } from "@apollo/client";
import { Suspense, useContext } from "react";
import { Separator } from "../../components/ui/separator";
import { AccountForm } from "../../components/user/settings/AccountForm";
import { AuthContext } from "../../context/context";
import SettingsLayout from "../../layouts/SettingsLayout";
import { getUserById } from "../../queries/queries";

export default function SettingsAccountPage() {
  const { user } = useContext(AuthContext);
  const { data: userData, loading } = useQuery(getUserById, {
    variables: { userId: user?.user_id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings. Set your preferred language and
            timezone.
          </p>
        </div>
        <Separator />
        <Suspense fallback={<div>Loading Account Form...</div>}>
          <AccountForm user={userData.getUserById} />
        </Suspense>
      </div>
    </SettingsLayout>
  );
}
