import axios from "axios"
import axiosConfigs from "../../../axiosConfig"



export const GetSaldoDeCajaAMaster = async (id) => {
    const res = await axiosConfigs.get(`/obtener_de_caja_a_master_id_caja/${id}`)
    const data = res.data.data.docs

    //console.log(data,'ssss')
    return data
}