import Image from "next/image";


const Bulb = () => {
  return <div className="absolute -left-36 -bottom-12 rotate-12  ">
    <Image src={'/bulb.png'} width={260} height={300} className="w-full h-full  " alt="" />
  </div>;
};

export default Bulb;
