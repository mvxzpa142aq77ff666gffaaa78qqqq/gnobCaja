import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material';
import { DataGridPro ,GridToolbar,esES,useGridApiRef,useKeepGroupedColumnsHidden} from '@mui/x-data-grid-pro';

import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'

import AppContext from '../../../../contexts/ServiceContext';
import SkeletonTable from '../../../skelholder/skelethonTable';
import { GetEnviosCajaMaster } from './getEnviosCajaMaster';


const VISIBLE_FIELDS = ['nameSend', 'phoneSend', 'adressAdmin', 'quantSend', 'interesSocio', 'interesGlobal', 'iva', 'nameRecep', 'phoneRecep','adressRecep','nameAdmin','phoneAdmin','fechaA','createdAt', 'acciones', 'Acciones'];

const columns1 = [
    {
        field: 'nameSend',
        headerName: 'Nombre del remitente',
        width: 130,
        editable: false,
    },
    {
        field: 'phoneSend',
        headerName: 'Telefono del remitente',
        width: 180,
        editable: false,
    },
    {
        field: 'adressAdmin',
        headerName: 'Enviado en',
        width: 140,
        editable: false,
    },
    {
        field: 'quantSend',
        headerName: 'Cantidad enviado',
        type: 'phone',
        width: 100,
        editable: false,
    },
    {
        field: 'interesSocio',
        headerName: 'Interes del socio',
        width: 140,
        editable: false,
    },
    {
        field: 'interesGlobal',
        headerName: 'Interes de GNOB',
        width: 140,
        editable: false,
    },
    {
        field: 'iva',
        headerName: 'Iva',
        width: 140,
        editable: false,
    },
    {
        field: 'nameRecep',
        headerName: 'Nombre del receptor',
        width: 140,
        editable: false,
    },

    {
        field: 'phoneRecep',
        headerName: 'Telefono del receptor',
        width: 220,
        editable: false,
    },
    {
        field: 'adressRecep',
        headerName: 'Ciudad de recepcion',
        width: 140,
        editable: false,
    },
    {
        field: 'nameAdmin',
        headerName: 'Nombre de la caja',
        width: 140,
        editable: false,
    },
    {
        field: 'phoneAdmin',
        headerName: 'Telefono de la caja',
        width: 140,
        editable: false,
    },
    {
        field: 'fechaA',
        headerName: 'Desde',
        type: "date",
        width: 140,
        editable: false,
        valueGetter: (params) => new Date(params.row.fechaA)

    },
    {
        field: 'createdAt',
        headerName: 'Hasta',
        type: "date",
        width: 140,
        editable: false,
        valueGetter: (params) => new Date(params.row.createdAt)

    },


];

const arrayMaster = ['Master_GNOB']

function DataTableEnviosCajaMaster({id}) {
    const { userId, typeUser } = useContext(AppContext)

    const [dataMaster, setDataMaster] = useState([])

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["obtenerEnviosDeCajaMaster", id], () => GetEnviosCajaMaster(id), {})

    if (isLoading) return <SkeletonTable />
    if (error) return <></>
    return (
        <>
           
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGridPro
                    rows={data}
                    getRowId={(row) => row._id}
                    //disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    disableRowSelectionOnClick
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                />
            </Box>
        </>
    )





}

export default DataTableEnviosCajaMaster