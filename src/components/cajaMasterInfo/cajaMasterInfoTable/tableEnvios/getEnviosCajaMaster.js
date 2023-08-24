import axios from "axios"
import axiosConfigs from "../../../axiosConfig"



export const GetEnviosCajaMaster = async (id) => {
    const res = await axiosConfigs.get(`/obtener_envios_caja_master/${id}`)
    const data = res.data.data.docs
    console.log(data,'ssss')
    return data
}