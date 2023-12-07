import {
  Navigate,
  Outlet,
  createBrowserRouter,
  redirect,
  useNavigation,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Team } from "./pages/Team";
import { TeamMember } from "./pages/TeamMember";
import { NavBar } from "./NavBar";
import { TeamNav } from "./TeamNav";
import { NewTeamMember } from "./pages/NewTeamMember";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { path: "*", element: <Navigate to="/" /> }, // if link doesnt exist,  redirects back to home page
      { path: "/", element: <Home /> },
      { path: "/store", element: <Store /> },
      { path: "/about", element: <About /> },
      {
        path: "/team",
        element: <TeamNavLayout />,

        ///// LOADER ////

        // fetches users from api , instead of json file
        // auto convert's it to json
        // signal is used to cancel request when an error occurs
        loader: ({ request: { signal } }) => {
          return fetch("https://jsonplaceholder.typicode.com/users", {
            signal,
          });
        },
        children: [
          { index: true, element: <Team /> },
          {
            path: ":memberId",
            // 
            loader: ({ params, request: { signal } }) => {
              return (
                fetch(
                  `https://jsonplaceholder.typicode.com/users/${params.memberId}`,
                  { signal }
                )
                  // if url is valid return response.json
                  .then((res) => {
                    if (res.status === 200) return res.json();
                    // else go back to team page
                    throw redirect("/team");
                  })
              );
            },
            element: <TeamMember />,
          },
          { path: "new", element: <NewTeamMember /> },
        ],
      },
    ],
  },
]);

function NavLayout() {
  // can be used to add loading state or other states
 const {state} = useNavigation()

  return (
    <>
      <NavBar />
      {/* adds loading when the link is loading */}
     {  state === "loading" ? <h1>loading</h1> : <Outlet/>}
    </>
  );
}
function TeamNavLayout() {
  return (
    <>
      <TeamNav />
      <Outlet context="context from outlet" />
    </>
  );
}
