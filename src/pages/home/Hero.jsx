import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative overflow-hidden mt-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-color1/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-color2/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6  lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-color1/20 bg-color1/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-color1" />
              <span className="text-sm font-medium text-color1">
                The Future of Logistics
              </span>
            </div>

            <h1 className="text-balance text-5xl font-bold leading-tight text-color3 md:text-6xl">
              Deliver with <span className="text-color1">Confidence</span>
            </h1>

            <p className="text-balance text-lg leading-relaxed text-color3">
              Unlock unequalled business performance with real-time tracking,
              intelligent routing, and world-class customer service. Join the
              parcel delivery revolution.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link to='/sendParcel'>
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-color1 px-3 py-2  font-medium text-white transition hover:bg-color1/90 cursor-pointer">
                Start Shipping Now
                <FiArrowRight className="text-xl" />
              </button>
              </Link>

              <button className="rounded-full border border-color3 bg-transparent px-3 py-2  font-medium text-color3 transition hover:bg-color3 hover:text-white cursor-pointer">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative h-96 min-h-96 md:h-full">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-color2/20 to-color1/20 blur-2xl" />
            <div className="relative flex h-full items-center justify-center overflow-hidden rounded-3xl border border-color3/20 bg-white">
              <div className="text-center">
                <div className="mb-4 text-6xl">📦</div>
                <p className="text-color3">Parcel delivery visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
