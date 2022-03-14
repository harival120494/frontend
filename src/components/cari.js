import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Badge,  CircularProgress, Container } from '@mui/material';
import { BsEmojiHeartEyesFill, BsEmojiNeutralFill, BsEmojiFrownFill } from "react-icons/bs";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import {HOST_API} from '../constant/index'
import Paper  from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

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

const CariPage = (props) => {
    let params = useParams();
    let navigate = useNavigate();
    const classes = useStyles();
    const [data, setData] = React.useState({})
    const [mount, setMount] = React.useState(false)
    const [qty, setQty] = React.useState(1)

    React.useEffect(() => {
        // sort_by(props.receipes, props.field, props.category)
        getData()
    },[params])

    const getData = () => {
        axios.get(`${HOST_API}/recipes/${params.params}`)
        .then((result) => {
            if(result.data.success){
                let temp = result.data.data;
                console.log(temp)
                setData(temp)
                setMount(true)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const startMemasak = (id) => {
        navigate(`../step/${id}`)
    }
    
    return(
        <>
            {
                mount && (
                    <Paper>
                        <Box sx={{ height: '100%', flexGrow: 1, pb:20}}>
                            <Grid container>
                                <Grid lg={8} xs={12}  sx={{p:2}} container justifyContent="center" justify="center" >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Card style={{backgroundColor:'transparent', boxShadow:'none'}} container justifyContent="center">
                                                <CardMedia
                                                    component="img"
                                                    data-cy="content-logo"
                                                    alt="logo"
                                                    image={data.image}
                                                    data-cy="detail-image"
                                                />
                                            </Card>
                                        </Grid>
                                        <Box sx={{p:3}}>
                                            <Grid item xs={12}>
                                                <Typography gutterBottom data-cy="detail-tect-title" variant="h4" component="h4" style={{cursor:'pointer'}} style={{fontFamily:'PoppinsBold', color:'#686868'}}>
                                                    {data.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{marginTop:30}}>
                                                <Badge>
                                                    <BsEmojiHeartEyesFill data-cy="detail-like" color='green' style={{paddingTop:2.5}}/><span data-cy="detail-like-value">&nbsp;{data.nReactionLike}</span>
                                                </Badge> &nbsp; &nbsp;
                                                <Badge>
                                                    <BsEmojiNeutralFill data-cy="detail-neutral" color='yellow' style={{paddingTop:2.5}}/><span>&nbsp;{data.nReactionNeutral}</span>
                                                </Badge> &nbsp; &nbsp;
                                                <Badge>
                                                    <BsEmojiFrownFill data-cy="detail-dislike" color='#ef5734' style={{paddingTop:2.5}}/><span>&nbsp;{data.nReactionDislike}</span>
                                                </Badge>
                                            </Grid>
                                            <Grid item xs={12} style={{marginTop:40, marginBottom:30}}>
                                                <Typography data-cy="detail-text-ingredients"  gutterBottom variant="body1" component="p" style={{cursor:'pointer'}} style={{fontFamily:'PoppinsBold', color:'#686868', fontSize:20}}>
                                                    Bahan-bahan
                                                </Typography>
                                            </Grid>
                                            {
                                                data.ingredientsPerServing.map((v) => {
                                                    return(
                                                        <Grid item xs={12} data-cy="detail-text-recipe">
                                                            <span style={{fontFamily:'PoppinsBold', color:'#686868', fontSize:16}}>{Number(v.value) * qty}</span>&nbsp;
                                                            <span style={{fontFamily:'PoppinsBold', color:'#686868', fontSize:14}}>{v.unit}</span>  &nbsp;
                                                            <span style={{fontFamily:'PoppinsMedium', color:'#686868', fontSize:16}}>{v.item}</span> &nbsp;
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item lg={4} xs={12}>
                                    <Box sx={{ height: '100%'}} p={4} bgcolor={'white'} borderRadius={2} data-cy="form-portion">
                                        <h3 data-cy="form-text-title" data-cy="form-text-title-portion" style={{fontFamily:'PoppinsBold', fontSize:16, color:'#686868', marginBottom:'2rem'}}>Jumlah porsi yang dimasak</h3>
                                        <Grid container>
                                            <Grid item xs={2} >
                                                <Button color="secondary" size="small" onClick={() => setQty(qty === 1 ? 1 : qty - 1 )} data-cy="form-button-decrease-portion">
                                                   <AiFillMinusCircle size={45} color={'#ef5734'}  data-cy="akar-icons:circle-minus"/>
                                                </Button>
                                            </Grid>
                                            <Grid item xs={8} style={{paddingLeft:25, paddingRight:15, textAlign:'center'}} data-cy="form-input-portion">
                                                {/* <TextField variant="outlined" value={qty} type={'number'} fullWidth  style={{fontFamily:'PoppinsBold', textAlign:'center', fontSize:25, color:'#686868'}}/> */}
                                                <Typography  gutterBottom variant="h4" component="h4" style={{fontFamily:'PoppinsBold', color:'#686868'}} data-cy="form-value-portion">
                                                    {qty}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} >
                                                <Button color="secondary" size="small" onClick={() => setQty(qty + 1)} data-cy="form-button-increase-portion">
                                                    <AiFillPlusCircle size={45} color={'#ef5734'} data-cy="akar-icons:circle-plus-fill"/>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} lg={12} md={12} style={{marginTop:5}}>
                                            <Button data-cy="form-button-submit-portion" variant="contained" sx={{mt:5}} onClick={() => startMemasak(data.id)} size="large" className='login-button' data-cy="form-button-login" style={{backgroundColor : '#EF5734', width: '100%'}}>
                                                Mulai Memasak
                                            </Button>
                                        </Grid>
                                    </Box>
                                </Grid>                    
                            </Grid>
                        </Box>
                    </Paper>
                )
            }
        </>
    )
}

export default CariPage