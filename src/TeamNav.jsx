import { Link, useLoaderData } from "react-router-dom";

export function TeamNav() {
  // import teammembers json from router with useLoaderData
  const teamMembers = useLoaderData()
  return (

    <>
      {/* can use Link or NavLink, navlink auto adds .active class */}
      {/* if you want to disable this when clicked on child use 'end' */}
      <ul>
        {teamMembers.map((member) => {
          return (
            <li key={member.id}>
              {/* the id's from api are numbers , but need to be a string thats why toString() */}
              <Link to={member.id.toString()}>Team - {member.name}</Link>
            </li>
          );
        })}

        <li >
          <Link to="new">New Team Member</Link>
        </li>
      </ul>
    </>
  );
}
