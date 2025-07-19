import * as jose from "jose";
import { cookies } from "next/headers";
import { UserInfo } from "@/types/global";

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
const issuer = "urn:opulenka:issuer";
const audience = "urn:opulenka:audience";

const encodeUserSession = async (encryptedInfo: UserInfo) => {
  const jwt = await new jose.EncryptJWT(encryptedInfo)
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime("2h")
    .encrypt(secret);
  return jwt;
};

const decodeUserSession = async (jwt: string) => {
  try {
    const { payload } = await jose.jwtDecrypt(jwt, secret, {
      issuer,
      audience,
    });
    return payload as jose.JWTPayload & UserInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setUserSession = async (userInfo: UserInfo) => {
  const jwt = await encodeUserSession(userInfo);
  const cookieStore = await cookies();

  cookieStore.set("session_id", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 60 * 60,
  });
};

export const getUserSession = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id");
  return sessionId ? await decodeUserSession(sessionId.value) : null;
};

export const endUserSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session_id");
};
