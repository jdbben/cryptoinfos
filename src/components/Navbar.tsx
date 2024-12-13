import { IoIosSearch } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="flex w-full h-[8vh] bg-white fixed top-0 flex-row justify-center items-center">
      <img src="/logo.png" width={50} alt="" />
      <div className="flex flex-row justify-center items-center gap-1">
        <Input placeholder="Search" className="rounded-3xl bg-slate-100" />
        <IoIosSearch className="text-black text-2xl" />
      </div>

      <div className="flex flex-row justify-center items-center gap-1">
        <CiGlobe className="text-black text-2xl" />
        <p className="text-black">EN</p>
      </div>
      <CiUser className="text-black text-2xl" />
    </div>
  );
};

export default Navbar;
