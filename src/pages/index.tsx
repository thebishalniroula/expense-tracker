import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name='description' content='A simple expense trackers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex min-h-screen items-center dark:bg-gray-800 dark:text-gray-100 flex-col'>
        <Nav />
        <div className='container mx-auto flex flex-col items-center px-4 py-16 text-center md:px-10 md:py-32 lg:px-32 xl:max-w-4xl'>
          <h1 className='text-4xl font-bold leading-none sm:text-5xl'>
            The only AI powered feedback collection
            <span className='dark:text-violet-400'> system </span>
            you will ever need
          </h1>
          <p className='mb-12 mt-8 px-8 text-lg'>
            Accelerate Growth and Improve Customer Experience with AI-Driven Feedback Collection
          </p>
          <div className='flex flex-wrap justify-center'>
            {status === 'authenticated' ? (
              <>
                <Link
                  href='/dashboard'
                  className='m-2 rounded px-8 py-3 text-lg font-semibold dark:bg-violet-400 dark:text-gray-900'
                >
                  Dashboard
                </Link>
                <Link
                  href='/api/auth/signout'
                  className='m-2 rounded border px-8 py-3 text-lg dark:border-gray-700 dark:text-gray-50'
                >
                  Signout
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/signup'
                  className='m-2 rounded px-8 py-3 text-lg font-semibold dark:bg-violet-400 dark:text-gray-900'
                >
                  Sign up
                </Link>
                <Link
                  href='api/auth/signin'
                  className='m-2 rounded border px-8 py-3 text-lg dark:border-gray-700 dark:text-gray-50'
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
const Nav = () => (
  <nav className='bg-gray-800 w-full'>
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      <div className='relative flex h-16 items-center justify-between'>
        <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
            aria-controls='mobile-menu'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>

            <svg
              className='block h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>

            <svg
              className='hidden h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
          <div className='flex flex-shrink-0 items-center'>
            <img
              className='block h-8 w-auto lg:hidden'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
              alt='Your Company'
            />
            <img
              className='hidden h-8 w-auto lg:block'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
              alt='Your Company'
            />
          </div>
          <div className='hidden sm:ml-6 sm:block'>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                aria-current='page'
              >
                Dashboard
              </a>
              <a
                href='#'
                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
              >
                Team
              </a>
              <a
                href='#'
                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
              >
                Projects
              </a>
              <a
                href='#'
                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
              >
                Calendar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='sm:hidden' id='mobile-menu'>
      <div className='space-y-1 px-2 pb-3 pt-2'>
        <a
          href='#'
          className='bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
          aria-current='page'
        >
          Dashboard
        </a>
        <a
          href='#'
          className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
        >
          Team
        </a>
        <a
          href='#'
          className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
        >
          Projects
        </a>
        <a
          href='#'
          className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
        >
          Calendar
        </a>
      </div>
    </div>
  </nav>
)
