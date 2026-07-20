import { getUserSession } from "@/lib/core/session";
import AddServiceClient from "./AddServiceClient";

export default async function AddServicePage() {
  const creator = await getUserSession();
  return <AddServiceClient creator={creator} />;
}