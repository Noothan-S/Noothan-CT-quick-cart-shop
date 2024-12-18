import { jwtDecode } from "jwt-decode";

export function decodeToken(token: string | null) {
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.log("Error when decoding auth token", error);
    return false;
  }
}
