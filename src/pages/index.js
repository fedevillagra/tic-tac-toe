import Image from 'next/image'
import { Inter } from 'next/font/google'
import Board from '@/components/Board'
import DragDrop from '@/components/DragDrop'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="game-container flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Tic Tac Toe</h1>
      <div className="game">
        <div className="game-board">
          <DragDrop/>
        </div>
      </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
  )
}