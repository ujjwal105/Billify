import { useState, useEffect } from "react";
import clsx from "clsx";
const Accordion = ({
  title,
  children,
  stepNum,
  activeState,
  setActiveState,
  ...props
}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(activeState === stepNum);
  }, [activeState, stepNum]);

  const handleToggle = () => {
    if (activeState >= stepNum) {
      setActiveState(stepNum);
    }
  };

  return (
    <div className="border rounded-sm">
      <button
        className={clsx(
          "flex items-center justify-between w-full p-5 font-bold dark:bg-black",
          activeState === stepNum && "bg-gray-100 dark:bg-zinc-800"
        )}
      >
        <p className="font-semibold">
          <div className="flex">
            <div
              className={clsx(
                "px-2 py-0.5 mx-2 pt-1 rounded-sm font-semibold text-xs",
                activeState > stepNum && "bg-green-600 text-white",
                activeState === stepNum && "bg-black text-white",
                activeState < stepNum && "bg-zinc-200 text-black"
              )}
            >
              {activeState > stepNum ? (
                // <Check />
                <span className="text-white">✓</span>
              ) : (
                stepNum
              )}
            </div>
            <div>{title}</div>
          </div>
        </p>
        <div className="cursor-pointer">
          {stepNum < activeState && (
            <span className="font-medium text-blue-800" onClick={handleToggle}>
              <u>Change</u>
            </span>
          )}
        </div>
      </button>
      <div
        className={`transition-[max-height] duration-700 ease-in-out overflow-hidden border-t-2 ${
          isOpen ? "max-h-max" : "max-h-0"
        } bg-white dark:bg-gray-950`}
      >
        {isOpen && <div className="p-4">{children}</div>}
      </div>
    </div>
  );
};

export default Accordion;
