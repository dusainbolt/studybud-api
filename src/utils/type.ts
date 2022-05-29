export type SortPaginate = {
  sortBy: number;
  orderBy: string;
  offset: number;
  limit: number;
};

export type MsgResponse = {
  message: string;
  code?: string;
};

export const schemaString = (defaultVal: any = null) => {
  return { type: String, default: defaultVal };
};
