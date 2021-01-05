import theme from 'mui/theme'
export const authTheme = {
  a: {
    color: theme.palette.primary.main
  },
  container: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    textAlign: 'left',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  formContainer: {
    textAlign: 'center'
  },
  formSection: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.shape.borderRadius}px`,
    textAlign: 'left'
  },
  sectionFooter: {
    linkColor: theme.palette.primary.main,
    fontSize: '20px'
  },
  button: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px`,
    fontFamily: theme.typography.fontFamily
  }
}