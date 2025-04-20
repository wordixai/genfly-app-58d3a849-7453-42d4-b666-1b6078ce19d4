import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const clearAll = () => {
    setDisplay("0");
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay("0");
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(display);
    } else if (operator) {
      const currentValueNum = parseFloat(currentValue);
      let newValue: number;

      switch (operator) {
        case "+":
          newValue = currentValueNum + inputValue;
          break;
        case "-":
          newValue = currentValueNum - inputValue;
          break;
        case "×":
          newValue = currentValueNum * inputValue;
          break;
        case "÷":
          newValue = currentValueNum / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setCurrentValue(String(newValue));
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const handleMemoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const calculateSquareRoot = () => {
    const value = parseFloat(display);
    if (value >= 0) {
      const result = Math.sqrt(value);
      setDisplay(String(result));
      setWaitingForOperand(true);
    } else {
      setDisplay("Error");
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-black p-6 rounded-xl shadow-2xl w-[340px]">
        <div className="mb-4 p-4 bg-zinc-900 rounded-lg">
          <div className="text-right text-white text-3xl font-mono h-10 overflow-hidden">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button 
            variant="clear" 
            size="calculator" 
            onClick={clearAll}
            className="col-span-1"
          >
            AC
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={clearEntry}
          >
            CE
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={inputPercent}
          >
            %
          </Button>
          <Button 
            variant="operator" 
            size="calculator" 
            onClick={() => performOperation("÷")}
          >
            ÷
          </Button>
          
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={handleMemoryClear}
          >
            MC
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={handleMemoryRecall}
          >
            MR
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={handleMemoryAdd}
          >
            M+
          </Button>
          <Button 
            variant="operator" 
            size="calculator" 
            onClick={() => performOperation("×")}
          >
            ×
          </Button>
          
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={() => inputDigit("7")}
          >
            7
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={() => inputDigit("8")}
          >
            8
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={() => inputDigit("9")}
          >
            9
          </Button>
          <Button 
            variant="operator" 
            size="calculator" 
            onClick={() => performOperation("-")}
          >
            -
          </Button>
          
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={() => inputDigit("4")}
          >
            4
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={() => inputDigit("5")}
          >
            5
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={() => inputDigit("6")}
          >
            6
          </Button>
          <Button 
            variant="operator" 
            size="calculator" 
            onClick={() => performOperation("+")}
          >
            +
          </Button>
          
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={() => inputDigit("1")}
          >
            1
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={() => inputDigit("2")}
          >
            2
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={() => inputDigit("3")}
          >
            3
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={calculateSquareRoot}
          >
            √
          </Button>
          
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={toggleSign}
          >
            ±
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={() => inputDigit("0")}
          >
            0
          </Button>
          <Button 
            variant="calculator" 
            size="calculator" 
            onClick={inputDecimal}
          >
            .
          </Button>
          <Button 
            variant="operator" 
            size="calculator" 
            onClick={() => performOperation("=")}
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}