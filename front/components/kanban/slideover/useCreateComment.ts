import { useMutation, UseQueryResult } from "@tanstack/vue-query";
import { useNuxtApp } from "#app";

interface CreateCommentPayload {
  deal_id: number;
  text: string;
}

export function useCreateComment({ refetch }: { refetch: UseQueryResult['refetch'] }) {
  const { $api } = useNuxtApp();
  const commentRef = ref("");

  const mutation = useMutation({
    mutationFn: async (newComment: CreateCommentPayload) => {
      return $api.comments.addComment(newComment);
    },
    onSuccess: () => {
      console.log("Comment created successfully");
      refetch();
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    }
  });

  const writeComment = async () => {
    if (!commentRef.value) {
      console.error("Comment is empty");
      return;
    }

    const newComment: CreateCommentPayload = {
      deal_id: 3, // или получайте актуальный id из store или пропсов
      text: commentRef.value
    };

    mutation.mutate(newComment);
  };

  return {
    commentRef,
    writeComment,
  };
}
