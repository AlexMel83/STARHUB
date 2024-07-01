import { useQuery } from "@tanstack/vue-query";
import {COLLECTION_DEALS, DB_ID} from '~/app.constants';
import {KANBAN_DATA} from './kanban.data';

export function useKanbanQuery(){
    return useQuery({
        queryKey: ['deals'],
        queryFn: ()=> DB.listDocuments(DB_ID, COLLECTION_DEALS),
        select(data){
            const newBoard = [...KANBAN_DATA];
            const deals = data.documents as unknown as IDeal[];
            console.log(deals, newBoard);
        }
    });
}