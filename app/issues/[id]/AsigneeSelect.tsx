"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";

const AsigneeSelect = () => {
  const usersQuery = () =>
    useQuery<User[]>({
      queryKey: ["users"],
      queryFn: async () =>
        fetch("http://localhost:3000/api/users").then(
          async (res) => await res.json()
        ),
    });

  const { data, error, isLoading } = usersQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign a User" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {data!.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
