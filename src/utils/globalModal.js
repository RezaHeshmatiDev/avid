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
    title: error.code,
    html: ` <p>${error.message}</p>
    <hr/>
    <br/>

    ${Object.values(error.fields).join("<br/>")}
    `,
    icon: "error",
    confirmButtonText: "ok",
  });
};
