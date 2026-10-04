"use client";

import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
// import { deleteJobAction } from "@/app/actions/delete-job";

function DeleteJobBtn({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
         const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      

      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
      return res.json();
    },

    onSuccess: () => {
      toast({ description: "Job removed" });

      queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
    },
    onError: () => {
      toast({ description: "There was an error deleting the job" });
    },
  });

  return (
    <Button size="sm" disabled={isPending} onClick={() => mutate()}>
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}

export default DeleteJobBtn;
