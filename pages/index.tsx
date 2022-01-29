import { GetStaticProps } from 'next'
import { useState } from 'react'
import { Button, Htag, Input, P, Rating, Tag, Textarea } from '../components'
import { withLayout } from '../layout/Layout'
import axios from 'axios'
import { MenuItem } from '../interfaces/menu.interface'
import { API } from '../helpers/api'

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4)
  return (
    <>
      <Htag tag="h1">Заголовок</Htag>
      <Button appearance="primary">Кнопка</Button>
      <Button appearance="ghost" arrow="right">
        Кнопка
      </Button>
      <P size="l">Большой</P>
      <P>Средний</P>
      <P size="s">Маленький</P>

      <Tag size="s">Ghost</Tag>
      <Tag size="m" color="red">
        Red
      </Tag>
      <Tag size="m" color="green">
        Green
      </Tag>
      <Rating isEditable rating={rating} setRating={setRating} />
      <Input placeholder="тест" />
      <Textarea placeholder="тест" />
    </>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  })
  return {
    props: {
      menu,
      firstCategory,
    },
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}
