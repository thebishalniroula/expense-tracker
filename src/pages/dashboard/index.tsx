import React, { useEffect, useRef, useState } from 'react'
import { api } from '~/utils/api'

const Dashboard = () => {
  return (
    <div className='flex p-4 justify-between '>
      <TabsDemo />
      <div>Dashboard</div>
    </div>
  )
}

export default Dashboard
import * as Tabs from '@radix-ui/react-tabs'

const TabsDemo = () => (
  <Tabs.Root className='TabsRoot' defaultValue='tab1'>
    <Tabs.List className='TabsList' aria-label='Manage your account'>
      <Tabs.Trigger className='TabsTrigger' value='tab1'>
        Income
      </Tabs.Trigger>
      <Tabs.Trigger className='TabsTrigger' value='tab2'>
        Expense
      </Tabs.Trigger>
      <Tabs.Trigger className='TabsTrigger' value='tab3'>
        Investment
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content className='TabsContent' value='tab1'>
      <AddIncome />
    </Tabs.Content>
    <Tabs.Content className='TabsContent' value='tab2'>
      <AddExpense />
    </Tabs.Content>
    <Tabs.Content className='TabsContent' value='tab3'>
      <AddInvestment />
    </Tabs.Content>
  </Tabs.Root>
)

import { Category, Recurrance } from '~/server/db'
import { showFailureNotification, showSuccessNotification } from '~/utils/notify'

const AddIncome = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurrance, setRecurrance] = useState<Recurrance | null>()
  const formRef = useRef<HTMLFormElement>()
  const { mutate, isLoading } = api.income.create.useMutation({
    onSuccess: () => {
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
                value={recurrance}
                onChange={(e) => setRecurrance(e.target.value)}
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
const AddExpense = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurrance, setRecurrance] = useState<Recurrance | null>()
  const [category, setCategory] = useState<Category>('Health')
  const formRef = useRef<HTMLFormElement>()
  const { mutate, isLoading } = api.expense.create.useMutation({
    onSuccess: () => {
      showSuccessNotification('Expense added successfully')
      formRef.current && formRef.current.reset()
    },
    onError: () => showFailureNotification('Expense could not be added.'),
  })
  useEffect(() => {
    if (isRecurring === false) {
      setRecurrance(null)
    }
  }, [isRecurring])
  const handleSubmit = () => {
    mutate({ name, amount, date, isRecurring, recurrance, category })
  }

  return (
    <>
      <p className='Text'>Enter your expense data.</p>
      <div className='w-full'>
        <form className='' ref={formRef}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm mb-2'>Name</label>
            <input
              className='Input w-full'
              id='name'
              type='text'
              placeholder='Tour with friends'
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
            <div className='mb-4'>
              <label className='block text-gray-700 text-base mb-2'>Category</label>
              <select
                id='recurrance'
                className='block Input w-full'
                value={category || ''}
                onChange={(e) => setCategory(e.target.value as Category)}
              >
                <option value='Health'>Health</option>
                <option value='Education'>Education</option>
                <option value='Entertainment'>Entertainment</option>
                <option value='Food'>Food</option>
                <option value='Other'>Other</option>
              </select>
            </div>
          </div>
          <div className='mb-4 flex gap-2 items-center'>
            <label className='block text-gray-700 text-base mb-2'>Is this expense recurring?</label>
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
                onChange={(e) => setRecurrance(e.target.value)}
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

const AddInvestment = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [roi, setRoi] = useState('')
  const formRef = useRef<HTMLFormElement>()
  const { mutate, isLoading } = api.investment.create.useMutation({
    onSuccess: () => {
      showSuccessNotification('Investment added successfully')
      formRef.current && formRef.current.reset()
    },
    onError: () => showFailureNotification('Investment could not be added.'),
  })

  const handleSubmit = () => {
    mutate({ name, amount, date, roi })
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
            <input className='Input' id='roi' type='text' onChange={(e) => setRoi(e.target.value)} />
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
