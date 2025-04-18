export const LoaderHoriz = () => {
  return (
    <div className='w-full gap-x-2 flex justify-center items-center'>
      <div className='w-4 shadow-xl shadow-white  bg-[#eb9bd1] animate-pulse h-4 duration-700 rounded-full' />
      <div className='w-4 shadow-xl shadow-white animate-pulse h-4 bg-[#9963bd] duration-700 rounded-full delay-300' />
      <div className='w-4 shadow-xl shadow-white  h-4 animate-pulse bg-[#4b3c9e] duration-700 rounded-full delay-500' />
    </div>
  );
};
