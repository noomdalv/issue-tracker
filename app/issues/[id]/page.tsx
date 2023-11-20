import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  if (!parseInt(params.id)) notFound();

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
      <Box>
        <Flex direction={"column"} gap={"4"}>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
