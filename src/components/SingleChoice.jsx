import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function SingleChoice(props) {
  const [question, setQuestion] = useState({ question: "", answer: {} });

  const getQuestionObj = (txt) => {
    const trigger = "[comment]: <> (";
    let question = txt.substring(0, txt.indexOf(trigger));
    let answer = txt.substring(txt.indexOf(trigger) + trigger.length);
    answer = JSON.parse(answer.substring(0, answer.length - 2));
    return { question, answer };
  };

  useEffect(() => {
    fetch(props.filename)
      .then((r) => r.text())
      .then((fileContent) => {
        setQuestion(getQuestionObj(fileContent));
      });
  }, [props.filename]);

  const AnswerComponent = () => {
    const answer = question.answer;
    if (question) {
      if (answer.type === "sc") {
        return (
          <div>
            {answer.answers.map((r, i) => (
              <React.Fragment key={i}>
                <input type="radio" />
                &nbsp;
                <label>{r}</label>
                <br />
              </React.Fragment>
            ))}
          </div>
        );
      } else if (answer.type === "mc") {
        return (
          <div>
            {answer.answers.map((r, i) => (
              <React.Fragment key={i}>
                <input type="checkbox" />
                &nbsp;
                <label>{r}</label>
                <br />
              </React.Fragment>
            ))}
          </div>
        );
      } else if (answer.type === "tl") {
        return (
          <div>
            <label>Ihre Antwort:</label>
            <br />
            <input type="text" />
            <br />
          </div>
        );
      }
      return <p>answers</p>;
    } else {
      return <p>loading...</p>;
    }
  };

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <div className="card-header">Frage Nr. {props.number}</div>
      <div className="card-body">
        <ReactMarkdown>{question.question}</ReactMarkdown>
      </div>
      <div className="card-footer">
        <AnswerComponent />
      </div>
    </div>
  );
}
