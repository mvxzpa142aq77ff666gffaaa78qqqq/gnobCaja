import React, { useState, useContext } from 'react'
import MenuAppBars from '../../components/appBar/appBarr'
import { Grid, Tab, Tabs, Box, InputAdornment, TextField, Autocomplete, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { LoadingButton, TabContext, TabPanel } from '@mui/lab';
import Envios from '../../components/transacciones/envios/envios';
import Recepciones from '../../components/transacciones/recepciones/recepciones';
import AppContext from '../../contexts/ServiceContext';
import { useForm } from 'react-hook-form';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { jsPDF } from "jspdf";

import axiosConfigs from '../../components/axiosConfig';


function Recibir() {
    const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch, acciones } = useContext(AppContext)

    const [enviosBuscados, setEnviosBuscados] = useState([]);
    const [cargaEnvio, setCargaEnvio] = useState(false);
    const [load, setLoad] = useState(false);
    const [loadP, setLoadP] = useState(false);
    const [nameSend, setNameSend] = useState('');
    const [phoneSend, setPhoneSend] = useState('');
    const [quantSend, setQuantSend] = useState('');
    const [dipSend, setDipSend] = useState('');
    const [phoneRecep, setPhoneRecep] = useState('');
    const [adressRecep, setAdressRecep] = useState('');
    const [nameRecep, setNameRecep] = useState('');
    const [codigoVerif, setCodigoVerif] = useState('');
    const [dipRecep, setDipRecep] = useState('');
    const [formR, setFormR] = useState(false);
    const [idTransfert , setIdTransfert] = useState("")



    const doc = new jsPDF("p", "pt", "b6");

    const GenerarPdf = async () => {
        //console.log("first")
        var content = document.querySelector("#facturaSend")
        await doc.html(content, {
            callback: (pdf) => {
                pdf.save("factura.pdf")
            }
        });
    }

    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm();





    const onSubmit = async (data) => {

        data.idAdmin = userId
        data.userName = userName
        //data.id = dataUser._id

        if (userId && userName) {

            try {
                setLoad(true)
                const envio = await axiosConfigs({ url: `/verificarEnvio`, method: "post", data })

                if (envio.data.verificar && envio.data.data.docs[0]) {

                    setLoad(false)
                    setAdressRecep(envio.data.data.docs[0].adressRecep)
                    setNameSend(envio.data.data.docs[0].nameSend)
                    setPhoneSend(envio.data.data.docs[0].phoneSend)
                    setDipSend(envio.data.data.docs[0].dipSend)
                    setQuantSend(envio.data.data.docs[0].quantSend)
                    setPhoneRecep(envio.data.data.docs[0].phoneRecep)
                    setNameRecep(envio.data.data.docs[0].nameRecep)
                    setCodigoVerif(envio.data.data.docs[0].codeRecp)
                    setIdTransfert(envio.data.data.docs[0]._id)
                    setFormR(true)
                } else {
                    setFormR(false)
                    setLoad(false)
                    toast.error(`${envio.data.mens}`)
                }

            } catch (error) {
                console.log(error)
                setFormR(false)
                setLoad(false)
                toast.error(`Hay un problemaddd`)

            }

        } else {

        }


    }


    const Recibir = async () => {
        if (dipRecep) {
            try {
                setLoadP(true)
                const envio = await axiosConfigs({
                    url: `/recibir`, method: "post",
                    data: {
                        adressRecep,
                        nameRecep,
                        nameSend,
                        dipRecep,
                        dipSend,
                        quantRep:quantSend,
                        codeRecp:codigoVerif,
                        nameAdmin:userName,
                        phoneRecep,
                        phoneSend,
                        idTransfert,
                        idAdmin:userId,
                    }
                })
    
                if (envio.data.verificar) {
                    toast.success(`${envio.data.mens}`)
                    confirmAlert({
                        customUI: ({ onClose }) => {
                            return (

                                <div className='container-dialog-confirm' >
                                    <div id='facturaSend' style={{ marginLeft: 10, marginTop: 20 }} >
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>Lugar de envio:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{envio.data.result.adressAdmin}</span></p>
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>Tel.. del Agente:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{envio.data.result.phoneAdmin}</span></p>
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>Nombre del remitente:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{envio.data.result.nameSend}</span></p>
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>Tel. del remitente:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{envio.data.result.phoneSend}</span></p>
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>DIP/Pass del remitente:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{envio.data.result.dipSend}</span></p>
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>Cantidad enviado:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{Number(envio.data.result.quantSend).toLocaleString("es-GQ")} XAF</span></p>
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>Ciudad de recepcion:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{envio.data.result.adressRecep}</span></p>
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>Nombre del receptor:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{envio.data.result.nameRecep}</span></p>
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>Tel. del receptor:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{envio.data.result.phoneRecep}</span></p>
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>Codigo de recepcion:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{envio.data.result.codeRecp}</span></p>
                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 14, color: "#616161" }}>Fecha de envio:</span> <span style={{ fontWeight: "700", fontSize: 14 }}>{envio.data.result.createdAt}</span></p>
                                    </div>
                                    <div style={{ marginLeft: 10}} >

                                        <Button
                                            size='small'
                                            variant="contained"
                                            onClick={onClose}>Cerrar</Button>
                                        <Button
                                            size='small'
                                            variant="contained"
                                            sx={{ marginLeft: 3 }}
                                            onClick={async () => {
                                                GenerarPdf()
                                            }}
                                        >
                                            Descargar pdf
                                        </Button>
                                    </div>
                                </div>
                            );
                        },

                    });
                    setLoadP(false)
                    setAdressRecep('')
                    setNameSend('')
                    setPhoneSend('')
                    setDipSend('')
                    setQuantSend('')
                    setPhoneRecep('')
                    setNameRecep('')
                    setCodigoVerif('')
                    setDipRecep('')
                    setFormR(false)
                } else {
                    //setFormR(false)
                    setLoadP(false)
                    toast.error(`${envio.data.mens}`)
                }
    
            } catch (error) {
                console.log(error)
                //setFormR(false)
                setLoadP(false)
                toast.error(`Hay un problemaddd`)
    
            }
        } else {
            
        }

    }

    return (
        <MenuAppBars>

            {!formR ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        spacing={1}
                        bgcolor="backgroundColorPage"

                        container
                    >

                        <Grid item xs={12} sm={12} md={6} lg={12} xl={12}  >
                            <Box>
                                <Typography sx={{ color: "textColorTitle", textAlign: "center" }} variant='h5'>
                                    Recibir
                                </Typography>
                            </Box>

                            <div style={{ width: '100%', marginTop: 15 }}>
                                <TextField
                                    label="Telefono del remitente"
                                    id="outlined-size-small"
                                    size="medium"
                                    sx={{ width: "100%" }}
                                    {...register("phone", { required: "Campo requerido", minLength: 9, maxLength: 9 })}
                                    error={!!errors?.phone}


                                />
                            </div>
                            <div style={{ width: '100%', marginTop: 15 }}>
                                <TextField
                                    label="Codigo de verificacion"
                                    id="outlined-size-small"
                                    size="medium"
                                    sx={{ width: "100%" }}
                                    {...register("code", { required: "Campo requerido", minLength: 4 })}
                                    error={!!errors?.code}


                                />
                            </div>
                            <div style={{ width: '100%', marginTop: 15 }}>
                                <TextField
                                    label="El monto a enviar"
                                    id="outlined-size-small"
                                    size="medium"
                                    type='number'
                                    sx={{ width: "100%" }}
                                    {...register("monto", { required: "Campo requerido", minLength: 1, min: 1000 })}
                                    error={!!errors?.monto}


                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} >
                            <div style={{ width: '100%', marginTop: 20 }}>
                                <LoadingButton
                                    type='submit'
                                    loading={load}
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: "100%" }}
                                    size="large"
                                >
                                    <span>Proceder con el envio</span>
                                </LoadingButton>

                            </div>
                        </Grid>
                    </Grid>
                </form>
                :

                <form>

                    <Grid
                        spacing={1}
                        bgcolor="backgroundColorPage"

                        container
                    >

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}  >
                            <Box>
                                <Typography sx={{ color: "textColorTitle", textAlign: "center" }} variant='h5'>
                                    Datos del remitente
                                </Typography>
                            </Box>

                            <div style={{ width: '95%', marginTop: 15 }}>
                                <TextField
                                    label="Nombre del remitente"
                                    id="outlined-size-small-name-s"
                                    size="medium"
                                    sx={{ width: "100%" }}
                                    value={nameSend}




                                />
                            </div>
                            <div style={{ width: '95%', marginTop: 15 }}>
                                <TextField
                                    label="Telefono del remitente"
                                    id="outlined-size-small"
                                    size="medium"
                                    value={phoneSend}
                                    sx={{ width: "100%" }}



                                />
                            </div>
                            <div style={{ width: '95%', marginTop: 15 }}>
                                <TextField
                                    label="El DIP/Pasaporte del remitente"
                                    id="outlined-size-small"
                                    size="medium"
                                    value={dipSend}
                                    sx={{ width: "100%" }}


                                />
                            </div>
                            <div style={{ width: '95%', marginTop: 15 }}>
                                <TextField
                                    label="El monto a enviar"
                                    id="outlined-size-small"
                                    size="medium"
                                    value={quantSend}
                                    sx={{ width: "100%" }}



                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}  >
                            <Box>
                                <Typography sx={{ color: "textColorTitle", textAlign: "center" }} variant='h5'>
                                    Datos del beneficiario
                                </Typography>
                            </Box>
                            <div style={{ width: '95%', marginTop: 15 }}>
                                <TextField
                                    label="Nombre del beneficiario"
                                    id="outlined-size-small"
                                    value={nameRecep}
                                    size="medium"
                                    sx={{ width: "100%" }}



                                />
                            </div>
                            <div style={{ width: '95%', marginTop: 15 }}>
                                <TextField
                                    label="Telefono del beneficiario"
                                    id="outlined-size-small"
                                    size="medium"
                                    value={phoneRecep}
                                    sx={{ width: "100%" }}


                                />
                            </div>
                            <div style={{ width: '95%', marginTop: 15 }}>
                                <FormControl sx={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-label">Ciudad del remitente</InputLabel>
                                    <Select
                                        id="demo-simple-select-adress-r"
                                        label="Ciudad del beneficiario"
                                        value={adressRecep}
                                    >

                                        <MenuItem value="Malabo" >Malabo</MenuItem>
                                        <MenuItem value="Bata" >Bata</MenuItem>
                                        <MenuItem value="Mongomo" >Mongomo</MenuItem>
                                        <MenuItem value="Ebibeyin" >Ebibeyin</MenuItem>
                                        <MenuItem value="Annobon" >Annobon</MenuItem>
                                        <MenuItem value="Riaba" >Riaba</MenuItem>
                                        <MenuItem value="Luba" >Luba</MenuItem>
                                        <MenuItem value="Moka" >Moka</MenuItem>
                                        <MenuItem value="Mbini" >Mbini</MenuItem>
                                        <MenuItem value="Cogo" >Cogo</MenuItem>
                                        <MenuItem value="Niefang" >Niefang</MenuItem>
                                        <MenuItem value="Akurenam" >Akurenam</MenuItem>
                                        <MenuItem value="Evinayong" >Evinayong</MenuItem>


                                        <MenuItem value="Mongomeyeng" >Mongomeyeng</MenuItem>

                                        <MenuItem value="Micomiseng" >Micomiseng</MenuItem>
                                        <MenuItem value="Anisok" >Anisok</MenuItem>
                                        <MenuItem value="Oyala" >Oyala</MenuItem>
                                        <MenuItem value="Nsork" >Nsork</MenuItem>
                                        <MenuItem value="Akonibe" >Akonibe</MenuItem>
                                        <MenuItem value="Nsok-Nzomo" >Nsok-Nzomo</MenuItem>
                                        <MenuItem value="Nkue" >Nkue</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>

                            <div style={{ width: '95%', marginTop: 15 }}>
                                <TextField
                                    label="Codigo de verificacion"
                                    id="outlined-size-small"
                                    size="medium"
                                    value={codigoVerif}
                                    sx={{ width: "100%" }}


                                />
                            </div>

                            <div style={{ width: '95%', marginTop: 15 }}>
                                <TextField
                                    label="Dip/Pasaporte del beneficiario"
                                    id="outlined-size-small"
                                    size="medium"
                                    onChange={(e) => setDipRecep(e.target.value)}
                                    value={dipRecep}
                                    sx={{ width: "100%" }}


                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <div style={{ width: '100%', marginTop: 20 }}>
                                <LoadingButton
                                    onClick={() => Recibir()}
                                    loading={loadP}
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: "100%" }}
                                    size="large"
                                >
                                    <span>Proceder con el pago</span>
                                </LoadingButton>

                            </div>
                        </Grid>
                    </Grid>
                </form>


            }



        </MenuAppBars>
    )
}


export default Recibir