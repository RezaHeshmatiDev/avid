import { useQuery } from "react-query";
import instance from "./instance";

const getPermission = (permissionId) => {
  return instance.get(`/permissions/${permissionId}`);
};

const useGetOnePermission = (permissionId) => {
  return useQuery(`permission${permissionId}`, () => getPermission(permissionId), {
    refetchOnWindowFocus: false,
  });
};

export default useGetOnePermission;
