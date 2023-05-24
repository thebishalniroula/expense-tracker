import { Recurrance } from '~/server/db'
import { FiltersType } from '~/pages/dashboard/income'
import { MouseEvent, useRef } from 'react'

type IncomeTableFiltersProps = {
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}

const IncomeTableFilters = ({ setFilters }: IncomeTableFiltersProps) => {
  const dateFromRef = useRef<HTMLInputElement>(null)
  const dateToRef = useRef<HTMLInputElement>(null)
  const recurranceRef = useRef<HTMLSelectElement>(null)

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!dateFromRef.current || !dateToRef.current || !recurranceRef.current) return
    setFilters({
      date: {
        from: dateFromRef.current.value ? new Date(dateFromRef.current.value) : undefined,
        to: dateToRef.current.value ? new Date(dateToRef.current.value) : undefined,
      },
      recurrance:
        recurranceRef.current.value === 'All'
          ? undefined
          : (recurranceRef.current.value as Exclude<Recurrance, 'Daily'>),
    })
  }
  return (
    <div className='flex gap-8 items-center flex-wrap'>
      <div className='flex gap-5'>
        <div>
          <label className='pr-3'>From</label>
          <input className='Input' type='date' ref={dateFromRef} />
        </div>
        <div>
          <label className='pr-3'>To</label>
          <input type='date' className='Input' ref={dateToRef} />
        </div>
      </div>
      <div className='flex gap-5 items-center'>
        <label htmlFor=''>Recurrance</label>
        <select id='recurrance' className='block Input' ref={recurranceRef}>
          <option value={undefined}>All</option>
          <option value='Weekly'>Weekly</option>
          <option value='Monthly'>Monthly</option>
          <option value='Yearly'>Yearly</option>
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
export default IncomeTableFilters
