import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Karim",
    title: "E-commerce Entrepreneur",
    content:
      "ParcelX has been a game-changer for my online business. Deliveries are always on time, and my customers are happier than ever.",
    avatar: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 100
    )}.jpg`,
  },
  {
    id: 2,
    name: "Imran Hossain",
    title: "Small Business Owner",
    content:
      "I used to worry about parcels getting delayed, but with ParcelX I have peace of mind knowing my products reach safely and fast.",
    avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 100
    )}.jpg`,
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    title: "Fashion Designer",
    content:
      "Their service is reliable and professional. ParcelX handles every package with care — I trust them completely with my brand.",
    avatar: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 100
    )}.jpg`,
  },
  {
    id: 4,
    name: "Tanvir Alam",
    title: "Freelancer",
    content:
      "Tracking my deliveries in real time helps me plan better. The convenience is unmatched. ParcelX is my go-to courier now.",
    avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 100
    )}.jpg`,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-color3 mb-4">
            What Our Customers Are Saying
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Thousands of businesses and individuals trust ParcelX to deliver
            their products on time with confidence.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
             el: ".swiper-pagination",
          }}
          modules={[Pagination]}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md mx-auto">
                <FaQuoteLeft className="text-teal-500 w-8 h-8 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t.content}
                </p>

                <div className="flex items-center gap-4 border-t border-dashed pt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">{t.name}</h4>
                    <p className="text-sm text-gray-600">{t.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
           <div className="swiper-pagination !flex justify-center mt-6"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
