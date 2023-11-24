"use client";

import { Status } from "@prisma/client";
import { Box, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

const IssueFilterComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterByStatus = (status: Status | "ALL") => {
    const params = new URLSearchParams();
    params.append("status", status);
    params.append("orderBy", searchParams.get("orderBy") || "");
    const query = params.size ? `?${params.toString()}` : "";

    router.push(`/issues/list${query}`);
  };

  return (
    <Box>
      <Select.Root
        defaultValue={searchParams.get("status") || ""}
        onValueChange={filterByStatus}
      >
        <Select.Trigger
          placeholder="Filter by status"
          style={{ width: "10rem" }}
        />
        <Select.Content
          position="popper"
          sideOffset={-35}
          alignOffset={160}
          className="selectContent"
        >
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses.map((status) => (
              <Select.Item
                key={status.value || "ALL"}
                value={status.value || "ALL"}
              >
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default IssueFilterComponent;
