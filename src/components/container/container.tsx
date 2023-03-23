type ContainerProps = {
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="container mx-auto p-5 max-w-5xl">{children}</div>;
};
