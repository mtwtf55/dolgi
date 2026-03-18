import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/deptors/$deptorId')({
  component: DeptorInfo,
})

function DeptorInfo() {
  return <div>Hello "/deptors/$deptorId"!</div>
}
