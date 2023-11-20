import axios from "axios";
import { GetVideoSchema } from "./schema/videos.schema";

export const getAll = async (session: string): Promise<GetVideoSchema[]> => {
  return (
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/videos?all=true`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })
  ).data;
};
