"use server";
import { cookies } from "next/headers";
import headers from "./Headers";

export default async function GetRequest(url: string) {
  const { API_URL, API_VER } = process.env;
  if (!API_URL || !API_VER) return;

  let res = null;
  try {
    //log the api route being requested: console.log(API_URL + API_VER + url);
    res = await (
      await fetch(API_URL + API_VER + url, {
        method: "GET",
        ...headers(),
        credentials: "include",
      })
    ).json();
    //log the response: console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    return res;
  }
}

export async function Logout() {
  const cookieStore = cookies();
  cookieStore.delete("Authentication");
  return true;
}
