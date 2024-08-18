import { Leaderboard } from "@/components/leaderboard";
import { ThemeToggler } from "@/components/theme-toggler";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-end font-mono text-sm lg:flex">
        <ThemeToggler />
      </div>

      <div className="relative z-[-1] flex place-items-center">
        <span className="font-logo uppercase text-8xl bg-gradient-to-r from-foreground via-foreground to-primary inline-block text-transparent bg-clip-text">
          Event Referral
        </span>
      </div>

      <div className="mb-32 lg:mb-0 lg:w-full lg:max-w-5xl">
        <Leaderboard />
      </div>
    </main>
  );
}
