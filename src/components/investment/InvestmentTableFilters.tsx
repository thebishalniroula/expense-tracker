import { FiltersType } from '~/pages/dashboard/income'
import { MouseEvent, useRef } from 'react'

type InvestmentTableFiltersProps = {
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}

const InvestmentTableFilters = ({ setFilters }: InvestmentTableFiltersProps) => {
  const dateFromRef = useRef<HTMLInputElement>(null)
  const dateToRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!dateFromRef.current || !dateToRef.current) return
    setFilters({
      date: {
        from: dateFromRef.current.value ? new Date(dateFromRef.current.value) : undefined,
        to: dateToRef.current.value ? new Date(dateToRef.current.value) : undefined,
      },
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
export default InvestmentTableFilters
