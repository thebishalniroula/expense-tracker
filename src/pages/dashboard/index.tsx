import { api } from '~/utils/api'
import Tabs from '~/components/dashboard/Tabs'
import Summary from '~/components/dashboard/Summary'
import DoughnoutChart from '~/components/dashboard/DoughnutChart'

const Dashboard = () => {
  const { data: user } = api.user.me.useQuery()
  if (!user) return null
  return (
    <>
      <h1 className='px-5 text-2xl font-medium tracking-wide mb-5'>Dashboard</h1>
      <div className='flex justify-around flex-wrap gap-5'>
        <div className='flex flex-col gap-20'>
          <Summary
            totalIncome={user.totalIncome}
            totalExpenses={user.totalExpenses}
            totalInvestments={user.totalInvestments}
          />
          <div className=' flex justify-center flex-col items-center gap-3 border p-5 shadow-md min-h-[15rem]'>
            <h2 className=' text-xl tracking-wide font-medium capitalize'>Savings vs Expenses</h2>
            {!user.totalIncome || !user.totalExpenses ? (
              <p>Enter your income and expense data before you can visualze your budget.</p>
            ) : (
              <DoughnoutChart totalExpenses={user.totalExpenses} totalIncome={user.totalIncome} />
            )}
          </div>
        </div>
        <div>
          <h2 className='text-center text-xl font-medium mb-5'>Add new</h2>
          <Tabs />
        </div>
      </div>
    </>
  )
}

export default Dashboard
