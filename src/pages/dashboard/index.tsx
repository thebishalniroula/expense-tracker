import { api } from '~/utils/api'
import Tabs from '~/components/dashboard/Tabs'
import Summary from '~/components/dashboard/Summary'

const Dashboard = () => {
  const { data: user } = api.user.me.useQuery()
  if (!user) return null
  return (
    <>
      <div className='flex justify-around flex-wrap gap-5'>
        <Summary
          totalIncome={user.totalIncome}
          totalExpenses={user.totalExpenses}
          totalInvestments={user.totalInvestments}
        />
        <Tabs />
      </div>
      <div>Dashboard</div>
    </>
  )
}

export default Dashboard
