import axios from "axios";
import { CreateTopicDto } from "./dto/topics.dto";
import { GetTopicSchema } from "./schema/topics.schema";

export const create = async (
  dto: CreateTopicDto,
  session: string
): Promise<GetTopicSchema> => {
  return (
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/topics/create`,
      {
        ...dto,
      },
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    )
  ).data;
};

export const getAll = async (session: string): Promise<GetTopicSchema[]> => {
  return (
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })
  ).data;
};
