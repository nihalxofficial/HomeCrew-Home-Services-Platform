import { Service } from "@/types"
import { serverMutation } from "../core/server"

export const addService = async(data: Partial<Service>)=>{
    return serverMutation(`/services`, data)
}