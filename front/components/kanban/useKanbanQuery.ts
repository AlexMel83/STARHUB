import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import { KANBAN_DATA } from "./kanban.data";
import type { IDeal } from "~/lib/types/deals.types";
import { DB } from "~/lib/appwrite";
import type { IColumn } from "./kanban.types";

export function useKanbanQuery() {
  return useQuery({
    queryKey: ["deals"],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
    select(data) {
      const newBoard: IColumn[] = KANBAN_DATA.map((column) => ({
        ...column,
        items: [],
      }));

      const deals = data.documents as unknown as IDeal[];
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