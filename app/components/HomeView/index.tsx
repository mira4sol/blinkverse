import Content from "./Content";
import Header from "./Header";

const index = () => {
  return (
    <section id="home" className="h-screen w-screen flex flex-col justify-between">
      <Header />
      <Content />
    </section>
  );
};

export default index;
