import { Redirect } from "@/components/Redirect";

export default function Home() {
  return (
    <>
      Redirecting...
      <Redirect path="/prompts" />
    </>
  );
}
