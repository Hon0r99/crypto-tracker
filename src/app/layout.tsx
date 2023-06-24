import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cryptocurrency Tracker',
  description: 'Stay on top of the cryptocurrency market with our intuitive tracker. Get real-time prices, track your favorite coins, and make informed investment decisions effortlessly.',
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout;