import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CardActions, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useParams } from "react-router-dom";
import axios from 'axios'
import {HOST_API} from '../constant/index'
import Paper  from '@mui/material/Paper';
import Button from '@mui/material/Button'
import { AiOutlineArrowLeft } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const StepPage = (props) => {
    let params = useParams();
    
    const [data, setData] = React.useState({})
    const [mount, setMount] = React.useState(false)
    const [step, setStep] = React.useState([])

    React.useEffect(() => {
        // sort_by(props.receipes, props.field, props.category)
        getData()
    },[params])

    const getData = () => {
        axios.get(`${HOST_API}/recipes/${params.params}/steps`)
        .then((result) => {
            if(result.data.success){
                let temp = result.data.data
                setData(temp)
                setMount(true)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    
    const handleSelesai= (id, e) => {
        console.log(e)
        let temp = step
        temp.push(id)
        setStep(temp)
        e.target.outerHTML = `<span style=" border: solid thin green; padding-left: 2rem; padding-right: 2rem; padding-top: 0.5rem; padding-bottom: 0.5rem; border-radius: 5px; font-family: 'PoppinsBold';  color: green;">Selesai</span>`
    }
    
    return(
        <>
            {
                mount && (
                    <Container>
                        <Box sx={{pl:20, pr : 20}}>
                            <Paper sx={{p:3}}>
                                <Grid container>
                                    <Grid item xs={1} >
                                        <Button variant="outlined" style={{border: '1px solid rgb(64 64 64 / 50%)',  }}>
                                            <AiOutlineArrowLeft size={25} color='#444444'/>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={10} style={{paddingLeft:15}}>
                                        <Typography gutterBottom variant="h5" component="h5" style={{cursor:'pointer'}} style={{fontFamily:'PoppinsBold', color:'#7a7a7a', fontWeight:600,}}>
                                            Langkah Memasak
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{marginTop:'2rem'}}>
                                    {
                                        data.map((v, k) => {
                                            return(
                                                <Grid item xs={12}>
                                                    <Card data-cy={`item-step-${k}`}>
                                                        <CardContent>
                                                            <Typography gutterBottom variant="body1" component="div" color="text.secondary">
                                                                Step {v.stepOrder}
                                                            </Typography>
                                                            <Typography variant="p">
                                                                {v.description}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button variant={'contained'} color={'success'} style={{width:'30%'}} onClick={(e) => handleSelesai(v.stepOrder, e)}>Selesai</Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Paper>
                        </Box>
                    </Container>
                )
            }
        </>
    )
}

export default StepPage