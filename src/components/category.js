import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { HOST_API } from '../constant';
import axios from 'axios';

const Category = (props) => {
    const [categories, setCategory] = React.useState([])
    
    React.useEffect(() => {
        getCategory()
    }, [])

    const getCategory = () => {
        axios.get(`${HOST_API}/recipe-categories`, {})
        .then((result) => {
            if(result.data.success){
                setCategory(result.data.data)
            }
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                {categories.map((page, k) => (
                <Button
                    key={page.id}
                    data-cy={`header-button-${k+=1}`}
                    sx={{ my: 1, textTransform:'capitalize', fontFamily:'PoppinsRegular', display: 'block' }}
                    onClick={() => props.by_category(page.name)}
                >
                    {page.name}
                </Button>
                ))}
                <Button
                    key={'semua'}
                    sx={{ my: 1, textTransform:'capitalize', fontFamily:'PoppinsRegular', display: 'block' }}
                    onClick={() => props.by_category('semua')}
                    data-cy="header-button-0"
                >
                    Semua
                </Button>
        </Box>
    )
}
export default Category