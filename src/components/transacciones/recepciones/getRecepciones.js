import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetRecepcionTodos = async () => {
    const res = await axiosConfigs.get('/recepciones_todas')
    const data = res.data
    return data
}
export const GetRecepcionesCajaMaster = async (userId) => {
    const res = await axiosConfigs.get(`/obtener_recepciones_caja_master/${userId}`)
    const data = res.data
    return data
}