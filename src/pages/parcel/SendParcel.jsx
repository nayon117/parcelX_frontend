import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const generateTrackingId = () => {
  const date = new Date();
  const datePart = date.toISOString().split('T')[0].replace(/-/g, '');
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${randomPart}`;
};

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const type = watch("type", "document");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const locationData = useLoaderData();
  const regions = [...new Set(locationData.map((item) => item.region))];
  const getDistrictsByRegion = (region) =>
    locationData.filter((item) => item.region === region).map((i) => i.district);

  const onSubmit = (data) => {
    const sameCity = data.senderRegion === data.receiverRegion;
    const weight = Number(data.weight || 0);
    const type = data.type;
    let base = 0,
      extra = 0,
      outCharge = 0;

    if (type === "document") {
      base = sameCity ? 60 : 80;
    } else {
      if (weight <= 3) {
        base = sameCity ? 110 : 150;
      } else {
        base = sameCity ? 110 : 150;
        extra = (weight - 3) * 40;
        if (!sameCity) outCharge = 40;
      }
    }

    const total = base + extra + outCharge;

    Swal.fire({
      title: "Confirm Delivery",
      html: `
        <div style="text-align:left; font-size:15px;">
          <p><b>📦 Parcel Type:</b> ${type}</p>
          <p><b>⚖️ Weight:</b> ${type === "document" ? "N/A" : weight + " kg"}</p>
          <p><b>🌍 Delivery Zone:</b> ${sameCity ? "Inside District" : "Outside District"}</p>
          <hr/>
          <p><b>Base Cost:</b> ${base}৳</p>
          ${
            extra > 0
              ? `<p><b>Extra Charges:</b> 40 × ${weight - 3} = ${extra}৳ 
                 <br/><small>(Non-document over 3kg)</small></p>`
              : `<p style="opacity:0.8; font-size:13px;"><small>No extra weight charge</small></p>`
          }
          ${
            outCharge > 0
              ? `<p><b>Outside District Charge:</b> +${outCharge}৳
                 <br/><small>(Applicable for inter-district delivery)</small></p>`
              : `<p style="opacity:0.8; font-size:13px;"><small>No outside-district charge</small></p>`
          }
          <hr/>
          <p style="font-size:18px; font-weight:bold; color:#000;">
            Total Cost: <span style="color:red;">${total}৳</span>
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      cancelButtonText: "✏️ Edit Info",
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      background: "#fff",
      color: "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: total,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          created_by: user?.email,
          creation_date: new Date().toISOString(),
          tracking_id : generateTrackingId()
        };
        console.log(parcelData);
        // TODO: Send parcelData to the server
        axiosSecure.post("/parcels", parcelData)
          .then((res) => {
            if (res.data.insertedId) {
              // TODO: here redirect to payment gateway

              Swal.fire("Success", `Parcel created successfully!<br/>Tracking ID: <b>${parcelData.tracking_id}</b>`, "success");
              reset();
            }
          })
      }
    });
  };

  const inputClass = "input input-bordered bg-white text-black w-full";
  const selectClass = "select select-bordered bg-white text-black w-full";
  const textareaClass = "textarea textarea-bordered bg-white w-full text-black";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <div className="max-w-6xl mx-auto p-6 text-black my-12">
      <h1 className="text-2xl font-bold mb-1">Create Parcel</h1>
      <p className="mb-4">Fill in the parcel details below</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Parcel Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: "Parcel type is required" })}
                  className="radio radio-success"
                  defaultChecked
                />
                <span>Document</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: "Parcel type is required" })}
                  className="radio radio-success"
                />
                <span>Non-Document</span>
              </label>
            </div>
            {errors.type && <p className={errorClass}>{errors.type.message}</p>}

            <div>
              <label className="label">
                <span className="label-text">Parcel Name</span>
              </label>
              <input
                type="text"
                placeholder="Describe your parcel"
                {...register("title", { required: "Parcel name is required" })}
                className={inputClass}
              />
              {errors.title && <p className={errorClass}>{errors.title.message}</p>}
            </div>

            {type === "non-document" && (
              <div>
                <input
                  type="number"
                  placeholder="Weight(kg)"
                  {...register("weight")}
                  className={inputClass}
                />
                {errors.weight && <p className={errorClass}>{errors.weight.message}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Sender Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Sender Name"
                  {...register("senderName", { required: "Sender name is required" })}
                  className={inputClass}
                />
                {errors.senderName && <p className={errorClass}>{errors.senderName.message}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Sender Contact"
                  {...register("senderContact", { required: "Sender contact is required" })}
                  className={inputClass}
                />
                {errors.senderContact && <p className={errorClass}>{errors.senderContact.message}</p>}
              </div>

              <div>
                <select
                  {...register("senderRegion", { required: "Sender region required" })}
                  className={selectClass}
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.senderRegion && <p className={errorClass}>{errors.senderRegion.message}</p>}
              </div>

              <div>
                <select
                  {...register("senderCenter", { required: "Sender service center required" })}
                  className={selectClass}
                >
                  <option value="">Select Service Center</option>
                  {senderRegion &&
                    getDistrictsByRegion(senderRegion).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                </select>
                {errors.senderCenter && <p className={errorClass}>{errors.senderCenter.message}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("senderAddress", { required: "Sender address is required" })}
                  className={inputClass}
                />
                {errors.senderAddress && <p className={errorClass}>{errors.senderAddress.message}</p>}
              </div>

              <div>
                <textarea
                  placeholder="Pickup Instruction"
                  {...register("pickupInstruction", { required: "Pickup instruction is required" })}
                  className={textareaClass}
                />
                {errors.pickupInstruction && <p className={errorClass}>{errors.pickupInstruction.message}</p>}
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Receiver Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  {...register("receiverName", { required: "Receiver name is required" })}
                  className={inputClass}
                />
                {errors.receiverName && <p className={errorClass}>{errors.receiverName.message}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Receiver Contact"
                  {...register("receiverContact", { required: "Receiver contact is required" })}
                  className={inputClass}
                />
                {errors.receiverContact && <p className={errorClass}>{errors.receiverContact.message}</p>}
              </div>

              <div>
                <select
                  {...register("receiverRegion", { required: "Receiver region required" })}
                  className={selectClass}
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.receiverRegion && <p className={errorClass}>{errors.receiverRegion.message}</p>}
              </div>

              <div>
                <select
                  {...register("receiverCenter", { required: "Receiver service center required" })}
                  className={selectClass}
                >
                  <option value="">Select Service Center</option>
                  {receiverRegion &&
                    getDistrictsByRegion(receiverRegion).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                </select>
                {errors.receiverCenter && <p className={errorClass}>{errors.receiverCenter.message}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("receiverAddress", { required: "Receiver address is required" })}
                  className={inputClass}
                />
                {errors.receiverAddress && <p className={errorClass}>{errors.receiverAddress.message}</p>}
              </div>

              <div>
                <textarea
                  placeholder="Delivery Instruction"
                  {...register("deliveryInstruction", { required: "Delivery instruction is required" })}
                  className={textareaClass}
                />
                {errors.deliveryInstruction && <p className={errorClass}>{errors.deliveryInstruction.message}</p>}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn text-white w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
