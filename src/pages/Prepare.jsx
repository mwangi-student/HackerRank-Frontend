import { Footer, AssessmentList, Navbar, Tests } from "../components/index";

function Prepare() {
  return (
    <div className="bg-[#F3F5FF] font-[Montserrat] flex flex-col min-h-screen w-full">
      <div className="fixed top-0 w-full z-[100]">
        <Navbar />
      </div>
      <main className="flex-grow">
        <div className="h-[250px] w-full items-center gap-5 py-[5%] pl-[10%] pr-[17%] flex-wrap bg-gradient-to-b from-[rgba(178,248,253,0.8)] to-[rgba(221,221,221,0)]">
          <h2 className="text-3xl text-bold text-[#003066]">Prepare</h2>
          <hr className="w-32 border-gray-400 border-2 my-2" />
          <p className="font-medium text-lg text-[#003066]">
            Prepare and practice programming skills
          </p>
        </div>
        <div className="min-h-[200px] w-full items-center gap-5 py-[1.5%] pl-[10%] pr-[17%] flex-wrap">
          <AssessmentList />
        </div>
        <div className="min-h-[200px] w-full items-center gap-5 py-[1.5%] pl-[10%] pr-[17%] flex-wrap">
          <Tests />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Prepare;
