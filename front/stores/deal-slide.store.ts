import { defineStore } from "pinia";
import type { ICard } from "~/front/components/kanban/kanban.types";

const defaultValue: { card: ICard | null; isOpen: boolean } = {
  card: null,
  isOpen: false,
};

export const useDealSlideStore = defineStore("deal-slide", {
  state: () => defaultValue,
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(card: ICard) {
      this.$patch({ card, isOpen: true });
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
