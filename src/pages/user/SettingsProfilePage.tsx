import { Separator } from "../../components/ui/separator";
import { ProfileForm } from "../../components/user/settings/ProfileForm";
import { useCurrentUser } from "../../utils/useCurrentUser";
import SettingsLayout from "../../layouts/SettingsLayout";

export default function SettingsProfilePage() {
  const user = useCurrentUser();

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
        <ProfileForm user={user} />
      </div>
    </SettingsLayout>
  );
}
