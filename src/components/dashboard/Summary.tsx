import { formatNumber } from '~/utils/numbers'

type SummaryProps = {
  totalIncome: number
  totalExpenses: number
  totalInvestments: number
}
const Summary = ({ totalIncome, totalExpenses, totalInvestments }: SummaryProps) => {
  const totalSavings = totalIncome - totalExpenses
  const savingPercentage = ((totalIncome - totalExpenses) / totalIncome) * 100

  return (
    <div className='flex gap-10 flex-wrap'>
      <div className='h-36 w-36 border flex flex-col justify-center items-center shadow-lg'>
        <p className='text-lg'>Total income</p>
        <p className='text-3xl'>Rs {formatNumber(totalIncome)}</p>
      </div>
      <div className='h-36 w-36 border flex flex-col justify-center items-center shadow-lg'>
        <p className='text-lg'>Total Expenses</p>
        <p className='text-3xl'>Rs {formatNumber(totalExpenses)}</p>
      </div>
      <div className='h-36 w-36 border flex flex-col justify-center items-center shadow-lg'>
        <p className='text-lg'>Total Savings</p>
        <p className='text-3xl'>Rs {formatNumber(totalSavings)}</p>
      </div>
      <div className='h-36 w-36 border flex flex-col justify-center items-center shadow-lg'>
        <p className='text-lg'>Total Investments</p>
        <p className='text-3xl'>Rs {formatNumber(totalInvestments)}</p>
      </div>
      <div className='h-36 w-36 border flex flex-col justify-center items-center shadow-lg'>
        <p className='text-lg'>Saving</p>
        <p className='text-3xl'>{isFinite(savingPercentage) ? savingPercentage.toFixed(2) : '0'} %</p>
      </div>
    </div>
  )
}
export default Summary
