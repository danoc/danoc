import { DottedLink } from "../link";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="p-5 max-w-xl mx-auto">
      {children}

      <footer className="pt-4 border-t border-gray-200">
        <ul className="inline-grid gap-y-4 gap-x-2">
          <li className="col-span-3">
            <DottedLink href="mailto:daniel@danoc.me">
              daniel@danoc.me
            </DottedLink>
          </li>
          <li className="text-sm">
            <DottedLink href="https://twitter.com/_danoc">Twitter</DottedLink>
          </li>
          <li className="text-sm">
            <DottedLink href="https://github.com/danoc">GitHub</DottedLink>
          </li>
          <li className="text-sm">
            <DottedLink href="https://linkedin.com/in/itsdanoc">
              LinkedIn
            </DottedLink>
          </li>
        </ul>
      </footer>
    </div>
  );
}
