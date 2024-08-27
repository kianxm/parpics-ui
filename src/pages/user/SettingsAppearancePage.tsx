import { Separator } from "../../components/ui/separator";
import SettingsLayout from "../../layouts/SettingsLayout";
import { AppearanceForm } from "../../components/user/settings/AppearanceForm";
import { useCurrentUser } from "../../utils/useCurrentUser";

export default function SettingsAppearancePage() {
  const user = useCurrentUser();

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
        <AppearanceForm user={user} />
      </div>
    </SettingsLayout>
  );
}
