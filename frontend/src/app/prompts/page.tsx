import { getPrompts } from "@/api/prompts/prompts.api";
import Typography from "@mui/material/Typography";
import { PromptList } from "./_components/PromptList";
import { CommonLayout } from "@/components/CommonLayout";
import { PromptsTitle } from "./_components/PromptsTitle";
import { Metadata } from "next/types";
import { makePageTitle } from "@/components/utils/pageCommonUtils";

export const metadata: Metadata = {
  title: makePageTitle("Prompts"),
};

const PromptsPage = async () => {
  const prompts = await getPrompts();

  return (
    <CommonLayout title="Prompts">
      <PromptsTitle hasExistingPrompts={prompts.length > 0} />

      <br />
      <Typography variant="h6">Prompts</Typography>
      <PromptList prompts={prompts} />
    </CommonLayout>
  );
};

export default PromptsPage;

// to force refetch on every load
export const dynamic = "force-dynamic";
