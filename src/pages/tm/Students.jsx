import React from "react";
import { StudentList, TmNavbar } from "../../components";

export default function Students() {
  return (
    <div className="bg-[#ededed] font-[Montserrat] flex flex-col min-h-screen w-full">
      <div className="fixed top-0 w-full z-[100]">
        <TmNavbar />
      </div>
          <main className="flex-grow">
          <div className="h-[250px] w-full items-center gap-5 py-[5%] pl-[10%] pr-[17%] flex-wrap bg-gradient-to-b from-[rgba(170, 255, 174, 0.8)] to-[rgba(237,237,237,0)]">
            <div className="flex flex-row gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#014c06" id="User-List--Streamline-Phosphor" height="26" width="26"><desc>User List Streamline Icon: https://streamlinehq.com</desc><path d="M9.2649375 4.96604375c0 -0.279325 0.22645 -0.5057625 0.505775 -0.505775h5.5635125c0.38934375 0.00043125 0.63221875 0.42218125 0.43716875 0.75914375 -0.09031875 0.15604375 -0.256875 0.2522 -0.43716875 0.2524h-5.5635125c-0.27934375 0.0000125 -0.505775 -0.22643125 -0.505775 -0.50576875Zm6.0692875 2.52886875h-5.5635125c-0.38935 0.00043125 -0.63221875 0.42218125 -0.43716875 0.75915 0.09031875 0.1560375 0.256875 0.2522 0.43716875 0.2524h5.5635125c0.38934375 -0.0004375 0.63221875 -0.42218125 0.43716875 -0.75915 -0.09031875 -0.1560375 -0.256875 -0.2522 -0.43716875 -0.2524Zm0 3.03464375h-4.04619375c-0.38934375 0.00043125 -0.6322125 0.42218125 -0.43716875 0.75915 0.09031875 0.1560375 0.256875 0.2522 0.43716875 0.2524h4.04619375c0.38934375 -0.00043125 0.63221875 -0.42218125 0.43716875 -0.75915 -0.09031875 -0.1560375 -0.256875 -0.2522 -0.43716875 -0.2524Zm-6.08509375 1.39088125c0.0695375 0.27060625 -0.093525 0.5463375 -0.36415625 0.61578125 -0.041225 0.01110625 -0.08375 0.0166375 -0.12644375 0.0164375 -0.23073125 0.0001125 -0.4322875 -0.15593125 -0.48996875 -0.37933125 -0.38945 -1.51353125 -1.91815 -2.65531875 -3.556225 -2.65531875s-3.16678125 1.14115625 -3.556225 2.65531875c-0.0973375 0.377175 -0.56648125 0.50754375 -0.84445625 0.23465625 -0.1290125 -0.12664375 -0.18065625 -0.31249375 -0.13548125 -0.48754375 0.35340625 -1.37254375 1.3807625 -2.4839875 2.68439375 -3.03464375 -1.85073125 -1.42549375 -1.4643 -4.3199 0.69558125 -5.20993125 2.159875 -0.8900375 4.4732875 0.891825 4.16414375 3.20735 -0.106 0.79395625 -0.52160625 1.5138 -1.15619375 2.00258125 1.30426875 0.55065625 2.33161875 1.6621 2.68503125 3.03464375Zm-4.5361625 -3.413975c1.55738125 -0.00006875 2.53075625 -1.68603125 1.75200625 -3.034725 -0.77875 -1.34869375 -2.725475 -1.3486125 -3.50410625 0.00015625 -0.17753125 0.30753125 -0.271 0.656375 -0.271 1.01146875 0 1.1173625 0.9057375 2.02315 2.0231 2.0231Z" stroke-width="0.0625"></path></svg>
                <h2 className="text-3xl text-bold text-[#014C06]">Students</h2>
            </div>
            <hr className="w-38 border-gray-400 border-2 my-2" />
            <p className="font-medium text-lg text-[#014C06]">
                Control your students.
            </p>
        </div>
        <div className="min-h-[200px] w-full items-center gap-5 py-[1.5%] pl-[10%] pr-[17%] flex-wrap">
          <StudentList />
        </div>
      </main>
    </div>
  );
}
