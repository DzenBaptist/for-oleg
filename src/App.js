import "./App.css";
import { useEffect, useState } from "react";
import { InputNumber, Typography } from "antd";

const { Text, Title } = Typography;

const App = () => {
  const [ratio, setRatio] = useState(0.6464646465);
  const [numbers, setNumbers] = useState([10, 20, 5, 10, 15]);
  const [multipliers, setMultipliers] = useState([
    0.05, 0.02, 0.005, 0.02, 0.05,
  ]);
  const [results, setResults] = useState([]);
  const [ratioNumbers, setRatioNumbers] = useState([]);
  const [ratioResults, setRatioResults] = useState([]);

  const handleRatioChange = (value) => setRatio(value);

  const handleNumberChange = (index) => (value) => {
    const newNumbers = numbers;
    newNumbers[index] = value;
    setNumbers(newNumbers.concat());
  };

  const handleMultiplierChange = (index) => (value) => {
    const newMultipliers = multipliers;
    newMultipliers[index] = value;
    setMultipliers(newMultipliers.concat());
  };

  useEffect(() => {
    const newResults = numbers.map((item, index) => item * multipliers[index]);
    const newRatioNumbers = numbers.map((item, index) => item * ratio);
    const newRatioResults = newRatioNumbers.map(
        (item, index) => item * multipliers[index]
    );
    setResults(newResults);
    setRatioNumbers(newRatioNumbers);
    setRatioResults(newRatioResults);
  }, [numbers, multipliers, ratio]);

  return (
      <div className="App">
        <Title level={4}>Коэффициент:</Title>
        <InputNumber
            value={ratio}
            size="large"
            onChange={handleRatioChange}
            className="App__ratio"
        />
        <Title level={4}>Строки:</Title>
        {numbers.map((_, index) => (
            <div className="App__row">
              <InputNumber
                  value={numbers[index]}
                  size="large"
                  onChange={handleNumberChange(index)}
                  className="App__rowInput"
              />
              <Text size="large">X</Text>
              <InputNumber
                  value={multipliers[index]}
                  size="large"
                  onChange={handleMultiplierChange(index)}
                  className="App__rowInput"
              />
              <Text>=</Text>
              <Text>{results[index] || ""}</Text>
            </div>
        ))}
        <Title level={4}>Сумма:</Title>
        <div className="App__row">
          <InputNumber
              value={numbers.reduce((a, b) => a + b, 0)}
              size="large"
              disabled={true}
              className="App__rowInput"
          />
          <Text size="large">X</Text>
          <InputNumber
              value={multipliers.reduce((a, b) => a + b, 0)}
              size="large"
              disabled={true}
              className="App__rowInput"
          />
          <Text>=</Text>
          <Text>{results.reduce((a, b) => a + b, 0)}</Text>
        </div>
        <Title level={4}>Результат без коэффициента:</Title>
        <Text>
          {results.reduce((a, b) => a + b, 0) +
              numbers.reduce((a, b) => a + b, 0)}
        </Text>
        <Title level={4}>Результат c коэффициентом:</Title>
        <Text>
          {ratioResults.reduce((a, b) => a + b, 0) +
              ratioNumbers.reduce((a, b) => a + b, 0)}
        </Text>
      </div>
  );
};

export default App;
