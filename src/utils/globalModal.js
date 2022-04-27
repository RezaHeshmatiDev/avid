import Swal from "sweetalert2";

export const confirmModal = (callback) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

export const errorModal = (error) => {
  Swal.fire({
    title: error.code || 500,
    html: error?.message
      ? ` <p>${error.message}</p>
      <br/>
    <hr/>
    <br/>

    ${error?.fields ? Object.values(error.fields).join("<br/>") : ""}
    `
      : "somthing went wrong",
    icon: "error",
    confirmButtonText: "ok",
  });
};
