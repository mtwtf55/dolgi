import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/debtors/$debtorId')({
  component: DebtorInfo,
})

function DebtorInfo() {
  return <div>Hello "/deptors/$deptorId"!</div>
}
