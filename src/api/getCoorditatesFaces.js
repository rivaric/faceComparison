export const getCoorditatesFaces = (data) => {
  return fetch("http://26.113.24.68:8000/upload_images", {
    method: "post",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: data,
    }),
  });
};
