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

  const options = {
    plugins: {
      datalabels: {
        formatter: (value: number, ctx: any) => {
          let sum = 0
          let dataArr = ctx.chart.data.datasets[0].data
          dataArr.forEach((data: number) => {
            sum += data
          })
          let percentage = ((value * 100) / sum).toFixed(2) + '%'
          return percentage
        },

        anchor: 'end',
        align: 'start',
      },
    },
  }

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
        // @ts-ignore
        options={options}
      />
    </div>
  )
}
export default PieChart
