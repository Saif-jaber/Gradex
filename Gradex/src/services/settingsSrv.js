const API = 'http://localhost:5000';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem("token")}`
});

export const getSettings = async () => {
  const res = await fetch(`${API}/settings`, {
    method: 'GET',
    headers: authHeaders(),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text);
  }
};

export const updateSettings = async (data) => {
  const res = await fetch(`${API}/settings`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};
