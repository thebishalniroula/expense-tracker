import * as RadixTabs from '@radix-ui/react-tabs'
import AddIncome from './AddIncome'
import AddInvestment from './AddInvestment'
import AddExpense from './AddExpense'

const Tabs = () => (
  <RadixTabs.Root className='TabsRoot' defaultValue='tab1'>
    <RadixTabs.List className='TabsList' aria-label='Manage your account'>
      <RadixTabs.Trigger className='TabsTrigger' value='tab1'>
        Income
      </RadixTabs.Trigger>
      <RadixTabs.Trigger className='TabsTrigger' value='tab2'>
        Expense
      </RadixTabs.Trigger>
      <RadixTabs.Trigger className='TabsTrigger' value='tab3'>
        Investment
      </RadixTabs.Trigger>
    </RadixTabs.List>
    <RadixTabs.Content className='TabsContent' value='tab1'>
      <AddIncome />
    </RadixTabs.Content>
    <RadixTabs.Content className='TabsContent' value='tab2'>
      <AddExpense />
    </RadixTabs.Content>
    <RadixTabs.Content className='TabsContent' value='tab3'>
      <AddInvestment />
    </RadixTabs.Content>
  </RadixTabs.Root>
)
export default Tabs
