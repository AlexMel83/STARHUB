<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type { ICustomer } from "~/types/deals.types";

useSeoMeta({
  title: "Customers",
});

interface ServerResponse {
  data: ICustomer[];
  status: number;
  statusText: string;
  headers: any; 
  config: any;
}

const { $api, $load } = useNuxtApp();
  const errors = reactive({
    textError: '',
  });

const { data: customers, isLoading } = useQuery({
  queryKey: ["customers"],
  queryFn: async () => {
      try {
        const customers: ServerResponse = await $load(() => $api.customers.getCustomers(), errors);
        return customers.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
      }
    },
});
</script>

<template>
  <div>
    <h1 class="font-bold text-2xl mb-10">Our clients</h1>
    <div v-if="isLoading">Loading...</div>
    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[80px]">Image</UiTableHead>
          <UiTableHead class="w-[200px]">Name</UiTableHead>
          <UiTableHead class="w-[200px]">email</UiTableHead>
          <UiTableHead>Where from</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow
          v-for="customer in customers as unknown as ICustomer[]"
          :key="customer.id"
        >
          <UiTableCell>
            <NuxtLink :href="`/customers/edit/${customer.id}`">
              <NuxtImg
                :src="customer.avatar_url"
                :alt="customer.name"
                width="50"
                height="50"
                class="rounded-full"
              />
            </NuxtLink>
          </UiTableCell>
          <UiTableCell class="font-medium">{{ customer.name }}</UiTableCell>
          <UiTableCell>{{ customer.email }}</UiTableCell>
          <UiTableCell>{{ customer.from_source }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>
