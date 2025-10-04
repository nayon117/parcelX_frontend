import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Rider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const locationData = useLoaderData();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // watch for region selection
  const selectedRegion = watch("region");

  // extract unique regions
  const regions = [...new Set(locationData.map((item) => item.region))];
  const getDistrictsByRegion = (region) =>
    locationData.filter((i) => i.region === region).map((i) => i.district);

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/riders", riderData);
      if (res.data.insertedId) {
        Swal.fire("✅ Success", "Your rider application has been submitted!", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to submit application", "error");
    }
  };

  const inputClass = "input input-bordered bg-white text-black w-full";
  const selectClass = "select select-bordered bg-white text-black w-full";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-md my-12">
      <h2 className="text-2xl font-bold mb-4">🚴 Rider Application</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name (readonly) */}
        <div>
          <label className="label"><span className="label-text">Full Name</span></label>
          <input
            type="text"
            value={user?.displayName || "hello"}
            readOnly
            className="input input-bordered bg-gray-100 w-full"
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="label"><span className="label-text">Email</span></label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered bg-gray-100 w-full"
          />
        </div>

        {/* Age & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label"><span className="label-text">Age</span></label>
            <input
              type="number"
              {...register("age", { required: "Age is required" })}
              placeholder="Enter your age"
              className={inputClass}
            />
            {errors.age && <p className={errorClass}>{errors.age.message}</p>}
          </div>

          <div>
            <label className="label"><span className="label-text">Phone Number</span></label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              placeholder="01XXXXXXXXX"
              className={inputClass}
            />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>
        </div>

        {/* Region & District */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label"><span className="label-text">Region</span></label>
            <select
              {...register("region", { required: "Region is required" })}
              className={selectClass}
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.region && <p className={errorClass}>{errors.region.message}</p>}
          </div>

          <div>
            <label className="label"><span className="label-text">District</span></label>
            <select
              {...register("district", { required: "District is required" })}
              className={selectClass}
            >
              <option value="">Select District</option>
              {selectedRegion &&
                getDistrictsByRegion(selectedRegion).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
            {errors.district && <p className={errorClass}>{errors.district.message}</p>}
          </div>
        </div>

        {/* NID */}
        <div>
          <label className="label"><span className="label-text">NID Number</span></label>
          <input
            type="text"
            {...register("nid", { required: "NID number is required" })}
            placeholder="Enter your NID"
            className={inputClass}
          />
          {errors.nid && <p className={errorClass}>{errors.nid.message}</p>}
        </div>

        {/* Bike Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label"><span className="label-text">Bike Brand</span></label>
            <input
              type="text"
              {...register("bikeBrand", { required: "Bike brand is required" })}
              placeholder="Honda, Yamaha, etc."
              className={inputClass}
            />
            {errors.bikeBrand && <p className={errorClass}>{errors.bikeBrand.message}</p>}
          </div>

          <div>
            <label className="label"><span className="label-text">Bike Registration</span></label>
            <input
              type="text"
              {...register("bikeRegistration", { required: "Registration no. required" })}
              placeholder="Enter registration number"
              className={inputClass}
            />
            {errors.bikeRegistration && <p className={errorClass}>{errors.bikeRegistration.message}</p>}
          </div>
        </div>

        <button type="submit" className="btn  w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Rider;
