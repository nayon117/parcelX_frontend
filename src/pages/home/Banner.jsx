import introVideo from "../../assets/intro.mp4";

const Banner = () => {
  return (
    <div className="w-full h-[500px] relative overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={introVideo}
        autoPlay
        loop
        muted
        playsInline
      ></video>
      {/* Overlay text at top middle */}
      <div className="absolute inset-0 bg-opacity-30 flex items-start justify-center pt-10">
        <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold">
          Fast. Reliable. Nationwide.
        </h1>
      </div>
    </div>
  );
};

export default Banner;
