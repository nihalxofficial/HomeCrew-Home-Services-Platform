"use server"
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
};


export const getToken = async()=>{
  const token = await auth.api.getToken({
    headers: await headers(),
  });
  return token ? token.token : {}
}


export const getRequiredRole = async(role : string)=> {
  const user = await getUserSession();
  if(!user){
    redirect("/login");
  }
  const currentRole = user?.role;
  if(currentRole!==role){
    redirect("/forbidden");
  }
}