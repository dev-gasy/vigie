import type { User } from "@dgig-vigie/types";
import { type LoaderFunction } from "react-router";
import { useLoaderData } from "react-router";
import { queryClient } from "~/lib/api-client";

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseInt(params.id as string);

  if (isNaN(id)) {
    throw new Response("Invalid user ID", { status: 400 });
  }

  try {
    const user = await queryClient.getUserById(id);
    return { user };
  } catch (error) {
    console.error(`Failed to fetch user ${id}:`, error);
    throw new Response("User not found", { status: 404 });
  }
};

export function meta({ data }: { data: { user: User } }) {
  return [
    { title: `${data.user?.name || "User"} - User Details` },
    { name: "description", content: `Details for ${data.user?.name}` },
  ];
}

export default function UserDetailsPage() {
  const { user } = useLoaderData<{ user: User }>();

  return (
    <div className="p-6">
      <div className="mb-4">
        <a href="/users" className="text-blue-500 hover:underline">
          ← Back to Users
        </a>
      </div>

      <div className="border p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong> {user.website}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Address</h2>
            <p>
              {user.address.street}, {user.address.suite}
            </p>
            <p>
              {user.address.city}, {user.address.zipcode}
            </p>
            <p>
              <strong>Coordinates:</strong> {user.address.geo.lat},{" "}
              {user.address.geo.lng}
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">Company</h2>
            <p>
              <strong>Name:</strong> {user.company.name}
            </p>
            <p>
              <strong>Catch Phrase:</strong> {user.company.catchPhrase}
            </p>
            <p>
              <strong>Business:</strong> {user.company.bs}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
