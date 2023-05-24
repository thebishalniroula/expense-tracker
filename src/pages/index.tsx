import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { NextPageWithSidebar } from './_app'

const Home: NextPageWithSidebar = () => {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name='description' content='A simple expense trackers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex min-h-screen items-center bg-gray-800 text-gray-200 flex-col'>
        <nav className='p-3'>
          <p className='text-lg'>
            Find source code on:
            <Link href={'https://github.com/thebishalniroula/expense-tracker'} className='text-xl underline'>
              {' '}
              Github
            </Link>
          </p>
        </nav>
        <div className='container mx-auto flex flex-col items-center px-4 py-16 text-center md:px-10 md:py-32 lg:px-32 xl:max-w-4xl'>
          <h1 className='text-4xl font-bold leading-none sm:text-5xl'>
            The only expense
            <span className='text-violet-400'> tracker </span>
            you will ever need
          </h1>
          <p className='mb-12 mt-8 px-8 text-lg'>
            Take control of your finances effortlessly with our intuitive expense tracker app. Gain valuable insights,
            track your spending, and achieve your financial goals with ease.
          </p>
          <div className='flex flex-wrap justify-center'>
            {status === 'authenticated' ? (
              <>
                <Link
                  href='/dashboard'
                  className='m-2 rounded px-8 py-3 text-lg font-semibold bg-violet-400 text-gray-900'
                >
                  Dashboard
                </Link>
                <Link
                  href='/api/auth/signout'
                  className='m-2 rounded border px-8 py-3 text-lg border-gray-700 text-gray-50'
                >
                  Signout
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/signup'
                  className='m-2 rounded px-8 py-3 text-lg font-semibold bg-violet-400 text-gray-900'
                >
                  Sign up
                </Link>
                <p
                  onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}
                  className='m-2 rounded border px-8 py-3 text-lg border-gray-700 cursor-pointer'
                >
                  Log in
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
Home.showSidebar = false
