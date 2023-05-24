import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { cn } from '~/utils/cn'
import { showFailureNotification, showSuccessNotification } from '~/utils/notify'
import { NextPageWithSidebar } from '../_app'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SignUpPage: NextPageWithSidebar = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const handleSubmit = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const signInRes = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (signInRes?.error) {
      showFailureNotification(signInRes.error)
    }
    if (signInRes?.ok) {
      showSuccessNotification('Successfylly signed in.')
      setTimeout(() => {
        router.replace((router.query.callbackUrl as string) || '/dashboard')
      })
    }
    setIsLoading(false)
  }
  return (
    <div>
      <div className='flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900'>
            Sign in to expense trakcer
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12'>
            <form className='space-y-6'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                  Password
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='password'
                    required
                    className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='mt-6'>
                  <button
                    type='submit'
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={cn(
                      'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                      'bg-indigo-600 text-white hover:bg-indigo-500 ',
                      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-indigo-300'
                    )}
                  >
                    {!isLoading ? 'Log in' : 'Login in...'}
                  </button>
                </div>
                <p className='text-slate-700 my-4 text-center'>
                  Dont have an account?{' '}
                  <Link href='/signup' className='underline'>
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
SignUpPage.showSidebar = false
