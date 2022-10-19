import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Grid } from '@material-ui/core/index';
import { AccountCircle } from '@material-ui/icons/index';
import { hcare } from '../../../declarations/hcare/index';
import { Fingerprint, VpnKey } from '../../../../node_modules/@material-ui/icons/index';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btns: {
        justifyContent: 'auto',
        alignItems: 'center',
        margin: '5vh 5vw'
    }
}));

function HForm() {

    const classes = useStyles();

    const defaultValues = {
        firstName: '',
        lastName: '',
        diseases: [],
        aadharNo: ''
    }

    const [values, setValues] = React.useState(defaultValues);

    const [patientId, setPatientId] = React.useState("");

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await hcare.create(values);
        setValues(defaultValues);
        alert("Patient data saved!!!")
    }

    const handleFetch = async (event) => {
        event.preventDefault();

        let patient = await hcare.read(parseInt(patientId));
        setValues({
            firstName: patient[0].firstName,
            lastName: patient[0].lastName,
            diseases: [],
            aadharNo: patient[0].aadharNo
        });
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        await hcare.update(parseInt(patientId), values);
        setValues(defaultValues);
        alert("data updated")
    }

    return (
        <div>
            <Grid container item className={classes.centerContent}>
                <form action="">
                    <div>
                        <div className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <VpnKey />
                                </Grid>
                                <Grid item>
                                    <TextField id="tf-id" 
                                        label="Id (to fetch data)" 
                                        onChange={(e) => {setPatientId(e.target.value)}} 
                                        value={patientId || ''} />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div>
                        <div className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <TextField id="tf-firstname" 
                                        label="First Name" 
                                        onChange={handleChange('firstName')} 
                                        value={values.firstName || ''}/>

                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div>
                        <div className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <TextField id="tf-lastname" 
                                        label="Last Name" 
                                        onChange={handleChange('lastName')} 
                                        value={values.lastName || ''}/>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div>
                        <div className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <Fingerprint />
                                </Grid>
                                <Grid item>
                                    <TextField id="tf-aadhar" label="Aadhar No." onChange={handleChange('aadharNo')} value={values.aadharNo}/>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </form>
            </Grid>
            <Grid container className={classes.centerContent}>
                <div>
                    <Button className={classes.btns} variant="contained" onClick={handleSubmit}>
                        Register Patient
                    </Button>
                    <Button className={classes.btns} variant="contained" onClick={handleFetch}>
                        Fetch
                    </Button>
                    <Button className={classes.btns} variant="contained" onClick={handleUpdate}>
                        Update
                    </Button>
                </div>
            </Grid>
        </div>
    );
}

export default HForm;