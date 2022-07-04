import React, { createContext, useState } from 'react'
import { styled } from '@mui/material/styles';

import Footer from './footer'
import Navbar from './navbar'

type Props = {
  children: React.ReactElement,
  version?: string
}

const Main = styled('div')`
  min-height: 100vh;
`

export const LayoutBasicContext = createContext<{
  title: string,
  setTitle?: React.Dispatch<React.SetStateAction<string>>
}>({
  title: '',
});

const LayoutDefault = ({
  children,
  version,
}: Props) => {
  const [title, setTitle] = useState('')

  return (
    <LayoutBasicContext.Provider value={{ title, setTitle }}>
      <Navbar title={title} />
      <Main>
        {children}
      </Main>
      <Footer version={version} />
    </LayoutBasicContext.Provider>
  )
}

export default LayoutDefault