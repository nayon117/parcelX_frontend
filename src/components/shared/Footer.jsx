import Logo from "./Logo";

const Footer = () => {
  const linkColumns = [
    { title: "Product", links: ["Features", "Pricing", "Security"] },
    { title: "Company", links: ["About", "Blog", "Careers"] },
    { title: "Support", links: ["Help Center", "Contact", "Status"] },
  ];

  return (
    <footer className="bg-white border-color3 py-12 ">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo bg="black" />
            </div>
            <p className="text-sm text-color3">
              parcelX Industries Ltd. <br />
              Providing reliable tech since 1992
            </p>
          </div>

          {linkColumns.map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold text-color3 mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-color3 hover:text-color1 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-color3 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-color3">
            © {new Date().getFullYear()} parcelX Industries Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-color3 hover:text-color1 transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-color3 hover:text-color1 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-color3 hover:text-color1 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
