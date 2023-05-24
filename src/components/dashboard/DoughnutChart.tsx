import { Doughnut } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

type DoughnoutChartProps = {
  totalIncome: number
  totalExpenses: number
}
const DoughnoutChart = ({ totalIncome, totalExpenses }: DoughnoutChartProps) => {
  const totalSavings = totalIncome - totalExpenses
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
      <Doughnut
        data={{
          labels: ['Savings', 'Expenses'],
          datasets: [
            {
              label: 'Amount',
              data: [totalSavings, totalExpenses],
              backgroundColor: ['rgb(176, 42, 245)', 'rgb(99, 201, 75)'],
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
export default DoughnoutChart
