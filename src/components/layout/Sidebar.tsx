import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '~/utils/cn'
import { api } from '~/utils/api'
import { signOut } from 'next-auth/react'

const Tabs = [
  {
    title: 'Dashboard',
    link: '/dashboard',
  },
  {
    title: 'Income',
    link: '/dashboard/income',
  },
  {
    title: 'Expense',
    link: '/dashboard/expense',
  },
  {
    title: 'Investment',
    link: '/dashboard/investment',
  },
]

function getCurrentTab(path: string) {
  const slugs = path.split('/')
  return slugs.at(-1)
}

const Sidebar = () => {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState(getCurrentTab(router.asPath))
  return (
    <div className='bg-purple-400 h-screen w-48 absolute left-0 top-0 bottom-0 py-5 px-5 flex flex-col gap-5'>
      <p className='text-2xl uppercase font-medium cursor-pointer tracking-wider text-slate-800 p-2'>
        Expense <span className='border-b'>Tracker</span>
      </p>
      {Tabs.map((tab, idx) => (
        <Link
          onClick={() => setCurrentTab(tab.title.toLowerCase())}
          href={tab.link}
          className={cn(
            'p-4 rounded-md cursor-pointer',
            tab.title.toLowerCase() === currentTab?.toLowerCase() ? 'bg-slate-300' : ''
          )}
          key={idx.toString() + tab.link}
        >
          {tab.title}
        </Link>
      ))}
      <Footer />
    </div>
  )
}

export default Sidebar

const Footer = () => {
  const { data: user } = api.user.me.useQuery()
  return (
    <div className='w-48 absolute bottom-0 left-0 flex flex-col items-center p-5 gap-3'>
      <p className='text-base'>{user?.email}</p>
      <button className='border border-slate-200 p-2 hover:bg-slate-400' onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  )
}
