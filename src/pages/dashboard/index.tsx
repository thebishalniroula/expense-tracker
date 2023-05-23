import { api } from '~/utils/api'
import Tabs from '~/components/dashboard/Tabs'
import Summary from '~/components/dashboard/Summary'
import DoughnoutChart from '~/components/dashboard/DoughnutChart'

const Dashboard = () => {
  const { data: user } = api.user.me.useQuery()
  if (!user) return null
  return (
    <>
      <div className='flex justify-around flex-wrap gap-5'>
        <div className='flex flex-col gap-20'>
          <Summary
            totalIncome={user.totalIncome}
            totalExpenses={user.totalExpenses}
            totalInvestments={user.totalInvestments}
          />
          <div className=' flex justify-center flex-col items-center gap-3 border p-5 shadow-md'>
            <h2 className=' text-xl tracking-wide font-medium capitalize'>Savings vs Expenses</h2>
            <DoughnoutChart totalExpenses={user.totalExpenses} totalIncome={user.totalIncome} />
          </div>
        </div>
        <Tabs />
      </div>
    </>
  )
}

export default Dashboard
