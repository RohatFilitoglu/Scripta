import http from "../http";
import type { UserDetail } from "../models/users.type";

const UserService = {
  getUserDetail: (id: string) => http.get<UserDetail>(`/profiles/${id}`),
};

export default UserService;
