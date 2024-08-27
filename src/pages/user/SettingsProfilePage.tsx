import { useQuery } from "@apollo/client";
import { Suspense, useContext } from "react";
import { Separator } from "../../components/ui/separator";
import { ProfileForm } from "../../components/user/settings/ProfileForm";
import { AuthContext } from "../../context/context";
import SettingsLayout from "../../layouts/SettingsLayout";
import { getUserById } from "../../queries/queries";

export default function SettingsProfilePage() {
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
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <Suspense fallback={<div>Loading Profile Form...</div>}>
          <ProfileForm user={userData?.getUserById} />
        </Suspense>
      </div>
    </SettingsLayout>
  );
}
