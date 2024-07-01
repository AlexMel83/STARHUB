import { useQuery } from "@tanstack/vue-query";
import {COLLECTION_DEALS, DB_ID} from '~/app.constants';

export function useKanbanQuery(){
    return useQuery({
        queryKey: ['deals'],
        queryFn: ()=> DB.listDocuments(DB_ID, COLLECTION_DEALS)
    });
}