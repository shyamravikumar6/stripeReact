import { green, grey, red, yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { dark } from '@material-ui/core/styles/createPalette';
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
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "space-around",
        
    },
    textfield: {
        marginTop: "1rem",
        marginBottom: "1rem",
    },
   
    smalltextfield:{
        
        margin:'1rem 0',
        
    },
    textStatus:{
   margin:'auto'
    },
    radioField:{
       borderRadius:'5px', 
      '&:hover':{
          borderColor:dark[500]
      }
    },

    row:{
        display: "flex",
        justifyContent: "space-between",
    },
    formControl: {
        display: 'flex',
        flexBasis: '100%',
        alignItems: 'stretch',
        margin: theme.spacing.unit * 3 / 2
      },
      formGroup: {
        alignItems: 'stretch',
        justifyContent: 'space-around',
        flexWrap: 'nowrap'
      },
      radioFlex: {
        flex: '1 1 auto',
        margin: '0 5px'
      },
      greenButtonRoot: {
        backgroundColor: '#00000004',
        borderRadius: 5,
        border: '1px solid',
        color: green.A700,
        fontFamily: 'monospace',
        fontSize: '180%',
        height: 32,
        '&$checked': {
          backgroundColor: green.A700,
          color: 'white'
        },
        '&:not($checked):hover': {
          backgroundColor: green['50']
        },
        transition: 'background-color 250ms'
      },
      yellowButtonRoot: {
        backgroundColor: '#00000004',
        borderRadius: 5,
        border: '1px solid',
        color: yellow['700'],
        fontFamily: 'monospace',
        fontSize: '200%',
        height: 32,
        '&$checked': {
          backgroundColor: yellow.A700,
          color: 'white'
        },
        '&:not($checked):hover': {
          backgroundColor: yellow['100']
        },
        transition: 'background-color 250ms'
      },
      redButtonRoot: {
        backgroundColor: '#00000004',
        borderRadius: 5,
        border: '1px solid',
        color: red.A700,
        fontFamily: 'monospace',
        fontSize: '160%',
        height: 32,
        '&$checked': {
          backgroundColor: red.A700,
          color: 'white'
        },
        '&:not($checked):hover': {
          backgroundColor: red['50']
        },
        transition: 'background-color 250ms'
      },
      greyButtonRoot: {
        backgroundColor: '#00000004',
        borderRadius: 5,
        border: '1px solid',
        color: grey['700'],
        fontFamily: 'monospace',
        fontSize: '180%',
        height: 32,
        '&$checked': {
          backgroundColor: grey['700'],
          color: 'white'
        },
        '&:not($checked):hover': {
          backgroundColor: grey['200']
        },
        transition: 'background-color 250ms'
      },
      disabled: {
        backgroundColor: '#00000004'
      },
      checked: {}

}));
