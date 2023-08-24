import axios from "axios"
import axiosConfigs from "../../../axiosConfig"



export const GetCajaMasterRecargas = async (id) => {
    const res = await axiosConfigs.get(`/obtener_recargas_por_id_caja/${id}`)
    const data = res.data.data.docs

    console.log(data,'ssss')
    return data
}