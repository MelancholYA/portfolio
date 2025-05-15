import React from "react";
import BlogNav from "../../components/general/blog-nav";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <BlogNav />
      {children}
    </div>
  );
};

export default layout;
