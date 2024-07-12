import { EnumStatus } from "~/types/deals.types";
import type { IColumn } from "./kanban.types";

export const KANBAN_DATA: IColumn[] = [
  {
    id: EnumStatus.todo,
    name: "Вхідні",
    items: [],
  },
  {
    id: EnumStatus["to-be-agreed"],
    name: "На погоджені",
    items: [],
  },
  {
    id: EnumStatus["in-progress"],
    name: "В процесі",
    items: [],
  },
  {
    id: EnumStatus.produced,
    name: "Вироблено",
    items: [],
  },
  {
    id: EnumStatus.done,
    name: "До відвантаження",
    items: [],
  },
];
