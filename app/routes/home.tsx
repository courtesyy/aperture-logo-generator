import type { Route } from "./+types/home";
import { LogoGenerator } from "./logo-generator";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aperture Science logo generator" },
    { name: "description", content: "Generate the Aperture Science logo with custom text." },
  ];
}

export default function Home() {
  return <LogoGenerator />;
}
