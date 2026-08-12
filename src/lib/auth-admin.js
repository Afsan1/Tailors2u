import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_COOKIE_NAME = "t2u_admin_session";

// Secret hash generator based on configured credentials
function generateAdminToken() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "adminpassword";
  const secretKey = process.env.CLERK_SECRET_KEY || "tailors2u_admin_secret_key_2026";
  
  return crypto
    .createHmac("sha256", secretKey)
    .update(`${username}:${password}:tailors2u_executive_admin`)
    .digest("hex");
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function getAdminToken() {
  return generateAdminToken();
}

export async function checkAdminAuthorization() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const expectedToken = generateAdminToken();

    if (sessionToken && sessionToken === expectedToken) {
      return {
        authorized: true,
        user: {
          username: process.env.ADMIN_USERNAME || "admin",
          name: "Executive Admin",
        },
      };
    }

    return {
      authorized: false,
      reason: "Invalid or missing admin session.",
    };
  } catch (error) {
    console.error("Admin Authorization Check Failed:", error);
    return {
      authorized: false,
      reason: error.message,
    };
  }
}

export function verifyAdminCredentials(username, password) {
  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "adminpassword";

  return (
    username &&
    password &&
    username.trim() === expectedUsername.trim() &&
    password.trim() === expectedPassword.trim()
  );
}
