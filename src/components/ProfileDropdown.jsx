import { useState, useEffect, useRef, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../Contexts/UserContext";

const ProfileDropdown = () => {
  const { currentUser, logOutGoogleUser, logout, updateUser } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dropdownRef = useRef(null);

  // Populate form fields when the user opens the profile
  useEffect(() => {
    if (currentUser) {
      setNewUsername(currentUser.username || ""); 
      setNewEmail(currentUser.email || ""); 
    }
  }, [currentUser, showProfile]); 

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

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    if (!newUsername || !newEmail) {
      toast.error("Please fill in all fields");
      return;
    }

    const updatedData = { username: newUsername, email: newEmail };
    if (newPassword) updatedData.password = newPassword;

    try {
      await updateUser(updatedData); 
      toast.success("Profile updated successfully");
      setShowProfile(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setShowDropdown(!showDropdown)} className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
          <button onClick={() => { setShowProfile(true); setShowDropdown(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Your Profile
          </button>
          <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Sign out
          </button>
        </div>
      )}

      {showProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Your Profile</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="font-medium text-gray-700">Name</label>
                <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="border p-2 rounded-lg w-full" />
              </div>
              <div className="mb-4">
                <label className="font-medium text-gray-700">Email</label>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="border p-2 rounded-lg w-full" />
              </div>
              <div className="mb-4">
                <label className="font-medium text-gray-700">New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border p-2 rounded-lg w-full" placeholder="Leave blank to keep current password"/>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowProfile(false)} className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-200">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
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


