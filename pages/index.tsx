// import Head from 'next/head'
// import Image from 'next/image'
import { Button, Htag, P, Tag  } from '../components'

export default function Home(): JSX.Element {
  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary">Кнопка</Button>
      <Button appearance="ghost" arrow='right'>Кнопка</Button>
      <P size='l'>Большой</P>
      <P>Средний</P>
      <P size='s'>Маленький</P>
      
      <Tag size='s'>Ghost</Tag>
      <Tag size='m' color='red'>Red</Tag>
      <Tag size='m' color='green'>Green</Tag>
    </>
  )
}
