"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  const usersQuery = () =>
    useQuery<User[]>({
      queryKey: ["users"],
      queryFn: async () =>
        await fetch("http://localhost:3000/api/users").then(
          async (res) => await res.json()
        ),
      staleTime: 1000 * 60 * 5,
      retry: 3,
    });

  const { data, error, isLoading } = usersQuery();

  if (isLoading) return <Skeleton />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedUserId || ""}
        onValueChange={async (userId) => {
          const assignedUserId = userId === "unassigned" ? null : userId;
          try {
            const response = await fetch(`/api/issues/${issue.id}`, {
              method: "PATCH",
              body: JSON.stringify({ assignedUserId }),
            });
            if (!response.ok) throw new Error();
          } catch (error) {
            toast.error("Could not update issue");
          }
        }}
      >
        <Select.Trigger placeholder="Assign a User" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {data!.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default AsigneeSelect;
