export type Status = "active" | "blocked";
export interface DataType {
  key?: React.Key;
  id: number;
  name: string;
  password?: string;
  email: string;
  registered_at: string;
  last_login_at: string | null;
  status: Status;
}

export const dataAddKey = (data: DataType[]) =>
  data.map((item) => {
    item.key = item.id;
    return item;
  });
