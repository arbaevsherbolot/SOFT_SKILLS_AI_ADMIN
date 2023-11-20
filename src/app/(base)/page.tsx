import { useUserData } from "@/hooks/useUserData";
import HomeClient from "./page.uc";

export default async function Home() {
  const data = await useUserData();

  if (!data || !data.user || !data.session) return null;

  return <HomeClient user={data.user} session={data.session} />;
}
