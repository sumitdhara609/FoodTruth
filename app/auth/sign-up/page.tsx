import { AuthCard } from "@/components/auth/auth-card";
import { signUpAction } from "@/app/auth/actions";

type SignUpPageProps = {
  searchParams?: Promise<{
    message?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;

  return (
    <AuthCard
      eyebrow="Create Account"
      title="Start building your label history."
      description="Create a FoodTruth account to prepare for saved reports, badge progress, and a personal label-intelligence archive."
      action={signUpAction}
      buttonLabel="Create account"
      footerText="Already have an account?"
      footerHref="/auth/sign-in"
      footerLabel="Sign in"
      message={params?.message}
    />
  );
}