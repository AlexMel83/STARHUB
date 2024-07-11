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
    queryFn: async () => await $load(async () => {
      const response = await $api.deals.getAllDeals();
      return response.data;
      }, errors),
    select(data) {
      const newBoard: IColumn[] = KANBAN_DATA.map((column) => ({
        ...column,
        items: [],
      }));
      

      const deals = data as unknown as IDeal[];
      console.log(deals, newBoard)
      for (const deal of deals) {
        let column = newBoard.find((col) => col.id === deal.status);
        if (column) {
          const existingDeal = column.items.find(
            (item) => item.id === deal.$id,
          );
          if (!existingDeal) {
            column.items.push({
              $createdAt: deal.$createdAt,
              id: deal.$id,
              name: deal.name,
              price: deal.price,
              companyName: deal.customer.name,
              status: column.name,
            });
          }
        }
      }
      return newBoard;
    },
  });
}
