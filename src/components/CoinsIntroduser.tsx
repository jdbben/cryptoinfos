const CoinsIntrudoser = () => {
  return (
    <div className="bg-slate-100 flex flex-row justify-center items-center h-[80px] min-w-[400px] max-w-[900px] rounded-full p-8 cursor-pointer">
      <div className="flex-none  ">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
          alt=""
          width={50}
        />
      </div>
      <div className=" w-full pl-5">
        <p>price</p>
        <div className="flex flex-row items-center gap-6">
          <p>price</p>
          <p>price</p>
        </div>
      </div>
    </div>
  );
};

export default CoinsIntrudoser;
