import { Recurrance } from '~/server/db'
import { FiltersType } from '~/pages/dashboard/income'

type IncomeTableFiltersProps = {
  filters: FiltersType
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  setFiltersApplied: React.Dispatch<React.SetStateAction<boolean>>
}

const IncomeTableFilters = ({ filters, setFilters, setFiltersApplied }: IncomeTableFiltersProps) => {
  return (
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
          // value={recurrance || ''}
          onChange={(e) => {
            setFiltersApplied((prev) => false)
            setFilters((prev) => ({
              ...prev,
              recurrance: e.target.value === 'All' ? undefined : (e.target.value as Exclude<Recurrance, 'Daily'>),
            }))
          }}
        >
          <option value={undefined}>All</option>
          <option value='Weekly'>Weekly</option>
          <option value='Monthly'>Monthly</option>
          <option value='Yearly'>Yearly</option>
        </select>
      </div>{' '}
      <div className='my-5 self-end'>
        <button
          className='px-3 py-2 bg-purple-300 rounded-md cursor-pointer hover:bg-purple-500 hover:text-slate-50 active:bg-purple-700'
          onClick={() => setFiltersApplied(true)}
        >
          Apply
        </button>
      </div>
    </div>
  )
}
export default IncomeTableFilters
