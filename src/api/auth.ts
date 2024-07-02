import { auth } from "@/lib/firebsae/config";

// Note: this is not really a proper API call, but just placing this function here in case the logic ever changes
export function getCurrentUser() {
  return auth.currentUser;
}

export function isAuthenticated() {
  return !!getCurrentUser()
}

export const authenticatedStatus = () => {
  return !!getCurrentUser()
}