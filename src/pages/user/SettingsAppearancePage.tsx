import { useQuery } from "@apollo/client";
import { Suspense, useContext } from "react";
import { Separator } from "../../components/ui/separator";
import { AuthContext } from "../../context/context";
import SettingsLayout from "../../layouts/SettingsLayout";
import { getUserById } from "../../queries/queries";
import { AppearanceForm } from "../../components/user/settings/AppearanceForm";

export default function SettingsAppearancePage() {
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
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </p>
        </div>
        <Separator />
        <Suspense fallback={<div>Loading Appearance Form...</div>}>
          <AppearanceForm user={userData.getUserById} />
        </Suspense>
      </div>
    </SettingsLayout>
  );
}
