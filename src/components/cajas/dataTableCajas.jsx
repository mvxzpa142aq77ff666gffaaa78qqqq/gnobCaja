import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import ModalAddCajas from './modalAddCaja';
import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'
import { GetTodasCajas, GetMasterCajas } from './getCajas';
import AppContext from '../../contexts/ServiceContext';
import { NavLink } from 'react-router-dom';
import ModalUpdateCajas from './modalUpdateCaja';
import SkeletonTable from '../skelholder/skelethonTable';


const VISIBLE_FIELDS = ['username', 'name', 'phone', 'typeUser', 'quantSolde', 'interesSocio', 'fechaA', 'createdAt', 'acciones', 'Acciones'];



const arrayMaster = ['Master_GNOB']

function DataTableCajas() {
    const { userId, typeUser, acciones } = useContext(AppContext)
    const apiRef = useGridApiRef();

    const [dataMaster, setDataMaster] = useState([])

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
                        {acciones.includes('editar_caja_master') ?
                            <ModalUpdateCajas dataUser={currentRow} />
                            :
                            <></>
                        }
                        <IconButton component={NavLink} to={`/caja_master_info/${id}`} variant="" color="primary" size="small">
                            <Visibility />
                        </IconButton>
                    </>
                );
            },
        },


    ];

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );


    if (arrayMaster.includes(typeUser)) {
        const { data, error, isLoading, } = useSWR(["obtenerCajas", userId], () => GetMasterCajas(userId), {})

        if (isLoading) return <SkeletonTable />
        if (error) return <></>
        return (
            <>
                {acciones.includes('crear_caja') ?
                    <ModalAddCajas />
                    :
                    <></>
                }
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
    } else {
        const { data, error, isLoading, } = useSWR("obtenerTodasCajas", () => GetTodasCajas(), {})

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


}

export default DataTableCajas