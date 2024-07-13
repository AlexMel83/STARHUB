import { useQuery } from "@tanstack/vue-query";

export function useComments() {
  const store = useDealSlideStore();
  const cardId = store.card?.id || "";
  const { $api, $load } = useNuxtApp();
  const errors = reactive({
    textError: '',
  });

  return useQuery({
    queryKey: ["deal", cardId],
    queryFn: async () => await $load(async () => {
      const response = await $api.comments.getComment(cardId);
      return response.data;
      }, errors),
  });
}
