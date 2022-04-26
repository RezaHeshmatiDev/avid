import { useQuery } from "react-query";
import instance from "./instance";

const getRoles = ({ keyword, offset, limit, sortData }) => {
  return instance.get(`/roles`, {
    params: {
      limit,
      offset,
      ...(keyword
        ? {
            val_fast_search: keyword,
            type_sort: sortData.type || "asc",
            type_search: "fast",
            field_fast_search:
              sortData.field == "name" ? "roles.name,roles.label" : "roles.label,roles.name",
          }
        : {
            type_sort: sortData?.type || "asc",
            field_sort: sortData?.field || "roles.label",
          }),
    },
  });
};

const useGetRoles = (params) => {
  return useQuery(`roles`, () => getRoles(params), {
    refetchOnWindowFocus: false,
  });
};

export default useGetRoles;
