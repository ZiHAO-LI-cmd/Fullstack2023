import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Button = (props) => {
  return <button onClick={props.func}>{props.text}</button>;
};
const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good}></StatisticLine>
            <StatisticLine text={"neutral"} value={neutral}></StatisticLine>
            <StatisticLine text={"bad"} value={bad}></StatisticLine>
            <StatisticLine
              text={"all"}
              value={good + neutral + bad}
            ></StatisticLine>
            <StatisticLine
              text={"average"}
              value={(good * 1 + bad * -1) / 3}
            ></StatisticLine>
            <StatisticLine
              text={"positive"}
              value={((100 * good) / (good + neutral + bad)).toFixed(2) + "%"}
            ></StatisticLine>
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} func={handleGoodClick}></Button>
      <Button text={"neutral"} func={handleNeutralClick}></Button>
      <Button text={"bad"} func={handleBadClick}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
