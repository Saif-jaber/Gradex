const API = 'http://localhost:5000';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem("token")}`
});

export const addCourse = async (data) => {
  const res = await fetch(`${API}/courses/add`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);
  return JSON.parse(text);
};

// for later
export const deleteCourse = async (data) => {
};

export const updateCourseStatus = async (data) => {
};