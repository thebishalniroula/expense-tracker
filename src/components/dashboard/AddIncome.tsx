import { useEffect, useRef, useState } from 'react'
import { Recurrance } from '~/server/db'
import { api } from '~/utils/api'
import { showFailureNotification, showSuccessNotification } from '~/utils/notify'

const AddIncome = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurrance, setRecurrance] = useState<Recurrance | null>()
  const formRef = useRef<HTMLFormElement>(null)
  const apiContext = api.useContext()
  const { mutate, isLoading } = api.income.create.useMutation({
    onSuccess: () => {
      apiContext.user.invalidate()
      showSuccessNotification('Income added successfully')
      formRef.current && formRef.current.reset()
    },
    onError: () => showFailureNotification('Income could not be added.'),
  })
  useEffect(() => {
    if (isRecurring === false) {
      setRecurrance(null)
    }
  }, [isRecurring])
  const handleSubmit = () => {
    mutate({ name, amount, date, isRecurring, recurrance })
  }

  return (
    <>
      <p className='Text'>Enter your income data.</p>
      <p>{recurrance}</p>
      <div className='w-full'>
        <form className='' ref={formRef}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm mb-2'>Name</label>
            <input
              className='Input w-full'
              id='name'
              type='text'
              placeholder='Salary from office'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm mb-2'>Amount (NRs)</label>
            <input
              className='Input w-full'
              id='amount'
              type='text'
              placeholder='30000'
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm mb-2'>Date</label>
            <input
              className='Input'
              id='date'
              type='date'
              defaultValue={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>
          <div className='mb-4 flex gap-2 items-center'>
            <label className='block text-gray-700 text-base mb-2'>Is this income recurring?</label>
            <input
              className='h-5 w-5'
              id='date'
              type='checkbox'
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
            />
          </div>
          {isRecurring && (
            <div className='mb-4'>
              <label className='block text-gray-700 text-base mb-2'>Recurrance</label>
              <select
                id='recurrance'
                className='block Input w-full'
                value={recurrance || ''}
                onChange={(e) => setRecurrance(e.target.value as Recurrance)}
              >
                <option value='Weekly'>Weekly</option>
                <option value='Monthly'>Monthly</option>
                <option value='Yearly'>Yearly</option>
              </select>
            </div>
          )}
          <div className='flex items-center justify-between'>
            <button
              disabled={isLoading}
              className='bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={handleSubmit}
            >
              {isLoading ? 'Submiting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
export default AddIncome
