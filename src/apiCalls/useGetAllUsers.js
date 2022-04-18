import { useQuery } from "react-query";
import { getToken } from "../utils/getToken";
import instance from "./instance";

const getAllUsers = ({ keyword, offset, limit, sortData }) => {
  console.log({ sortData });
  return instance.get("/users", {
    params: {
      limit,
      offset,
      ...(keyword
        ? {
            val_fast_search: keyword,
            type_sort: sortData.type || "asc",
            type_search: "fast",
            field_fast_search:
              sortData.field == "firstName"
                ? "users.first_name,users.last_name,users.mobile,users.email"
                : "users.last_name,users.first_name,users.mobile,users.email",
          }
        : {
            keyword: "",
            type_sort: sortData.type || "asc",
            type_search: "fast",
            field_fast_search:
              sortData.field == "firstName"
                ? "users.first_name,users.last_name,users.mobile,users.email"
                : "users.last_name,users.first_name,users.mobile,users.email",
          }),
    },
  });
};

const useGetAllUsers = (params) => {
  return useQuery("users", () => getAllUsers(params), {
    enabled: getToken() ? true : false,
  });
};

export default useGetAllUsers;
