import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
// import Container from '@material-ui/core/Container'
// import Box from '@material-ui/core/Box'
import theme from 'mui/theme'
// import AppBar from 'components/AppBar'
// import Footer from 'components/Footer'
import { createStore } from 'store'
// import AmplifyStyles from 'aws/Styles'
import Amplify, { Auth } from 'aws-amplify'
import config from 'src/aws-exports'
import '@aws-amplify/ui/dist/style.css'
Amplify.configure({
  config,
  ssr: true
})
Auth.configure(config)

const store = createStore()

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}))

const MyApp = ({ Component, pageProps }) => {
  const classes = useStyles()
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Next.js app bootstrapped with AWS Amplify + MUI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <AppBar />
          <div className={classes.offset} />
          <Container>
            <Box my={4}>
              <AmplifyStyles> */}
                <Component {...pageProps} />
              {/* </AmplifyStyles>
            </Box>
          </Container>
          <Footer /> */}
        </ThemeProvider>
      </Provider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default MyApp
