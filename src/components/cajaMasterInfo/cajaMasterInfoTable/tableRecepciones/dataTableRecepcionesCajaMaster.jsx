import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material';
import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'

import AppContext from '../../../../contexts/ServiceContext';
import { DataGridPro ,GridToolbar,esES,useGridApiRef,useKeepGroupedColumnsHidden} from '@mui/x-data-grid-pro';
import { GetRecepcionesCajaMaster } from './getRecepcionesDeUnCajaMaster';
import SkeletonTable from '../../../skelholder/skelethonTable';


const VISIBLE_FIELDS = ['username', 'name', 'phone', 'typeUser', 'quantSolde', 'interesSocio', 'acciones','fechaA','createdAt', 'Acciones'];

const columns1 = [
    {
        field: 'username',
        headerName: 'Nombre de usuario',
        width: 150,
        editable: false,
    },
    {
        field: 'name',
        headerName: 'Nombre completo',
        width: 150,
        editable: false,
    },
    {
        field: 'phone',
        headerName: 'Telefono',
        type: 'phone',
        width: 110,
        editable: false,
    },
    {
        field: 'acciones',
        headerName: 'Acciones permitidas',
        width: 110,
        editable: false,
    },
    {
        field: 'quantSolde',
        headerName: 'Cantidad de saldo',
        width: 110,
        editable: false,
    },
    {
        field: 'interesSocio',
        headerName: 'Interes del master',
        width: 110,
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

function DataTableRecepcionesCajaMaster() {
    const { userId, typeUser } = useContext(AppContext)

    const [dataMaster, setDataMaster] = useState([])

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["obtenerRecepcionesCajaMaster", userId], () => GetRecepcionesCajaMaster(userId), {})

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

export default DataTableRecepcionesCajaMaster

