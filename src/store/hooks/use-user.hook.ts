import { useAppSelector } from "..";
import * as UserStore from "../slice/user.slice";

const useUserStore = () => {
  const userDetail = useAppSelector(UserStore.select.getUserDetail);
  const loading = useAppSelector(UserStore.select.getLoading);

  return { userDetail, loading };
};

export default useUserStore;
