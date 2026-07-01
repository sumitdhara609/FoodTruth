import Link from "next/link";
import { signInAction } from "@/app/auth/actions";
import { AuthCard } from "@/components/auth/auth-card";

type SignInPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;

  return (
    <AuthCard
      eyebrow="Sign In"
      title="Return to your FoodTruth workspace."
      description="Sign in to save reports, review your label archive, and continue building your FoodTruth account history."
      action={signInAction}
      submitLabel="Sign in"
      message={params.message}
      footer={
        <>
          New to FoodTruth?{" "}
          <Link
            href="/auth/sign-up"
            className="font-semibold text-[var(--primary)]"
          >
            Create account
          </Link>
        </>
      }
    />
  );
}