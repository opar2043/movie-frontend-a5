import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { userRoute } from "../../components/service/users";

export default async function DashboardRedirect() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  try {
    const user = await userRoute.getMe({
      headers: {
        Cookie: cookieString,
      },
    });

    if (!user || !user.email) {
      redirect("/login");
    }

    const users = await userRoute.getUsers({
      headers: {
        Cookie: cookieString,
      },
    });
    
    const loginUser = users.find((u: any) => u.email === user.email);
    
    if (loginUser?.role === "ADMIN") {
      redirect("/dashboard/admin");
    } else {
      redirect("/dashboard/user/favorites");
    }
  } catch (error) {
    redirect("/dashboard/user/favorites");
  }
}