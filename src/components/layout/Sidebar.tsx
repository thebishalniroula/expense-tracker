import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '~/utils/cn'

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
    title: 'investments',
    link: '/dashboard/investment',
  },
]

const Sidebar = () => {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState(getCurrentTab(router.asPath))
  return (
    <div className='bg-purple-400 h-screen w-48 absolute left-0 top-0 bottom-0 py-10 px-5 flex flex-col gap-5'>
      <p className='text-2xl uppercase font-medium cursor-pointer'>
        Expense <span className=''>Tracker</span>
      </p>
      {Tabs.map((tab, idx) => (
        <Link
          onClick={() => setCurrentTab(tab.title.toLowerCase())}
          href={tab.link}
          className={cn(
            'p-4 rounded-md cursor-pointer',
            tab.title.toLowerCase() === currentTab?.toLowerCase() ? 'bg-slate-300' : ''
          )}
          key={idx + tab.link}
        >
          {tab.title}
        </Link>
      ))}
    </div>
  )
}

function getCurrentTab(path: string) {
  const slugs = path.split('/')
  return slugs.at(-1)
}

export default Sidebar
