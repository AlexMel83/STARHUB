import { useQuery } from "@tanstack/vue-query";
import { KANBAN_DATA } from "./kanban.data";
import type { IDeal } from "~/types/deals.types";
import type { IColumn } from "./kanban.types";
import { ref, onMounted } from "vue";

export function useKanbanQuery() {
  const { $api } = useNuxtApp();
  const errors = reactive({
    email: "",
    password: "",
    form: "",
  });
  const isLoading = ref(true);
  const isFetching = ref(false);
  const queryFn = async () => {
    try {
      const response = await $api.deals.getAllDeals();
      if (!response.data) {
        return [];
      }
      isLoading.value = false;
      isFetching.value = false;
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching deals:", error);
      isLoading.value = false;
      isFetching.value = false;
      return [];
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["deals"],
    queryFn,
    enabled: false,
    select(data) {
      if (!Array.isArray(data) || data.length === 0) {
        return [];
      }
      const newBoard: IColumn[] = KANBAN_DATA.map((column) => ({
        ...column,
        items: [],
      }));

      const deals = data as unknown as IDeal[];

      for (const deal of deals) {
        const column = newBoard.find((col) => col.id === deal.status);
        if (column) {
          const existingDeal = column.items.find((item) => item.id === deal.id);
          if (!existingDeal) {
            column.items.push({
              created_at: deal.created_at,
              id: deal.id,
              name: deal.name,
              price: deal.price,
              customer: deal.customer.name,
              status: deal.status,
            });
          }
        }
      }

      return newBoard;
    },
  });

  onMounted(() => {
    isFetching.value = true;
    setTimeout(() => {
      refetch();
    }, 300);
  });

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
}
