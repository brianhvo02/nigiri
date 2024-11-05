import {
    MaterialReactTable,
    MRT_SortingState,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react';

const getDiffTime = function(updated: string) {
    const date = new Date(updated);
    const currentDate = new Date();

    const yearDiff = currentDate.getFullYear() - date.getFullYear();
    if (yearDiff)
        return `${yearDiff} year${yearDiff > 1 ? 's' : ''} ago`;

    const monthDiff = currentDate.getMonth() - date.getMonth();
    if (monthDiff)
        return `${monthDiff} month${monthDiff > 1 ? 's' : ''} ago`;

    const dayDiff = currentDate.getDate() - date.getDate();
    if (dayDiff)
        return `${dayDiff} day${dayDiff > 1 ? 's' : ''} ago`;

    const hourDiff = currentDate.getHours() - date.getHours();
    if (hourDiff)
        return `${hourDiff} hour${hourDiff > 1 ? 's' : ''} ago`;

    const minuteDiff = currentDate.getMinutes() - date.getMinutes();
    if (minuteDiff)
        return `${minuteDiff} minute${minuteDiff > 1 ? 's' : ''} ago`;

    const secondDiff = currentDate.getSeconds() - date.getSeconds();
    if (secondDiff)
        return `${secondDiff} second${secondDiff > 1 ? 's' : ''} ago`;

    const millisecondDiff = currentDate.getMilliseconds() - date.getMilliseconds();
    if (millisecondDiff)
        return `${millisecondDiff} millisecond${millisecondDiff > 1 ? 's' : ''} ago`;

    return 'Just now';
}

const columns: MRT_ColumnDef<SeadexEntry>[] = [ {
    accessorKey: 'aniListInfo.titleRomaji',
    header: 'Title',
    size: 300,
    grow: true,
}, {
    accessorKey: 'aniListInfo.format',
    header: 'Format',
    size: 100,
}, {
    accessorKey: 'aniListInfo.year',
    header: 'Year',
    size: 100,
}, {
    accessorKey: 'aniListInfo.episodes',
    header: 'Episodes',
    size: 100,
    enableSorting: false,
}, {
    accessorFn: ({ updated }) => getDiffTime(updated),
    id: 'updated',
    header: 'Updated',
    size: 150,
    enableSorting: false,
} ];

const Seadex = function() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<MRT_SortingState>([{
        id: 'updated',
        desc: true,
    }]);

    const { data: seadexData, isLoading } = useQuery({ 
        queryKey: ['seadexLatest', pagination], 
        queryFn: async function(): Promise<ListResult<SeadexEntry>> {
            const params = new URLSearchParams({
                al: '1',
                p: `${pagination.pageIndex + 1}`,
                count: `${pagination.pageSize}`,
            });
            return fetch('/api/seadex/latest?' + params).then(res => res.json());
        }
    });

    const table = useMaterialReactTable({ 
        columns, data: seadexData?.items ?? [],
        layoutMode: 'grid',
        muiTablePaperProps: {
            sx: { width: '100%' }
        },
        enableColumnResizing: true,
        
        onPaginationChange: setPagination,
        state: { pagination, sorting, isLoading },

        manualPagination: true,
        rowCount: seadexData?.totalItems,
        pageCount: seadexData?.totalPages,

        manualSorting: true,
        onSortingChange: setSorting,
    });

    return (
        <Box
        sx={(theme) => ({
          width: '100%',
          backgroundRepeat: 'no-repeat',
  
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(1, 100%, 67%), transparent)',
          ...theme.applyStyles('dark', {
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(1, 100%, 16%), transparent)',
          }),
        })}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
            <MaterialReactTable table={table} />
        </Container>
      </Box>
    );
}

export default Seadex;