export const getSimilarityCoefficient = (data) => {
  return fetch("http://26.113.24.68:8000/select_face", {
    method: "post",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: data,
    }),
  });
};
