import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/deptors/')({
  component: Deptors,
})

function Deptors() {
  return <div>Hello "/deptors/"!</div>
}
