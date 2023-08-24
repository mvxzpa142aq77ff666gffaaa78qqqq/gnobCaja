import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box, Button, IconButton, Stack } from '@mui/material'
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import useSWR from "swr"
import SkeletonTable from '../../skelholder/skelethonTable';
import { NavLink } from 'react-router-dom';
import {GetDeCajaAMasterIdCaja } from './deCajaAMaster'
import AppContext from '../../../contexts/ServiceContext';
import { DataGridPro, GridToolbar, esES } from '@mui/x-data-grid-pro';

const VISIBLE_FIELDS = ['nameCaja', 'phoneCaja', 'quantSolde', 'quantSoldeCaja', 'nameMaster', 'phoneMaster', 'quantSoldeCount', 'fechaA', 'createdAt', 'Acciones'];

const columns1 = [
    {
        field: 'nameCaja',
        headerName: 'Nombre de la caja',
        width: 150,
        editable: false,
    },
    {
        field: 'phoneCaja',
        headerName: 'Telefono de la caja',
        type: 'phone',
        width: 110,
        editable: false,
    },
    {
        field: 'quantSolde',
        headerName: 'Cantidad',
        width: 140,
        editable: false,
    },
    {
        field: 'quantSoldeCaja',
        headerName: 'Cant.. exist.. caja',
        width: 160,
        editable: false,
    },
    {
        field: 'nameMaster',
        headerName: 'Master recargado',
        width: 140,
        editable: false,
    },
    {
        field: 'phoneMaster',
        headerName: 'Telefono master',
        width: 140,
        editable: false,
    },
    {
        field: 'quantSoldeCount',
        headerName: 'Cant.. exist.. master',
        width: 160,
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

export default function DataTableDeCajaAMaster() {

    const { userId, typeUser } = React.useContext(AppContext)

    const columns = React.useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["GetDeCajaAMasterId", userId], () => GetDeCajaAMasterIdCaja(userId), {})

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