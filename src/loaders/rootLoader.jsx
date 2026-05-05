import { getCurrentUser } from "../apis/auth";

export default function rootLoader() {
  return getCurrentUser();
}
