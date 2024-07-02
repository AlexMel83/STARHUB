import { useQuery } from "@tanstack/vue-query";
import {COLLECTION_DEALS, DB_ID} from '~/app.constants';
import {KANBAN_DATA} from './kanban.data';
import type {IDeal} from '~/lib/types/deals.types';
import { DB } from '~/lib/appwrite';

export function useKanbanQuery() {
	return useQuery({
		queryKey: ['deals'],
		queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
		select(data) {
			const newBoard = [...KANBAN_DATA];
			const deals = data.documents as unknown as IDeal[];
			for (const deal of deals) {
				let column = newBoard.find(col => col.id === deal.status);
				if (column) {
					column.items.push({
						$createdAt: deal.$createdAt,
						id: deal.$id,
						name: deal.name,
						price: deal.price,
						companyName: deal.customer.name,
						status: column.name,
					})
				}   
			}
			return newBoard
		},
	})
}