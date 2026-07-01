import { ProductNav } from "@/components/navigation/product-nav";
import { getCurrentUser } from "@/lib/supabase/auth";

export async function ProductNavWrapper() {
  const user = await getCurrentUser();

  return <ProductNav isSignedIn={Boolean(user)} />;
}