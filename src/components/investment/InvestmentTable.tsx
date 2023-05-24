import { Investment } from '~/server/db'
type InvestmentTableProps = { filteredLists: Omit<Investment, 'userId'>[] | undefined }

const InvestmentTable = ({ filteredLists }: InvestmentTableProps) => (
  <div className='p-1.5 max-w-3xl align-middle'>
    <div className='overflow-hidden border rounded-lg'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '>
              Name
            </th>
            <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '>
              Amount
            </th>
            <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '>
              Date
            </th>
            <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '>
              ROI
            </th>
            <th scope='col' className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '>
              Per
            </th>
          </tr>
        </thead>
        {filteredLists?.length ? (
          <tbody className='divide-y divide-gray-200'>
            {filteredLists?.map((investment) => (
              <tr key={investment.id}>
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{investment.name}</td>
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>Rs {investment.amount} </td>
                <td className='px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap'>
                  {investment.date.toDateString()}
                </td>
                <td className='px-6 py-4 text-sm text-left whitespace-nowrap'>{investment.roi} %</td>
                <td className='px-6 py-4 text-sm text-right whitespace-nowrap'>
                  Per {investment.roiRecurrance.split('ly')}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div className='p-2'>No entries matching the filters.</div>
        )}
      </table>
    </div>
  </div>
)
export default InvestmentTable
