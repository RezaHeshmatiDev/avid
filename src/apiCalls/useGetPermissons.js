import { useQuery } from "react-query";
import instance from "./instance";

const getPermissions = () => {
  return instance.get(`/permissions`);
};

const useGetPermissions = () => {
  return useQuery(`permissions`, () => getPermissions(), {
    refetchOnWindowFocus: false,
  });
};

export default useGetPermissions;
