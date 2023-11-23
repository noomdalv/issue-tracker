"use client";

import { Status } from "@prisma/client";
import { Box, Select } from "@radix-ui/themes";
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

const filterByStatus = (status: Status) => {
  console.log(status);
};

const IssueFilterComponent = () => {
  return (
    <Box>
      <Select.Root defaultValue={""} onValueChange={filterByStatus}>
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
