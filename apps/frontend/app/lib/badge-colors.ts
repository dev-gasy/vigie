export function getStatusColor(status: string): string {
  switch (status) {
    case "To Do":
      return "bg-slate-400";
    case "In Progress":
      return "bg-blue-500";
    case "Done":
      return "bg-emerald-500";
    case "Blocked":
      return "bg-red-500";
    case "Testing":
      return "bg-amber-500";
    case "Review":
      return "bg-purple-500";
    default:
      return "bg-gray-400";
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "Critical":
      return "bg-red-100 text-red-800 border-red-300";
    case "High":
      return "bg-orange-100 text-orange-800 border-orange-300";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Low":
      return "bg-green-100 text-green-800 border-green-300";
    case "Lowest":
      return "bg-gray-100 text-gray-800 border-gray-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}

export function getLabelColor(index: number): string {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
    "bg-cyan-100 text-cyan-800",
    "bg-emerald-100 text-emerald-800",
    "bg-amber-100 text-amber-800",
  ];
  return colors[index % colors.length] || "bg-gray-100 text-gray-800";
}

export function getUserBadgeColor(): string {
  return "bg-blue-100 text-blue-800";
}

export function getArticleBadgeColor(): string {
  return "bg-purple-100 text-purple-800 border-purple-300";
}
