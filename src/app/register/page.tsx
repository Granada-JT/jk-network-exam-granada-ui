import AccountDetailsForm from "@/components/layout/AccountDetailsForm";
import PageContent from "@/components/layout/PageContent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Register() {
	const cookieStore = await cookies();
	const token = cookieStore.get('app_session');

	if (token?.value) {
		redirect("/dashboard");
	}

	return (
		<PageContent>
			<AccountDetailsForm
				title="Register"
				submitText="Register"
			/>
		</PageContent>
	)
}