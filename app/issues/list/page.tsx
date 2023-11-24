import prisma from "@/prisma/client";

import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import IssuesTable, { IssueQuery, columnNames } from "./IssuesTable";
import Pagination from "@/app/components/Pagination";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction={"column"} gap={"5"}>
      <IssueActions />
      <IssuesTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

// No server cache
export const dynamic = "force-dynamic";

// Cache refresh each 0 seconds
// export const revalidate = 0;

export default IssuesPage;
