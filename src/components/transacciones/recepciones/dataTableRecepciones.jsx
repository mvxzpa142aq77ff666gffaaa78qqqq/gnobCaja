import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box, Button, IconButton, Stack } from '@mui/material'
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import useSWR from "swr"
import SkeletonTable from '../../skelholder/skelethonTable';
import { NavLink } from 'react-router-dom';
import AppContext from '../../../contexts/ServiceContext';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { DataGridPro ,GridToolbar,esES,useGridApiRef,useKeepGroupedColumnsHidden} from '@mui/x-data-grid-pro';
import { GetRecepcionesCajaMaster } from './getRecepciones';



const VISIBLE_FIELDS = ['username', 'name', 'phone', 'typeUser', 'quantSolde', 'interesSocio', 'acciones','fechaA','createdAt', 'Acciones'];

const columns1 = [
    {
        field: 'username',
        headerName: 'Nombre de usuario',
        width: 130,
        editable: false,
    },
    {
        field: 'name',
        headerName: 'Nombre completo',
        width: 180,
        editable: false,
    },
    {
        field: 'phone',
        headerName: 'Telefono',
        type: 'phone',
        width: 100,
        editable: false,
    },
    {
        field: 'typeUser',
        headerName: 'Tipo de master',
        width: 140,
        editable: false,
    },

    {
        field: 'acciones',
        headerName: 'Acciones permitidas',
        width: 220,
        editable: false,
    },
    {
        field: 'quantSolde',
        headerName: 'Cantidad de saldo',
        width: 140,
        editable: false,
    },
    {
        field: 'interesSocio',
        headerName: 'Interes del master',
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

export default function DataTableRecepciones() {

    const { userId, typeUser } = React.useContext(AppContext)
    const apiRef = useGridApiRef();


    const columns = React.useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["obtenerRecepcionMaster", userId], () => GetRecepcionesCajaMaster(userId), {})

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

