export interface GetVideoSchema {
  id: number;
  vimeoId?: string;
  authorEmail: string;
  url: string;
  cover: string;
  transcript: string;
  averageScore?: string;
  averageScoreColor?: string;
  isActive: boolean;
  topicId: number;
  topicTitle: string;
  createdAt: Date;
}
