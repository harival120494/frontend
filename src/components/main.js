import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Badge,  CircularProgress, Container } from '@mui/material';
import { BsEmojiHeartEyesFill, BsEmojiNeutralFill, BsEmojiFrownFill } from "react-icons/bs";
import EmptyList from '../components/image/EmptyList.svg'
import moment from 'moment';

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

const MainComponent = (props) => {
    let navigate = useNavigate();
    const classes = useStyles();
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        sort_by(props.receipes, props.field, props.category)
    },[props.receipes])

    const sort_by = async(data, field, category) => {
        let tempreceipes = category !== 'semua' ? data.filter(v => v.recipeCategory.name === category) : data
        
        if(field === 'date'){
            setData([])
            setTimeout(() => {
                setData(tempreceipes.sort((a, b) => {
                    if (moment(a.createdAt).unix() > moment(b.createdAt).unix())
                    return -1;
                    if (moment(a.createdAt).unix() < moment(b.createdAt).unix())
                    return 1;
                    return 0;
                }))
            }, 100);
        }
        else if(field === 'a-z'){
            setData([])
            setTimeout(() => {
                setData(tempreceipes.sort((a, b) => {
                    if (a.name < b.name)
                    return -1;
                    if (a.name > b.name)
                    return 1;
                    return 0;
                }))
            }, 100);
        }
        else if(field === 'z-a'){
            setData([])
            setTimeout(() => {
                setData(tempreceipes.sort((a, b) => {
                    if (a.name > b.name)
                    return -1;
                    if (a.name < b.name)
                    return 1;
                    return 0;
                }))
            }, 100);
        }
        else if(field === 'like'){
            setData([])
            setTimeout(() => {
                setData(tempreceipes.sort((a, b) => {
                    if (a.nReactionLike > b.nReactionLike)
                    return -1;
                    if (a.nReactionLike < b.nReactionLike)
                    return 1;
                    return 0;
                }))
            }, 100);
        }
    }

    const detail = (id) => {
        navigate(`cari/${id}`)
    }

    return(
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, pt:2, flex:1, pb:10 }}>
                <Grid container spacing={3}>
                    {
                        props.mount ? (
                            data.length === 0 ? (
                                <Container container justify="center" sx={{mt:10, flexGrow:1, textAlign:'center'}}>
                                    <img src={EmptyList} className="App-logo" alt="Empty List" data-cy="list-image-empty"/>
                                   <p data-cy="list-text-empty"> Oops! Resep tidak ditemukan.</p>
                                </Container>
                            ):(
                                data.map((v,k) => {
                                    return (
                                        <Grid item xs={6} sm={3} key={v.id}>
                                            <Card className={classes.root} data-cy={`list-item-${k}`}>
                                                <CardMedia
                                                    component="img"
                                                    alt="Contemplative Reptile"
                                                    height="140"
                                                    image={v.image}
                                                    title="Contemplative Reptile"
                                                    />
                                                <CardContent>
                                                    <Typography onClick={() => detail(v.id)} gutterBottom variant="body1" component="p" style={{cursor:'pointer'}}>
                                                        {v.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                    {v.recipeCategory.name}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Badge>
                                                        <BsEmojiHeartEyesFill data-cy="list-item-like" color='green' style={{paddingTop:2.5}}/><span>&nbsp;{v.nReactionLike}</span>
                                                    </Badge>
                                                    <Badge>
                                                        <BsEmojiNeutralFill data-cy="list-item-neutral" color='yellow' style={{paddingTop:2.5}}/><span>&nbsp;{v.nReactionNeutral}</span>
                                                    </Badge>
                                                    <Badge>
                                                        <BsEmojiFrownFill data-cy="list-item-dislike" color='#ef5734' style={{paddingTop:2.5}}/><span>&nbsp;{v.nReactionDislike}</span>
                                                    </Badge>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                                })    
                            )
                            
                        ):(
                            <Container container  justify="center" sx={{mt:10, flexGrow:1, flex:1, textAlign:'center'}}>
                                <CircularProgress color="warning"/>
                            </Container>
                        )
                    }
                </Grid>
            </Box>
        </>
    )
}

export default MainComponent