import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open", value: open, status: "OPEN" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed ", value: closed, status: "CLOSED" },
  ];
  return (
    <>
      <Heading size={"3"}>Issues Summary</Heading>
      <Flex gap={"5"}>
        {containers.map((container) => (
          <Card key={container.label}>
            <Flex direction={"column"} gap={"2"}>
              <Link
                href={`/issues/list?status=${container.status}`}
                className={"text-sm font-medium"}
              >
                {container.label}
              </Link>
              <Text size={"5"} className="font-bold ">
                {container.value}
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default IssueSummary;
