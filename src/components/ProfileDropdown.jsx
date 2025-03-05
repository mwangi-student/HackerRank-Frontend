// import { useState, useEffect, useRef, useContext } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import UserContext from "../Contexts/UserContext";

// const ProfileDropdown = () => {
//   const { user, logOutGoogleUser, logout, updateUser } = useContext(UserContext);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [userData, setUserData] = useState({ username: "", email: "", password: "" });
//   const dropdownRef = useRef(null);

//   // Load user data into modal when opened
//   useEffect(() => {
//     if (user) {
//       setUserData({
//         username: user.username,
//         email: user.email,
//         password: user.password,
//       });
//     }
//   }, [showModal, user]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Handle Logout
//   const handleLogOut = () => {
//     try {
//       logOutGoogleUser();
//       logout();
//       setShowDropdown(false);
//     } catch (error) {
//       toast.error("Error logging out. Please try again.");
//     }
//   };


//   // Handle Form Submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`/students/${user.id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         },
//         body: JSON.stringify(userData)
//       });

//       if (!response.ok) throw new Error("Failed to update profile");

//       const result = await response.json();
//       toast.success(result.message);
//       updateUser(userData);
//       setShowModal(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update profile. Please try again.");
//     }
//   };


//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Profile Button */}
//       <button
//         type="button"
//         onClick={() => setShowDropdown(!showDropdown)}
//         className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//         id="user-menu-button"
//         aria-expanded={showDropdown}
//         aria-haspopup="true"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="white"
//           className="size-8"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//           />
//         </svg>
//       </button>

//       {/* Dropdown Menu */}
//       {showDropdown && (
//         <div
//           className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="user-menu-button"
//         >
//           <button
//             onClick={() => {
//               setShowModal(true);
//               setShowDropdown(false);
//             }}
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             role="menuitem"
//           >
//             Your Profile
//           </button>
//           <button
//             onClick={handleLogOut}
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             role="menuitem"
//           >
//             Sign out
//           </button>
//         </div>
//       )}

//       {/* Profile Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Your Profile</h2>
//             <label className="block mb-2">
//               <label className="block font-medium text-gray-700">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={userData.username}
//                 onChange={(e) => setUserData({ ...userData, username: e.target.value })}
//                 className="border p-2 rounded-lg w-full"
//               />
//             </label>
//             <label className="space-y-4">
//               <label className="block font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={userData.email}
//                 onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//                 className="border p-2 rounded-lg w-full"
//               />
//             </label>
//             <label className="space-y-4">
//               <label className="block font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={userData.password}
//                 onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//                 className="border p-2 rounded-lg w-full"
//               />
//             </label>
//             <div className="flex justify-end space-x-2 mt-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileDropdown;

import { useState, useEffect, useRef, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../Contexts/UserContext";

const ProfileDropdown = () => {
  const { user, logOutGoogleUser, logout, updateUser, deleteUser } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username,
        email: user.email,
        password: ""
      });
    }
  }, [showModal, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      await logOutGoogleUser();
      await logout();
      setShowDropdown(false);
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/tm/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to update profile");
      }

      const result = await response.json();
      toast.success(result.message);
      updateUser(userData);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded={showDropdown}
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>

      {showDropdown && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <button
            onClick={() => {
              setShowModal(true);
              setShowDropdown(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Your Profile
          </button>
          <button
            onClick={handleLogOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Your Profile</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                <span className="font-medium text-gray-700">Username</span>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  className="border p-2 rounded-lg w-full"
                />
              </label>
              <label className="block mb-2">
                <span className="font-medium text-gray-700">Email</span>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="border p-2 rounded-lg w-full"
                />
              </label>
              <label className="block mb-2">
                <span className="font-medium text-gray-700">Password</span>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  className="border p-2 rounded-lg w-full"
                  placeholder="Leave blank to keep current password"
                />
              </label>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
