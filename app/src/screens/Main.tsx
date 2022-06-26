import React from "react";
import Auth from "./Auth";
import Home from "./Home";
import { useCurrentUser } from "../supabase/entities/users";

export default function Main() {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) return null;

  return currentUser ? <Home /> : <Auth />;
}
