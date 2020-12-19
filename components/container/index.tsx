interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="p-5 max-w-xl mx-auto">{children}</div>;
}
