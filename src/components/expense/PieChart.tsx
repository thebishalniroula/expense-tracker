import { Pie } from 'react-chartjs-2'
import { api } from '~/utils/api'

const PieChart = () => {
  const { data: expense } = api.expense.getAll.useQuery()
  if (!expense) {
    return null
  }

  let curatedData: any = {}
  expense.map((e) => {
    if (curatedData[e.category]) {
      curatedData[e.category] += parseInt(e.amount)
    } else {
      curatedData[e.category] = parseInt(e.amount)
    }
  })
  return (
    <div className='h-60'>
      <Pie
        data={{
          labels: Object.keys(curatedData),
          datasets: [
            {
              label: 'Expense',
              data: Object.values(curatedData),
              backgroundColor: [
                'rgb(176, 42, 245)',
                'rgb(99, 201, 75)',
                'rgb(218, 57, 160)',
                'rgb(31, 145, 235)',
                'rgb(85, 255, 84)',
                'rgb(183, 81, 22)',
              ],
              hoverOffset: 4,
            },
          ],
        }}
      />
    </div>
  )
}
export default PieChart
