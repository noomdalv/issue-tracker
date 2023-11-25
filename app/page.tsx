import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function MyApp() {
  const issueCounts = {
    open: await prisma.issue.count({ where: { status: "OPEN" } }),
    inProgress: await prisma.issue.count({
      where: { status: "IN_PROGRESS" },
    }),
    closed: await prisma.issue.count({ where: { status: "CLOSED" } }),
  };

  return (
    <div>
      <IssueSummary {...issueCounts} />
      {/* <LatestIssues /> */}
      <Pagination itemCount={100} pageSize={10} currentPage={5} />
    </div>
  );
}
