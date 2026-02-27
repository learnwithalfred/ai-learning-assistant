import { redirect } from "next/navigation";

export const metadata = {
  title: "AI Learning App",
};

export default function Home() {
  redirect("/learn");
}
