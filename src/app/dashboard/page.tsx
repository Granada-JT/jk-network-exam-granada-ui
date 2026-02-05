import PageContent from "@/components/layout/PageContent";
import RecordsTable from "@/components/layout/RecordsTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('app_session');

  if (!token || !token.value) {
    redirect("/login");
  }

  return (
    <PageContent>
      <RecordsTable />
    </PageContent>
  );
}