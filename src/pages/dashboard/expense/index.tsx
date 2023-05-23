import { Category, Recurrance } from '~/server/db'
import React, { useState } from 'react'
import { api } from '~/utils/api'
import IncomeTable from '~/components/income/IncomeTable'

type FiltersType = {
  date?: {
    from?: Date
    to?: Date
  }
  recurrance?: Recurrance
  category?: Category
}

const defaultFilters: FiltersType = {
  date: { from: new Date(new Date().setDate(1)), to: new Date() },
}

export default function Table() {
  const [searchString, setSearchString] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filtersApplied, setFiltersApplied] = useState(false)
  const [filters, setFilters] = useState<FiltersType>(defaultFilters)
  const { data: income, isLoading } = api.expense.getAll.useQuery({ filters: filtersApplied ? filters : undefined })

  if (!filtersApplied && isLoading) {
    return <div className='flex justify-center items-center h-screen text-xl'>Loading...</div>
  }
  if (!filtersApplied && !income?.length) {
    return <div className='flex justify-center items-center h-screen text-xl'>No expense entries yet.</div>
  }
  const filteredLists = searchString
    ? income?.filter((inc) => inc.name.toLowerCase().includes(searchString.toLowerCase()))
    : income
  return (
    <div className='flex flex-col'>
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
                  <div className='hidden sm:block' onClick={() => setShowFilters((prev) => !prev)}>
                    Filters
                  </div>
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* --------Filters start----------*/}
        {showFilters && (
          <div className='flex gap-8 items-center flex-wrap'>
            <div className='flex gap-5'>
              <div>
                <label className='pr-3'>From</label>
                <input
                  className='Input'
                  type='date'
                  onChange={(e) => {
                    setFiltersApplied((prev) => false)
                    setFilters((prev) => ({ ...prev, date: { ...prev.date, from: new Date(e.target.value) } }))
                  }}
                  defaultValue={filters.date?.from?.toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className='pr-3'>To</label>
                <input
                  type='date'
                  className='Input'
                  defaultValue={filters.date?.to?.toISOString().split('T')[0]}
                  onChange={(e) => {
                    setFiltersApplied((prev) => false)
                    setFilters((prev) => ({ ...prev, date: { ...prev.date, to: new Date(e.target.value) } }))
                  }}
                />
              </div>
            </div>
            <div className='flex gap-5 items-center'>
              <label htmlFor=''>Recurrance</label>
              <select
                id='recurrance'
                className='block Input'
                onChange={(e) => {
                  setFiltersApplied((prev) => false)
                  setFilters((prev) => ({
                    ...prev,
                    recurrance: e.target.value === 'All' ? undefined : (e.target.value as Recurrance),
                  }))
                }}
              >
                <option value={undefined}>All</option>
                <option value='Daily'>Daily</option>
                <option value='Weekly'>Weekly</option>
                <option value='Monthly'>Monthly</option>
                <option value='Yearly'>Yearly</option>
              </select>
            </div>
            <div className='flex gap-5 items-center'>
              <label htmlFor=''>Category</label>
              <select
                id='category'
                className='block Input'
                onChange={(e) => {
                  setFiltersApplied((prev) => false)
                  setFilters((prev) => ({
                    ...prev,
                    category: e.target.value === 'All' ? undefined : (e.target.value as Category),
                  }))
                }}
              >
                <option value={undefined}>All</option>
                <option value='Education'>Education</option>
                <option value='Health'>Health</option>
                <option value='Entertainment'>Entertainment</option>
                <option value='Food'>Food</option>
                <option value='Travel'>Travel</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div className='my-5 self-end'>
              <button
                className='px-3 py-2 bg-purple-300 rounded-md cursor-pointer hover:bg-purple-500 hover:text-slate-50 active:bg-purple-700'
                onClick={() => setFiltersApplied(true)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
        {/* ------------Filters end--------- */}
        <IncomeTable filteredLists={filteredLists} />
      </div>
    </div>
  )
}
