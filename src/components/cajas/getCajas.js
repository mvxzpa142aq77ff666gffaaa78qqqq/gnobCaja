import React,{useContext} from "react"
import axios from "axios"
import axiosConfigs from "../axiosConfig"
import { useQuery } from "@tanstack/react-query"

const id = window.localStorage.getItem("qsaw")


//const arrayMaster = ['Master_GNOB']
export const GetTodasCajas = async (userId) => {
    //console.log(userId,'dddd')
    
        const res = await axiosConfigs.get(`/obtener_todas_cajas`)
        const data = res.data.data.docs
        console.log(data,userId)
        return data 
}

export const GetMasterCajas = async (id) => {

    const res = await axiosConfigs.get(`/obtener_cajas_master/${id}`)
    const data = res.data.data.docs
    console.log(data)
    return data 

}




