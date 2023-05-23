import { Doughnut } from 'react-chartjs-2'
type DoughnoutChartProps = {
  totalIncome: number
  totalExpenses: number
}
const DoughnoutChart = ({ totalIncome, totalExpenses }: DoughnoutChartProps) => {
  const totalSavings = totalIncome - totalExpenses

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
      />
    </div>
  )
}
export default DoughnoutChart
