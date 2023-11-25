"use client";

import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data, error, isLoading } = useUsersQuery();

  if (isLoading) return <Skeleton />;

  if (error) return <div>Error: {error.message}</div>;

  const assignIssue = async (userId: string) => {
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
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedUserId || ""}
        onValueChange={assignIssue}
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

const useUsersQuery = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () =>
      await fetch("http://localhost:3000/api/users").then(
        async (res) => await res.json()
      ),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 3,
  });

export default AsigneeSelect;
