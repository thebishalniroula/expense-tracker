import { Recurrance } from '@prisma/client'
import { useRef, useState } from 'react'
import { api } from '~/utils/api'
import { showFailureNotification, showSuccessNotification } from '~/utils/notify'
type RoiRecuranceType = Exclude<Recurrance, 'Daily' | 'Weekly'>

const AddInvestment = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [roi, setRoi] = useState('')
  const [roiRecurrance, setRoiRecurrance] = useState<RoiRecuranceType>('Monthly')
  const [addToExpenses, setAddToExpenses] = useState(true)
  const formRef = useRef<HTMLFormElement>(null)
  const apiContext = api.useContext()
  const { mutate, isLoading } = api.investment.create.useMutation({
    onSuccess: () => {
      apiContext.user.invalidate()
      showSuccessNotification('Investment added successfully')
      formRef.current && formRef.current.reset()
    },
    onError: () => showFailureNotification('Investment could not be added.'),
  })

  const handleSubmit = () => {
    mutate({ name, amount, date, roi, roiRecurrance, addToExpenses })
  }

  return (
    <>
      <p className='Text'>Enter your investment data.</p>
      <div className='w-full'>
        <form className='' ref={formRef}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm mb-2'>Name</label>
            <input
              className='Input w-full'
              id='name'
              type='text'
              placeholder='Tesla stocks'
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
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm mb-2'>Avg. ROI (%)</label>
            <div className='Input flex'>
              <input className='h-full outline-none' id='roi' type='text' onChange={(e) => setRoi(e.target.value)} />
              <select
                id='recurrance'
                className='bg-transparent outline-none'
                onChange={(e) => setRoiRecurrance(e.target.value as RoiRecuranceType)}
              >
                <option value='Monthly'>Monthly</option>
                <option value='Yearly'>Yearly</option>
              </select>
            </div>
          </div>
          <div className='mb-4 flex gap-2 items-center'>
            <label className='block text-gray-700 text-base mb-2'>Add this amount to my expense.</label>
            <input
              className='h-5 w-5'
              id='date'
              type='checkbox'
              checked={addToExpenses}
              onChange={() => setAddToExpenses(!addToExpenses)}
            />
          </div>
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
export default AddInvestment
