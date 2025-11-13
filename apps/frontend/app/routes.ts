import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("users", "routes/users/index.tsx"),
  route("users/:id", "routes/users/$id.tsx"),
  route("posts", "routes/posts/index.tsx"),
  route("posts/:id", "routes/posts/$id.tsx"),
] satisfies RouteConfig;
