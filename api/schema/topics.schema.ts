export interface GetTopicSchema {
  id: number;
  title: string;
  date: string;
  prompt: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
