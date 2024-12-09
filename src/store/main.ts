import { reactive } from "vue";

interface TMainStore {
  count: number;
  query: string;
}

export const store = reactive<TMainStore>({
  count: 0,
  query: "query",
});
