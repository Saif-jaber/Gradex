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

export const deleteCourse = async (courseId) => {
  const res = await fetch(`${API}/courses/${courseId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const updateCourseStatus = async (courseId, status, grade = null) => {
  const res = await fetch(`${API}/courses/updateStatus/${courseId}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ status, grade }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text);
  }
};