import { Inter } from 'next/font/google'
import TicTacToe from './TicTacToe'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <TicTacToe/>

    </>

  )
}