import type { User } from "@dgig-vigie/types";
import { type LoaderFunction } from "react-router";
import { useLoaderData } from "react-router";
import { queryClient } from "~/lib/api-client";

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
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.company.name}</p>
            <a
              href={`/users/${user.id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
