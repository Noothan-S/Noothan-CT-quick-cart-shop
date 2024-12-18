import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

export function decodeToken(token: string | null): DecodedToken | false {
  if (!token) {
    return false;
  }

  try {
    const decodedToken: DecodedToken = jwtDecode(token);

    if (decodedToken.exp) {
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        console.log("Token is expired");
        return false;
      }
    }

    return decodedToken;
  } catch (error) {
    console.log("Error when decoding auth token", error);
    return false;
  }
}
