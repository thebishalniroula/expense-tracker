import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import '~/styles/radix.css'

import { ToastContainer } from 'react-toastify'
import Sidebar from '~/components/layout/Sidebar'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  ChartJS.register(ArcElement, Tooltip, Legend)
  return (
    <SessionProvider session={session}>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Sidebar />
      <main className='ml-48 p-5 max-h-screen overflow-y-scroll'>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
export default api.withTRPC(MyApp)
