import { Contests, Footer, Header, Navbar } from "../../components/index";
function Compete() {
  return (
    <div className="bg-[#F3F5FF] font-[Montserrat] flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="flex-grow font-[Montserrat]">
        <Header />
        <Contests />
      </div>
      <Footer />
    </div>
  );
}

export default Compete;
