import './UserProfile.css';



import { useEffect, useState } from "react";




export default function UserProfile() {
  const [data, setData] = useState(null);
//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const result = await getStatistics();
//         setData(result);
//       } catch (error) {
//         console.log(error.message);
//       }
//     }

//     fetchStats();
//   }, []);

  return (
    <>
      <div id="user_profie">
        <div>Forum statistics</div>
        <div>
           <label> Users: {data ? data[0].users_count : "Loading..."} </label>
           <label> Posts: {data ? data[0].posts_count : "Loading..."} </label>
        </div>
      </div>
    </>
  );
}
