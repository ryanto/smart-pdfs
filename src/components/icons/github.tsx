import { ComponentProps } from "react";

export default function GithubIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width={11}
      height={12}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5.5C2.462.5 0 3.024 0 6.14c0 2.49 1.576 4.605 3.761 5.35.275.052.376-.122.376-.272 0-.133-.005-.489-.008-.959-1.53.34-1.853-.756-1.853-.756-.25-.652-.61-.825-.61-.825-.5-.35.038-.343.038-.343.552.04.842.581.842.581.49.862 1.288.613 1.6.469.051-.364.193-.613.35-.753-1.22-.143-2.505-.627-2.505-2.788 0-.615.214-1.119.566-1.513-.057-.143-.245-.716.054-1.492 0 0 .462-.152 1.512.578a5.147 5.147 0 011.377-.19 5.16 5.16 0 011.377.19c1.05-.73 1.511-.579 1.511-.579.3.777.111 1.35.055 1.493.352.394.565.898.565 1.513 0 2.167-1.286 2.644-2.51 2.783.197.174.372.518.372 1.044 0 .754-.007 1.362-.007 1.547 0 .15.1.327.379.271a5.522 5.522 0 002.722-2.055A5.731 5.731 0 0011 6.14C11 3.024 8.537.5 5.5.5z"
        fill="#B7B7B7"
      />
    </svg>
  );
}