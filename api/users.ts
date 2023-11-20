import axios from "axios";
import { GetUsersSchema } from "./schema/users.schema";

export const getAll = async (session: string): Promise<GetUsersSchema> => {
  return (
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })
  ).data;
};
