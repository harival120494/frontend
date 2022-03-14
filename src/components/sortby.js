import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

export default function SortBy(){
   
    return(
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, pt:2 }}>
            <Button sx={{ my: 1, mr:2, textTransform:'capitalize', fontFamily:'PoppinsBold', display: 'block', color:'#5e5e5e' }}>
                Urutkan :
            </Button>
            <Button className='sortby-btn active' variant={'contained'} sx={{ my: 1, mr:2, pt:1, pb:1, textTransform:'capitalize', fontFamily:'PoppinsRegular', display: 'block' }}>
                Terbaru
            </Button>
            <Button className='sortby-btn' variant={'contained'} sx={{ my: 1, mr:2, pt:1, pb:1, textTransform:'capitalize', fontFamily:'PoppinsRegular', display: 'block' }}>
                Urutkan A-Z
            </Button>
            <Button className='sortby-btn' variant={'contained'} sx={{ my: 1, mr:2, pt:1, pb:1, textTransform:'capitalize', fontFamily:'PoppinsRegular', display: 'block' }}>
                Urutkan Z-A
            </Button>
            <Button className='sortby-btn' variant={'contained'} sx={{ my: 1, mr:2, pt:1, pb:1, textTransform:'capitalize', fontFamily:'PoppinsRegular', display: 'block' }}>
                Urutkan Dari Paling Disukai
            </Button>
        </Box>
    )
}