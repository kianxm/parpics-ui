import { Separator } from "../../components/ui/separator";
import { AccountForm } from "../../components/user/settings/AccountForm";
import SettingsLayout from "../../layouts/SettingsLayout";
import { useCurrentUser } from "../../utils/useCurrentUser";

export default function SettingsAccountPage() {
  const user = useCurrentUser();

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
        <AccountForm user={user} />
      </div>
    </SettingsLayout>
  );
}
