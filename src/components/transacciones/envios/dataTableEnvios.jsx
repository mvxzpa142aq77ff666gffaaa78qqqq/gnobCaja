import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box, Button, IconButton, Stack } from '@mui/material'
import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import useSWR from "swr"
import SkeletonTable from '../../skelholder/skelethonTable';
import { NavLink } from 'react-router-dom';
import AppContext from '../../../contexts/ServiceContext';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { GetEnviosCajaMaster } from './getEnvios';
import FormUpdateEnvio from './formUpdateEnvio';
import FormDeleteEnvio from './formDeleteEnvio';

const VISIBLE_FIELDS = ['nameSend', 'phoneSend', 'adressAdmin', 'quantSend', 'interesSocio', 'interesGlobal', 'iva', 'nameRecep', 'phoneRecep', 'adressRecep', 'nameAdmin', 'phoneAdmin', 'fechaA', 'createdAt', 'acciones', 'Acciones'];

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
    {
        field: "Acciones",
        headerName: 'Acciones',
        width: 140,
        editable: false,
        renderCell: (params) => {
            const currentRow = params.row;
            const id = params.row._id;
            console.log(currentRow)



            return (
                <>
                    {true ?
                        <FormUpdateEnvio dataUser={currentRow} />
                        :
                        <></>
                    }
                    {true ?
                        <FormDeleteEnvio dataUser={currentRow} />
                        :
                        <></>
                    }
                </>
            );
        },
    },

];

const arrayMaster = ['Master_GNOB']

export default function dataTableEnvios() {

    const { userId, typeUser } = React.useContext(AppContext)
    const apiRef = useGridApiRef();

    const columns = React.useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["obtenerEnviosMaster", userId], () => GetEnviosCajaMaster(userId), {})

    if (isLoading) return <SkeletonTable />
    if (error) return <></>
    return (
        <>
            <p>Master</p>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGridPro
                    rows={data}
                    getRowId={(row) => row._id}
                    apiRef={apiRef}
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