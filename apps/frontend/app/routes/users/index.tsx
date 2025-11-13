import type { User } from "@dgig-vigie/types";
import { type LoaderFunction } from "react-router";
import { useLoaderData } from "react-router";
import { queryClient } from "~/lib/query-client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "~/components/ui/page-header";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { ErrorMessage } from "~/components/ui/error-message";
import { Link } from "~/components/ui/link";

export const loader: LoaderFunction = async () => {
  try {
    const users = await queryClient.getAllUsers();
    return { users };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { users: [], error: "Failed to fetch users" };
  }
};

export function meta() {
  return [
    { title: "Users" },
    { name: "description", content: "List of all users" },
  ];
}

export default function UsersPage() {
  const { users, error } = useLoaderData<{ users: User[]; error?: string }>();

  if (error) {
    return (
      <div className="py-8">
        <PageHeader title="Users" description="Manage and view user profiles" />
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="py-8">
      <PageHeader title="Users" description="Manage and view user profiles" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card
            key={user.id}
            className="group hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">
                  {user.company.name}
                </p>
              </div>
              <div className="pt-3 border-t border-border">
                <Link
                  to={`/users/${user.id}`}
                  className="inline-flex items-center text-sm font-medium"
                >
                  View details
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
