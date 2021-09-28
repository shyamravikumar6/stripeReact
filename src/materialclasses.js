import { makeStyles } from '@material-ui/core/styles';
 export const style = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(1),
        margin:"1rem 0",
        width:"100%"
    },
    mainBox: {
        position: "relative",
        marginTop: "-8px",
        padding: "10px 20px",
        borderBottomRightRadius: "4px",
        borderBottomLeftRadius: "4px",
        background: theme.palette.background.default
    },
    stepper: {
        height: "calc(10vh - 40px)",
        minHeight: "55px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%"
    },
  
   
    smalltextfield:{
        
        margin:'1rem 0',
        
    },
    row:{
        display: "flex",
        justifyContent: "space-between",
    }

}));
