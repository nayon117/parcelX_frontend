import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { user: firebaseUser } = useAuth(); 
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [mongoId, setMongoId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!firebaseUser?.email) return;

        const res = await axiosSecure.get(`/users/search?email=${firebaseUser.email}`);
        if (res.data.length > 0) {
          const mongoUser = res.data[0];
          setMongoId(mongoUser._id);
          setFormData({
            name: mongoUser.name || "",
            email: mongoUser.email || "",
            phone: mongoUser.phone || "",
            address: mongoUser.address || "",
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch user data.",
        });
      }
    };

    fetchUser();
  }, [firebaseUser, axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosSecure.patch(`/users/${mongoId}/profile`, formData);

      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully!",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err?.response?.data?.message || err.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email (read-only)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="w-full border px-3 py-2 rounded bg-gray-100"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white ${
            loading ? "bg-gray-400" : "bg-color2 cursor-pointer"
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
