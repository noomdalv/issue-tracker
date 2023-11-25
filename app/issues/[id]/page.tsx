import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import AsigneeSelect from "./AsigneeSelect";
import authOptions from "@/app/auth/AuthOptions";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  if (!parseInt(params.id)) notFound();

  const session = await getServerSession(authOptions);
  console.log(session);
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      {/* radix-ui size "sm" is equivalent to tailwind size "md"  */}
      <Box className="md:col-span-4 ">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <AsigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailsPage;

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  return {
    title: `${issue?.title}`,
    description: `Details of issue ${issue?.id}`,
  };
}
