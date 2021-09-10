import React from 'react'
import Layout, { ILayout } from './components/Layout'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: 'workflow-gui',
  productionPrefix: 'workflow-gui-prod',
})

var el = document.getElementsByTagName('html')[0]
console.log('el', el)

var style = window.getComputedStyle(el, null).getPropertyValue('font-size')
var fontSize = parseFloat(style)

console.log('FONT-SIZE:', fontSize)

const theme = createTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 16 * (fontSize / 16),
  },
})

const App = ({ props }: ILayout) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Layout props={props} />
        </ThemeProvider>
      </StylesProvider>
    </div>
  )
}

export default App
