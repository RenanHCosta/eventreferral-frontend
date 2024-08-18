import { Leaderboard } from "@/components/leaderboard";
import { RegisterForm } from "@/components/register-form";
import { ThemeToggler } from "@/components/theme-toggler";

type SearchParams = { [key: string]: string | string[] | undefined };

interface HomeProps {
  searchParams: SearchParams;
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
        <div className="w-full max-w-7xl items-center justify-between font-mono text-sm flex">
          <span className="font-logo uppercase text-4xl bg-gradient-to-r from-foreground via-foreground to-primary inline-block text-transparent bg-clip-text">
            Event Referral
          </span>
          <ThemeToggler />
        </div>

        <div className="flex flex-col lg:flex-row w-full max-w-7xl my-8 gap-16">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <span className="font-logo uppercase text-4xl bg-gradient-to-r from-foreground via-foreground to-primary inline-block text-transparent bg-clip-text">
              Participe do <span className="text-6xl">meu evento</span> e ganhe
              pontos por cada indicacão.
            </span>

            <span>
              Os melhores indicadores serão elegíveis para uma série de
              premiações.
            </span>
          </div>

          <div className="w-full lg:w-1/2">
            <RegisterForm />
          </div>
        </div>

        <div className="mb-32 lg:mb-0 w-full lg:max-w-7xl">
          <Leaderboard
            page={searchParams.page ? Number(searchParams.page) : 1}
          />
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <span>
          Esse projeto foi feito por{" "}
          <a className="text-primary" href="https://github.com/RenanHCosta">
            Renan Henrique
          </a>
        </span>
      </footer>
    </>
  );
}
