import { Category, Recurrance } from '~/server/db'
import React, { useEffect, useState } from 'react'
import { api } from '~/utils/api'
import ExpenseTable from '~/components/expense/ExpenseTable'
import ExpenseTableFilters from '~/components/expense/ExpenseTableFilters'
import PieChart from '~/components/expense/PieChart'

export type FiltersType = {
  date?: {
    from?: Date
    to?: Date
  }
  recurrance?: Recurrance
  category?: Category
}

export default function Table() {
  const [searchString, setSearchString] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FiltersType>({})

  const { data: expense, isLoading, refetch } = api.expense.getAll.useQuery({ filters })

  useEffect(() => {
    refetch()
  }, [filters?.date?.from, filters?.date?.to, filters?.category, filters?.recurrance])

  if (!showFilters && isLoading) {
    return <div className='flex justify-center items-center h-screen text-xl'>Loading...</div>
  }
  if (!showFilters && !expense?.length) {
    return <div className='flex justify-center items-center h-screen text-xl'>No expense entries yet.</div>
  }

  const filteredLists = searchString
    ? expense?.filter((inc) => inc.name.toLowerCase().includes(searchString.toLowerCase()))
    : expense

  return (
    <div className='flex items-center gap-14'>
      <div className='flex flex-col'>
        <h1 className='px-3 text-2xl font-medium tracking-wide mb-5'>Expenses</h1>
        <div className='overflow-x-auto'>
          <div className='flex py-3 pl-2 gap-8'>
            <div className='relative max-w-xs'>
              <label htmlFor='hs-table-search' className='sr-only'>
                Search
              </label>
              <input
                type='text'
                name='hs-table-search'
                id='hs-table-search'
                className='block w-full p-3 pl-10 text-sm rounded-md focus:border-blue-500 focus:ring-blue-500 bg-gray-200 border-gray-700 text-gray-800 outline-none'
                placeholder='Search...'
                onChange={(e) => setSearchString(e.target.value)}
              />
              <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                <svg
                  className='h-3.5 w-3.5 text-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                </svg>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <div className='relative'>
                <button className='relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1'>
                  <span className='relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2'>
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-3 h-3'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                        />
                      </svg>
                    </div>
                    <div className='block' onClick={() => setShowFilters((prev) => !prev)}>
                      Filters
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
          {showFilters && <ExpenseTableFilters setFilters={setFilters} />}
          <div className='flex gap-20 mt-10'>
            <ExpenseTable filteredLists={filteredLists} />
            <div className='flex flex-col gap-4'>
              <PieChart />
              <h2 className='text-center text-xl tracking-wide font-medium capitalize'>Expenses per category</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
