import { createMuiTheme } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100vh'
        },
        body: {
          height: '100%'
        }
      }
    },
    MuiContainer: {
      root: {
        height: 'calc(100% - 4rem)'
      }
    }
  }
});

export const useStyles = makeStyles((appTheme: Theme) =>
  createStyles({
    paper: {
      [appTheme.breakpoints.down('xs')]: {
        width: '100vw'
      },
      [appTheme.breakpoints.up('sm')]: {
        width: '50%'
      },
      [appTheme.breakpoints.up('md')]: {
        width: '33%'
      }
    },
    box: {
      [appTheme.breakpoints.up('sm')]: {
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      },
      [appTheme.breakpoints.up('md')]: {
        paddingLeft: '2rem',
        paddingRight: '2rem'
      },
      [appTheme.breakpoints.up('lg')]: {
        paddingLeft: '5rem',
        paddingRight: '5rem'
      },
      [appTheme.breakpoints.up('xl')]: {
        padding: '0px'
      }
    },
    appBar: {
      backgroundColor: '#FAFAFA',
      [appTheme.breakpoints.down('xs')]: {
        paddingLeft: '1rem',
        paddingRight: '1rem'
      },
      [appTheme.breakpoints.up('sm')]: {
        paddingLeft: '3rem',
        paddingRight: '3rem'
      },
      [appTheme.breakpoints.up('md')]: {
        paddingLeft: '3.5rem',
        paddingRight: '3.5rem'
      },
      [appTheme.breakpoints.up('lg')]: {
        paddingLeft: '6.5rem',
        paddingRight: '6.5rem'
      },
      [appTheme.breakpoints.up('xl')]: {
        maxWidth: 'calc(1920px - 1.5rem)',
        padding: '0px',
        right: '50%',
        marginRight: '-960px'
      }
    },
    icon: {
      marginRight: '0.5rem'
    }
  })
);
