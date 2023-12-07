import { useLoaderData } from "react-router-dom"

export function TeamMember() {
  // import member with useLoaderData
  const member = useLoaderData()
  return (
    <>

    <h1>Team Member - {member.name}</h1>
    </>
  )
}
