import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Choice(props) {
  const [question, setQuestion] = useState({ question: "", answer: {} });

  // deconstruct props
  const { number, filename, quiz } = props;

  const getQuestionObj = (txt) => {
    const trigger = "[comment]: <> (";
    let question = txt.substring(0, txt.indexOf(trigger));
    //console.log(question);
    let answer = txt.substring(txt.indexOf(trigger) + trigger.length);
    answer = JSON.parse(answer.substring(0, answer.length - 2));
    return { question, answer };
  };
  /*
  useEffect(() => {
    fetch(props.filename)
      .then((r) => r.text())
      .then((fileContent) => {
        setQuestion(getQuestionObj(fileContent));
      });
  }, [props.filename]);
*/
  const AnswerComponent = (props) => {
    const { quiz } = props;
    const answer = quiz.id;
    const choices = atob(quiz.choices).split(",");

    //const choices = Array(choices1);
    //console.log(choices);

    return (
      <div>
        {choices.map((r, i) => (
          <React.Fragment key={i}>
            <input type="radio" name="answer" />
            &nbsp;
            <label>{r}</label>
            <br />
          </React.Fragment>
        ))}
      </div>
    );

    /*   if (question) {
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
    }*/
  };

  const SingleChoiceChoices = (props) => {
    const { quiz } = props;
    // console.log(quiz);
    if (quiz.type === "singleChoice") {
      return (
        <div>
          <h1>hey</h1>
          <p>{atob(quiz.choices)}</p>
        </div>
      );
    } else {
      return <div>hello</div>;
    }
  };

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <div className="card-header">Frage Nr. {props.quiz.id}</div>
      <div className="card-body">
        <ReactMarkdown>{atob(quiz.content)}</ReactMarkdown>
        {console.log(atob(quiz.content))}
      </div>
      <div className="card-footer">
        <AnswerComponent quiz={quiz} />
        {
          //quiz.type === "singleChoice" ? <AnswerComponent /> : <div>hey</div>
        }
      </div>
    </div>
  );
}
