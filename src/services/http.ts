const BASE_URL = "https://dummyjson.com";

type HttpOptions = Omit<RequestInit, "body"> & {
  body?: unknown
};

export async function http<T>(path: string, options: HttpOptions = {}) {
  const token = localStorage.getItem("token");

  const { body, headers, ...rest} = options;

  const response = await fetch(
    `${BASE_URL}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        (errorData as { message?: string}).message ||
        `خطای شبکه: ${response.status}`
      );
    }

  return response.json() as Promise<T>
}