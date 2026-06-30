import { AuthCard } from "@/components/auth/auth-card";
import { signInAction } from "@/app/auth/actions";

type SignInPageProps = {
  searchParams?: Promise<{
    message?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;

  return (
    <AuthCard
      eyebrow="Sign In"
      title="Return to your FoodTruth account."
      description="Sign in to continue building your saved label reports, account signals, and future badge progress."
      action={signInAction}
      buttonLabel="Sign in"
      footerText="New to FoodTruth?"
      footerHref="/auth/sign-up"
      footerLabel="Create account"
      message={params?.message}
    />
  );
}