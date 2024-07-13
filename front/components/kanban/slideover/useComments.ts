import { useQuery } from "@tanstack/vue-query";

export function useComments() {
  const store = useDealSlideStore();
  const { $api, $load } = useNuxtApp();
  const cardId = store.card?.id || null;
  const errors = reactive({
    textError: '',
  });

  return useQuery({
    queryKey: ["deal", cardId],
    queryFn: async () => await $load(async () => {
      if (cardId === null) {
        return [];
      };
      return await $api.comments.getComment(cardId);
      }, errors),
  });
}
