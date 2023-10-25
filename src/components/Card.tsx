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
  const [isBeingPressed, setIsBeingPressed] = React.useState(false);
  const [mousePositionRelativeToParent, setMousePositionRelativeToParent] =
    React.useState<{ left: number; top: number } | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!show) {
        setShow(true);
      }
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      // Get mouse poision relative to ref
      const left = e.clientX - rect.left;
      const top = e.clientY - rect.top;
      setMousePositionRelativeToParent({ left, top });
    },
    [],
  );

  return (
    <div
      onPointerMove={onMouseMove}
      onPointerDown={() => {
        setIsBeingPressed(true);
      }}
      onPointerUp={() => {
        setIsBeingPressed(false);
      }}
      onPointerLeave={() => {
        setIsBeingPressed(false);
        setShow(false);
      }}
      ref={ref}
      className={classNames(
        "relative overflow-hidden max-w-sm h-full bg-gray-900 p-6 md:p-8 rounded-lg cursor-pointer transition-all duration-200 hover:border-slate-800 border-transparent border border-solid shadow-lg hover:shadow-2xl",
        {
          "selection:bg-red-500/20": highlight === "red",
          "selection:bg-green-500/20": highlight === "green",
          "selection:bg-blue-500/20": highlight === "blue",
          "selection:bg-gray-500/20": highlight === "white",
        },
      )}
    >
      <div className="flex-col relative z-20 hidden md:flex">
        <div className="p-3 w-fit mt-2 md:mt-10 rounded-full bg-gray-800 border-gray-700 border">
          <Icon strokeWidth={1} color="white" size="20" absoluteStrokeWidth />
        </div>
        <h3 className=" relative mt-4 text-white font-semibold text-lg">
          {title}
        </h3>
        <p className=" relative mt-2 text-neutral-400 text-sm">{description}</p>
      </div>
      <div className="flex-col relative gap-4 z-20 flex md:hidden">
        <div className="flex flex-row gap-4 items-start">
          <div className="aspect-square w-10 min-w-[2.5rem] rounded-full bg-gray-800 border-gray-700 border flex justify-center items-center">
            <Icon strokeWidth={1} color="white" size="16" absoluteStrokeWidth />
          </div>
          <h3 className="relative  text-white font-semibold text-lg">
            {title}
          </h3>
        </div>
        {description && (
          <p className=" relative text-neutral-400 text-sm">{description}</p>
        )}
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

              // COLORS
              "from-pink-500/60 via-red-500/60 to-yellow-500/60":
                highlight === "red" && !isBeingPressed,
              "from-green-500/60 via-green-300/60 to-teal-500/60":
                highlight === "green" && !isBeingPressed,
              "from-blue-500/60 via-indigo-500/60 to-purple-500/60":
                highlight === "blue" && !isBeingPressed,
              "from-gray-200/60 via-gray-white/60 to-gray-200/60":
                highlight === "white" && !isBeingPressed,

              // COLORS WHEN CLICKING
              "from-pink-500/80 via-red-500/80 to-yellow-500/80":
                highlight === "red" && isBeingPressed,
              "from-green-500/80 via-green-300/80 to-teal-500/80":
                highlight === "green" && isBeingPressed,
              "from-blue-500/80 via-indigo-500/80 to-purple-500/80":
                highlight === "blue" && isBeingPressed,
              "from-gray-200/80 via-white/80 to-gray-200/80":
                highlight === "white" && isBeingPressed,
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
