export const ContentColumn = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 mx-auto max-w-[960px]">
      {children}
    </div>
  );
};
