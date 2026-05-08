const API = 'http://localhost:5000';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem("token")}`
});

export const addSemester = async (data) => {
    const res = await fetch(`${API}/semesters/add`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    const text = await res.text();
    if (!res.ok) throw new Error(text);
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(text);
    }
}

export const getSemesterId = async (name) => {
    const res = await fetch(`${API}/semesters/id/${encodeURIComponent(name)}`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (res.status === 404) return null;

    const text = await res.text();
    if (!res.ok) throw new Error(text);
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(text);
    }
}

export const checkSemester = async (semester_id) => {
    const res = await fetch(`${API}/semesters/check/${semester_id}`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (res.status === 404) return { exists: false };

    const text = await res.text();
    if (!res.ok) throw new Error(text);
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(text);
    }
}
