import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material';
import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'

import AppContext from '../../../../contexts/ServiceContext';
import { DataGridPro ,GridToolbar,esES,useGridApiRef,useKeepGroupedColumnsHidden} from '@mui/x-data-grid-pro';
import SkeletonTable from '../../../skelholder/skelethonTable';
import { GetSaldoDeCajaAMaster } from './getSaldoDeCajaAMaster';



const VISIBLE_FIELDS = ['nameAdmin', 'phoneAdmin','typeUser', 'quantSolde', 'quantSoldeCount', 'nameConfSist','phoneConfSist','fechaA','createdAt', 'Acciones'];

const columns1 = [
    {
        field: 'nameAdmin',
        headerName: 'Usuario recargado',
        width: 150,
        editable: false,
    },
    {
        field: 'phoneAdmin',
        headerName: 'Telefono',
        type: 'phone',
        width: 110,
        editable: false,
    },
    {
        field: 'typeUser',
        headerName: 'Tipo o Role',
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
        field: 'quantSoldeCount',
        headerName: 'Cantidad existente',
        width: 140,
        editable: false,
    },
    {
        field: 'nameConfSist',
        headerName: 'Recargado por',
        width: 140,
        editable: false,
    },
    {
        field: 'phoneConfSist',
        headerName: 'Telefono Agente',
        width: 130,
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

function DataTableSaldoDeCajaAMaster({id}) {
    const { userId, typeUser } = useContext(AppContext)

    const [dataMaster, setDataMaster] = useState([])

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["obtenerRecompensasMaster", id], () =>  GetSaldoDeCajaAMaster(id), {})

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

export default DataTableSaldoDeCajaAMaster