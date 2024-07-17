import { useMutation } from "@tanstack/vue-query";
import { useNuxtApp } from "#app";

interface CreateCommentPayload {
  deal_id: number;
  text: string;
}

export function useCreateComment({ refetch }: { refetch: () => void }) {
  const { $api } = useNuxtApp();
  const store = useDealSlideStore();
  const commentRef = ref("");
  const cardId = store.card?.id || null;

  const mutation = useMutation({
    mutationFn: async (newComment: CreateCommentPayload) => {
      return $api.comments.addComment(newComment);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });

  const writeComment = async () => {
    if (!commentRef.value) {
      console.error("Comment is empty");
      return;
    }
    if (!cardId) {
      throw new Error("Card ID is not defined");
    }
    const newComment: CreateCommentPayload = {
      deal_id: cardId,
      text: commentRef.value,
    };

    mutation.mutate(newComment);
    commentRef.value = "";
  };

  return {
    commentRef,
    writeComment,
  };
}
