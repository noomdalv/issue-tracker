"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await fetch("/api/issues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        router.push("/issues");
      })}
    >
      <TextField.Root>
        <TextField.Input
          {...register("title", { required: true })}
          placeholder="Title"
        />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="Description" />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
