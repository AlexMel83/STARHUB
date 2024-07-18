import { useQuery } from "@tanstack/vue-query";
import type { IComment } from "~/types/deals.types";
import { useDealSlideStore } from "@/stores/deal-slide.store.js";
import { useNuxtApp } from "#app";

interface ServerResponse {
  data: IComment[];
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

export function useComments() {
  const store = useDealSlideStore();
  const cardId = store.card?.id || null;
  const { $api, $load } = useNuxtApp();
  const errors = reactive({
    textError: "",
  });

  const commentsRef = ref<IComment[]>([]);

  const query = useQuery<ServerResponse, Error>({
    queryKey: ["deal", cardId],
    queryFn: async () => {
      if (!cardId) {
        throw new Error("Card ID is not defined");
      }
      try {
        const response: ServerResponse = await $load(
          () => $api.comments.getComment(cardId),
          errors,
        );
        commentsRef.value = response.data;
        return response;
      } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
      }
    },
    enabled: !!cardId,
  });

  watch(query.data, (newData) => {
    if (newData) {
      commentsRef.value = [...newData.data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }
  });

  watch(query.error, (newError) => {
    if (newError) {
      console.error("Query error:", newError);
      commentsRef.value = [];
    }
  });

  return {
    ...query,
    comments: commentsRef,
  };
}
