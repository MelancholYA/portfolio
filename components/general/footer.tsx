const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-100 hue">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 Yacine Ouardi</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              target="_blank"
              href="https://github.com/melancholYA/"
              className="text-primary hover:text-white"
            >
              GitHub
            </a>

            <a
              target="_blank"
              href="https://www.linkedin.com/in/yacine-ouardi/"
              className="text-primary hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
