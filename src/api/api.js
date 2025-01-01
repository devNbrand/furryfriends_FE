import serverInstance from "./server";

export const createPet = async (data) => {
  try {
    const response = await serverInstance.post("api/pets", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const profile = async () => {
  try {
    const response = await serverInstance.get("api/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyotp = async (data) => {
  try {
    const response = await serverInstance.post("api/users/verify-otp", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendotp = async (data) => {
  try {
    const response = await serverInstance.post(
      "api/users/send-otp",
      {},
      {
        headers: {
          Authorization: `Bearer ${data}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPet = async (id) => {
  try {
    const response = await serverInstance.get(`api/pets/${id}`);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTeam = async () => {
  try {
    const response = await serverInstance.get("api/team");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signUp = async (data) => {
  try {
    const response = await serverInstance.post("api/users/signup", data);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signIn = async (data) => {
  try {
    const response = await serverInstance.post("api/users/login", data);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createBowl = async (data) => {
  try {
    const response = await serverInstance.post("api/bowls", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBowl = async (id) => {
  try {
    const response = await serverInstance.get(`api/bowls/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllBowls = async () => {
  try {
    const response = await serverInstance.get("api/bowls");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markBowlEmpty = async (id) => {
  try {
    const response = await serverInstance.patch(`api/bowls/${id}/empty`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markBowlRefilled = async (id) => {
  try {
    const response = await serverInstance.patch(
      `api/bowls/${id}/refilled`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserPets = async () => {
  try {
    const response = await serverInstance.get("api/users/pets", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editPet = async (data) => {
  try {
    const response = await serverInstance.put(
      `api/pets/${data.furryid}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markMissingPet = async (id) => {
  try {
    const response = await serverInstance.patch(
      `api/pets/${id}/mark-missing`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markFoundPet = async (id) => {
  try {
    const response = await serverInstance.patch(
      `api/pets/${id}/mark-found`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editBowls = async (data) => {
  try {
    const response = await serverInstance.put(`api/bowls/${data.bid}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await serverInstance.get("api/users/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
