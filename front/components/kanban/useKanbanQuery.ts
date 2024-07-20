import { useQuery } from "@tanstack/vue-query";
import { KANBAN_DATA } from "./kanban.data";
import type { IDeal } from "~/types/deals.types";
import type { IColumn } from "./kanban.types";

export function useKanbanQuery() {
  const { $api, $load } = useNuxtApp();
  const errors = reactive({
    email: "",
    password: "",
    form: "",
  });

  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      try {
        const data = await $load(async () => {
          const response = await $api.deals.getAllDeals();
          return response.data || [];
        }, errors);
        return data;
      } catch (error) {
        console.error("Error fetching deals:", error);
        return [];
      }
    },
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
}
