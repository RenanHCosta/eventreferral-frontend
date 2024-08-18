import { EVENT_MEMBERS } from "@/constants/endpoints";
import { HttpClientProps, ResponseType } from "../http-service";
import { AxiosError } from "axios";

type GetLeaderboardResponse = {
  content: {
    name: string;
    points: number;
  }[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

type RegisterResponse = {
  name: string;
  points: number;
  referralId: string;
};

class EventMembersService {
  constructor(private httpClient: HttpClientProps) {}

  async register(
    name: string,
    email: string,
    referralId: string = ""
  ): Promise<ResponseType<RegisterResponse>> {
    try {
      const { data, status } = await this.httpClient.post(EVENT_MEMBERS, {
        name,
        email,
        referralId,
      });

      return { data, status };
    } catch (err) {
      if (err instanceof AxiosError) {
        return { data: null, status: err.status || 503 };
      }

      return { data: null, status: 500 };
    }
  }

  async getLeaderboard(
    page: number,
    size: number
  ): Promise<ResponseType<GetLeaderboardResponse>> {
    try {
      const { data, status } = await this.httpClient.get(EVENT_MEMBERS, {
        params: { page, size },
      });

      return { data, status };
    } catch (err) {
      if (err instanceof AxiosError) {
        return { data: null, status: err.status || 503 };
      }

      return { data: null, status: 500 };
    }
  }
}

export default EventMembersService;
