import { AlertTriangle } from "lucide-react";

export default async function page() {
  return (
    <div className="flex w-full flex-col items-center p-6 justify-center">
      <AlertTriangle />
      <p className="font-semibold">Page not found</p>
    </div>
  );
}
