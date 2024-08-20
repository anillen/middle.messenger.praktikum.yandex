import UserInfo from "../../AuthService/models/UserInfo";

export default interface ChatPreview {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: Message;
}

export interface Message {
  user: UserInfo | null;
  time: Date;
  content: string;
}
