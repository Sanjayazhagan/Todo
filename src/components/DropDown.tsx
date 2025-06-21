import { useState ,useRef} from 'react';
import { GoChevronDown,GoChevronUp } from 'react-icons/go';
import { useEffect } from 'react';

interface props {
  options: { id: string; label: string;  }[];
  value: { id: string; label: string;  } | null;
  onChange: (option: { id: string; label: string;}) => void;
}

function Dropdown({ options, onChange,value }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const DivEl = useRef<HTMLDivElement|null>(null);

    useEffect(() => {

    const handleOutsideClick = (e: MouseEvent) => {
      if (DivEl.current != null && e.target instanceof Node && !DivEl.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
    }, []);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: { id: string; label: string }) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-gray-100 rounded cursor-pointer p-1 flex items-center"
        onClick={() => handleOptionClick(option)}
        key={option.id}
      >
        {option.label} 
      </div>
    );
  });

  return (
    <div ref={DivEl} className="w-48 relative z-50">
      <div
        className="flex justify-between items-center border-none w-full mt-2 text-xl hover:bg-gray-100 rounded-4xl font-bold text-gray-500 hover:cursor-pointer px-3 py-1.5 mb-2"
        onClick={handleClick}
      >
        {value?.label || 'Select...'}
        {isOpen ? <GoChevronUp className="text-lg" /> : <GoChevronDown className="text-lg" />}
      </div>
      {isOpen && (
        <div className="absolute top-full border border-gray-300 border-t-0 rounded p-3 shadow bg-white w-full mt-4">
          {renderedOptions}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
