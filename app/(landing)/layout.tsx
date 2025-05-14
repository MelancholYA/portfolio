import Nav from "../../components/general/Nav";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default layout;
