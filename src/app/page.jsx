import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex min-h-[calc(100vh-69px)] flex-col items-center justify-center p-24">
        <h1 className="text-5xl font-bold">Welcome to Company Profile</h1>
        <div className="flex gap-3 mt-5">
          <Link
            href="/register"
            className="btn-default bg-[var(--color-black)] no-underline"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="btn-default bg-[var(--color-black)] no-underline"
          >
            Login
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
