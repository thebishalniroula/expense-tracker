import { Category, Recurrance } from '~/server/db'
import { FiltersType } from '~/pages/dashboard/expense'
import { useRef, type MouseEventHandler, MouseEvent } from 'react'

type ExpenseTableFiltersProps = {
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}

const ExpenseTableFilters = ({ setFilters }: ExpenseTableFiltersProps) => {
  const dateFromRef = useRef<HTMLInputElement>(null)
  const dateToRef = useRef<HTMLInputElement>(null)
  const recurranceRef = useRef<HTMLSelectElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!dateFromRef.current || !dateToRef.current || !recurranceRef.current || !categoryRef.current) return
    setFilters({
      date: {
        from: dateFromRef.current.value ? new Date(dateFromRef.current.value) : undefined,
        to: dateToRef.current.value ? new Date(dateToRef.current.value) : undefined,
      },
      category: categoryRef.current.value === 'All' ? undefined : (categoryRef.current.value as Category),
      recurrance: recurranceRef.current.value === 'All' ? undefined : (recurranceRef.current.value as Recurrance),
    })
  }

  return (
    <div className='flex gap-8 items-center flex-wrap'>
      <div className='flex gap-5'>
        <div>
          <label className='pr-3'>From</label>
          <input ref={dateFromRef} className='Input' type='date' />
        </div>
        <div>
          <label className='pr-3'>To</label>
          <input ref={dateToRef} type='date' className='Input' />
        </div>
      </div>
      <div className='flex gap-5 items-center'>
        <label htmlFor=''>Recurrance</label>
        <select ref={recurranceRef} id='recurrance' className='block Input'>
          <option value={undefined}>All</option>
          <option value='Daily'>Daily</option>
          <option value='Weekly'>Weekly</option>
          <option value='Monthly'>Monthly</option>
          <option value='Yearly'>Yearly</option>
        </select>
      </div>
      <div className='flex gap-5 items-center'>
        <label htmlFor=''>Category</label>
        <select ref={categoryRef} id='category' className='block Input'>
          <option value={undefined}>All</option>
          <option value='Education'>Education</option>
          <option value='Health'>Health</option>
          <option value='Entertainment'>Entertainment</option>
          <option value='Food'>Food</option>
          <option value='Travel'>Travel</option>
          <option value='Other'>Other</option>
        </select>
      </div>{' '}
      <div className='my-5 self-end'>
        <button
          className='px-3 py-2 bg-purple-300 rounded-md cursor-pointer hover:bg-purple-500 hover:text-slate-50 active:bg-purple-700'
          onClick={handleSubmit}
        >
          Apply
        </button>
      </div>
    </div>
  )
}
export default ExpenseTableFilters
