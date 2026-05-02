const API_URL = "/api";

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options.headers },
  });

  const text = await response.text();
  console.log('Response:', response.status, text);

  if (!response.ok) {
    throw new Error(text || "Something went wrong");
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Invalid JSON response: " + text);
  }
};

export const authAPI = {
  register: (email, password, name) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email, password) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getSemesters: () => apiRequest("/semesters"),

  createSemester: (data) =>
    apiRequest("/semesters", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteSemester: (id) =>
    apiRequest(`/semesters/${id}`, {
      method: "DELETE",
    }),

  createCourse: (semesterId, data) =>
    apiRequest(`/semesters/${semesterId}/courses`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteCourse: (semesterId, courseId) =>
    apiRequest(`/semesters/${semesterId}/courses/${courseId}`, {
      method: "DELETE",
    }),
};
