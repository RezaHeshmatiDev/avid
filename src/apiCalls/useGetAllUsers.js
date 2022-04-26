import { useQuery } from "react-query";
import { getToken } from "../utils/getToken";
import instance from "./instance";

const getAllUsers = ({ keyword, offset, limit, sortData }) => {
  return instance.get("/users", {
    params: {
      limit,
      offset,
      ...(keyword
        ? {
            val_fast_search: keyword,
            type_sort: sortData.type || "asc",
            type_search: "fast",
            field_fast_search: "users.first_name,users.last_name,users.mobile,users.email",
            field_sort: sortData.field == "firstName" ? "users.first_name" : "users.last_name",
          }
        : {
            type_sort: sortData.type || "asc",
            field_sort: sortData.field == "firstName" ? "users.first_name" : "users.last_name",
          }),
    },
  });
};

const useGetAllUsers = (params) => {
  return useQuery("users", () => getAllUsers(params), {
    enabled: getToken() ? true : false,
    refetchOnWindowFocus: false,
  });
};

export default useGetAllUsers;
