import SignInMicrosoft from "../imports/SignInMicrosoft";

interface MicrosoftLoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export function MicrosoftLoginPage({ onLogin, onBack }: MicrosoftLoginPageProps) {
  return <SignInMicrosoft onLogin={onLogin} onBack={onBack} />;
}
