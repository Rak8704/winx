const GameLoader = ({
  length,
  loading,
}: {
  length: number;
  loading: boolean;
}) => {
  const loader = Array.from({ length: length });

  if (!loading) return null;
  return (
    <>
      {loader.map((_, i) => (
        <Loader key={i} />
      ))}
    </>
  );
};

export default GameLoader;

export const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center h-[230px] bg-wwwwwwck-44-4comdaintree rounded-2xl border border-solid border-[#006165]">
      <span className="text-sm text-[#35babe]">Loading...</span>
    </div>
  );
};
