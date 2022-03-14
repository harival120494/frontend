import * as React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Paper  from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { InputLabel, TextField, FormHelperText } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { HOST_API } from '../../constant';
import axios from 'axios';
import '../../App.css'



const Login = () => {
    let navigate = useNavigate();
    const nav = React.useRef();
    const [navHeight, setNavHeight] = React.useState(0);
    const [isMobile, setMobile] = React.useState(false);
    const [email, setEmail] = React.useState(null)
    const [password, setPassword] = React.useState(null)
    const [emailErr, setEmailErr] = React.useState(null)
    const [passwordErr, setPasswordErr] = React.useState(null)
    const [statEmail, setStatEmail] = React.useState(null)
    const [statPassword, setStatPassword] = React.useState(null)
    const [isLoginDisabled, setLoginDisabled] = React.useState(true)
    const [validLogin, setValidLogin] = React.useState(null)

    React.useLayoutEffect(() => {
        nav.current && setNavHeight(nav.current.clientHeight);
    }, [isMobile]);

    const checkIsMobile = () => (window.innerWidth < 960 ? true : false);
    if (typeof window !== 'undefined') {
        window.onresize = () => isMobile !== checkIsMobile && setMobile(checkIsMobile);
    } 

    const handleEmail = (e) => {
        let isEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(e)
        if(e === ''){
            setStatEmail('false')
            setEmailErr('Email tidak boloh kosong')
            setLoginDisabled(true)
        }
        else{
            if(!isEmail){
                setStatEmail('false')
                setEmailErr('Format email tidak valid')
                setLoginDisabled(true)
            }
            else{
                setStatEmail('true')
                setEmail(e)
                if(statEmail === 'true' && statPassword === 'true') setLoginDisabled(false)
            }
        }
    }

    const handlePassword = (e) => {
        if(e === ''){
            setStatPassword('false')
            setPasswordErr('Password tidak boloh kosong')
            setLoginDisabled(true)
        }
        else{
            if(e.length < 6){
                setStatPassword('false')
                setPasswordErr('Password min 6 karakter')
                setLoginDisabled(true)
            }
            else{
                setStatPassword('true')
                setPassword(e)
                if(statEmail === 'true' && statPassword === 'true') setLoginDisabled(false)
            }
        }
    }
    const handleLogin = () => {
        const data_body = {
            username : email,
            password: password
        }
        axios.post(`${HOST_API}/auth/login`, data_body, {})
        .then((result) => {
            if(result.data.success){
                setValidLogin('true')
            }
            
        })
        .catch(error => {
            setValidLogin('false')
        })
    } 

    const handleLewati = () => {
        navigate('landing_page')
    }
    
    return (
        <>
            <AppBar position="fixed" ref={nav}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, pt:2, pb:4 }}
                    >
                        <img src={'./headerLogo.png'} className="App-logo" alt="logo"  data-cy="header-logo"/>
                    </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Paper maxWidth={false}  className='login-container' style={{ paddingTop: `${navHeight + (navHeight/1)}px`}}>
                <Box sx={{ height: '100%', flexGrow: 1, pb:20}}>
                    <Grid container>
                        <Grid lg={8} xs={12}  sx={{p:2}} container justifyContent="center" justify="center" >
                            <Card style={{backgroundColor:'transparent', boxShadow:'none'}} container justifyContent="center">
                                <CardMedia
                                    style={{marginTop:'20%', marginBottom:'15%'}}
                                    component="img"
                                    data-cy="content-logo"
                                    alt="logo"
                                    image="./content-logo.png"
                                />
                            </Card>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <Box sx={{ height: '100%'}} p={2} bgcolor={'white'} borderRadius={2}>
                                <h3 data-cy="form-text-title" style={{fontFamily:'PoppinsBold', fontSize:16, color:'#3D3D3D'}}>Login</h3>
                                {validLogin === 'false' && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="info"
                                        action={
                                            <Button color="inherit" size="small" onClick={() => setValidLogin('')}>
                                            OK
                                            </Button>
                                        }>Username/ Password salah</Alert>
                                    </Stack>
                                )}
                                <FormGroup style={{marginTop:'3rem'}}>
                                    <InputLabel data-cy="form-text-email" style={{color:'#3D3D3D', fontSize:16}}>Email</InputLabel>
                                    <TextField id="email" label="Email" type={'email'} variant="outlined" data-cy="form-input-email" style={{color:'#3D3D3D'}} fullWidth sx={{mt:2}} onChange={(e) => handleEmail(e.target.value)} onBlur={(e) => handleEmail(e.target.value)}/>
                                    <FormHelperText error>{statEmail === 'false' ? emailErr : ''}</FormHelperText>
                                </FormGroup>
                                <FormGroup style={{marginTop:20}}>
                                    <InputLabel data-cy="form-text-password" style={{color:'#3D3D3D', fontSize:16}}>Password</InputLabel>
                                    <TextField id="password" label="Password" type={'password'} data-cy="form-input-password" style={{fontSize:20, color:'#3D3D3D'}} variant="outlined" fullWidth sx={{mt:2}} security={true} onChange={(e) => handlePassword(e.target.value)} onBlur={(e) => handlePassword(e.target.value)}/>
                                    <FormHelperText error>{statPassword === 'false' ? passwordErr : ''}</FormHelperText>
                                </FormGroup>
                                <FormGroup>
                                    <Button variant="contained" sx={{mt:8}} size="large" className='login-button' data-cy="form-button-login" onClick={() => handleLogin()} disabled={isLoginDisabled} style={{backgroundColor : isLoginDisabled ? '#d1cdcc' :'#EF5734'}}>
                                        Login
                                    </Button>
                                </FormGroup>
                                <FormGroup>
                                    <Button variant="text" sx={{mt:3}} size="large" color='warning' data-cy="form-button-skip" style={{textTransform:'capitalize', fontFamily:'PoppinsBold', fontSize:16}} onClick={() => handleLewati()}>
                                        Lewati Login
                                    </Button>
                                </FormGroup>
                            </Box>
                        </Grid>                    
                    </Grid>
                </Box>
            </Paper>
        </>
    );
};
export default Login;