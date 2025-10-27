export interface Profile {
  id: string;
  name: string;
  headline?: string;
  bio?: string;
  contact_email?: string;
}

export interface Project {
  id: string;
  title: string;
  short_desc?: string;
  stack?: string[];
  repo_url?: string;
  live_url?: string;
  tags?: string[];
}

export type WsMsg = { type: string; [k: string]: unknown };

export interface NpcReply {
  text: string;
  actions?: Array<{ type: string; [k: string]: unknown }>;
  tts?: string; // data:audio/... base64
}
