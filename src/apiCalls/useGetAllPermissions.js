import { useQuery } from "react-query";
import instance from "./instance";

const getPermissions = ({ keyword, offset, limit, sortData }) => {
  return instance.get(`/permissions`, {
    params: {
      limit,
      offset,
      ...(keyword
        ? {
            val_fast_search: keyword,
            type_sort: sortData?.type || "asc",
            type_search: "fast",
            field_fast_search: "permissions.name,permissions.label",
            field_sort: sortData?.field == "name" ? "permissions.name" : "permissions.label",
          }
        : {
            type_sort: sortData?.type || "asc",
            field_sort: sortData?.field == "name" ? "permissions.name" : "permissions.label",
          }),
    },
  });
};

const useGetPermissions = (params) => {
  return useQuery(`permissions`, () => getPermissions(params), {
    refetchOnWindowFocus: false,
  });
};

export default useGetPermissions;
