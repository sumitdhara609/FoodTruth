import Link from "next/link";
import { signUpAction } from "@/app/auth/actions";
import { AuthCard } from "@/components/auth/auth-card";

type SignUpPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;

  return (
    <AuthCard
      eyebrow="Create Account"
      title="Start saving your label reports."
      description="Create a FoodTruth account to save reviewed label reports and access them from your account archive."
      action={signUpAction}
      submitLabel="Create account"
      message={params.message}
      showNameField
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-semibold text-[var(--primary)]"
          >
            Sign in
          </Link>
        </>
      }
    />
  );
}