import { Income } from '~/server/db'
type IncomeTableProps = { filteredLists: Omit<Income, 'isRecurring' | 'userId'>[] | undefined }

const IncomeTable = ({ filteredLists }: IncomeTableProps) => (
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
            <th scope='col' className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '>
              Recurrance
            </th>
          </tr>
        </thead>
        {filteredLists?.length ? (
          <tbody className='divide-y divide-gray-200'>
            {filteredLists?.map((income) => (
              <tr key={income.id}>
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{income.name}</td>
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>Rs {income.amount}</td>
                <td className='px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap'>
                  {income.date.toDateString()}
                </td>
                <td className='px-6 py-4 text-sm text-right whitespace-nowrap'>{income.recurrance || 'N/A'}</td>
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
export default IncomeTable
