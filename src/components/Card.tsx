import React from "react";
import classNames from "classnames";

import {
  PiggyBankIcon,
  SlackIcon,
  MailCheckIcon,
  LibraryIcon,
  TicketIcon,
  MegaphoneIcon,
} from "lucide-react";

interface Props {
  title: string;
  description?: string;
  highlight: "red" | "green" | "blue" | "white";
  icon: "money" | "slack" | "mail" | "resources" | "tickets" | "announcements";
}

const Icons = {
  money: PiggyBankIcon,
  slack: SlackIcon,
  mail: MailCheckIcon,
  resources: LibraryIcon,
  tickets: TicketIcon,
  announcements: MegaphoneIcon,
};

const Card = ({ icon, highlight, title, description }: Props) => {
  const Icon = Icons[icon];

  const [show, setShow] = React.useState(false);
  const [mousePositionRelativeToParent, setMousePositionRelativeToParent] =
    React.useState<{ left: number; top: number } | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // get mouse poision relative to ref
    if (!show) {
      setShow(true);
    }
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    setMousePositionRelativeToParent({ left, top });
  };

  console.log("render");
  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        setShow(false);
      }}
      ref={ref}
      className="relative overflow-hidden max-w-sm h-full bg-gray-900 p-8 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-xl hover:border-slate-800 border-transparent border border-solid "
    >
      <div className="flex flex-col relative z-20">
        <div className="p-3 w-fit mt-20 rounded-full bg-gray-800 border-gray-700 border">
          <Icon strokeWidth={1} color="white" size="20" absoluteStrokeWidth />
        </div>
        <h3 className=" relative mt-4 text-white font-semibold text-lg">
          {title}
        </h3>
        <p className=" relative mt-2 text-neutral-400 text-sm">{description}</p>
      </div>
      <div className="absolute z-10 -top-8 -left-8 bottom-0 right-0 grid grid-cols-6 h-[500px] w-[500px] gap-1">
        {[...Array(42)].map((_, index) => (
          <div key={index} className="w-20 h-20 bg-gray-900 z-10" />
        ))}
        <div
          className={classNames(
            "absolute bg-gradient-to-br transition-opacity animate-spin-slow duration-500 ease-in-out filter blur-2xl w-16 h-24 translate-x-[-50%] translate-y-[-50%]",
            {
              "opacity-0": !show,
              "opacity-100": show,
              "from-pink-500/50 via-red-500/50 to-yellow-500/50":
                highlight === "red",
              "from-green-500/50 via-green-300/40 to-teal-500/50":
                highlight === "green",
              "from-blue-500/50 via-indigo-500/50 to-purple-500/50":
                highlight === "blue",
              "from-gray-500/50 via-gray-500/50 to-gray-500/50":
                highlight === "white",
            },
          )}
          style={{
            left: mousePositionRelativeToParent?.left,
            top: mousePositionRelativeToParent?.top,
          }}
        />
      </div>
    </div>
  );
};

export default Card;
