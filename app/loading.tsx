const loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-[9999]">
      <span className="loader"></span>
    </div>
  );
};

export default loading;
