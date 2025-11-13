export function Welcome() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Vigie</h1>
      <p className="mb-6 text-gray-600">
        Navigate to different sections of the application:
      </p>
      <nav className="space-y-4">
        <a
          href="/users"
          className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-gray-600">View and manage users</p>
        </a>
        <a
          href="/posts"
          className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-lg font-semibold">Posts</h2>
          <p className="text-gray-600">View and manage posts</p>
        </a>
      </nav>
    </div>
  );
}
