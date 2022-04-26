import { useQuery } from "react-query";
import instance from "./instance";

const getRole = (roleId) => {
  return instance.get(`/roles/${roleId}`);
};

const useGetOneRole = (roleId) => {
  return useQuery(`role${roleId}`, () => getRole(roleId), {
    refetchOnWindowFocus: false,
  });
};

export default useGetOneRole;
