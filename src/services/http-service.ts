import { API_BASE_URL } from "@/constants/envs";
import axios from "axios";
import EventMembersService from "./api/event-members-service";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export type HttpClientProps = typeof api;

export type ResponseType<T = any> = {
  data: T | null;
  status: number;
};

class HttpService {
  constructor(public httpClient: HttpClientProps) {}

  get eventMembers() {
    return new EventMembersService(this.httpClient);
  }
}

const apiInstance = new HttpService(api);

export default apiInstance;
