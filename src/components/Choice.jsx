import React from "react";
import ReactMarkdown from "react-markdown";
import {marked} from "marked";
import {decode} from "base-64"

export default function Choice(props) {

    // deconstruct props
    const {quiz} = props;

     const AnswerSingleChoiceComponent = (props) => {
        const {quiz} = props;
        const choices = decode(quiz.choices).split(",");

        return (
            <div>
                {choices.map((r, i) => (
                    <React.Fragment key={i}>
                        <input type="radio" name="answer"/>
                        &nbsp;
                        <label>{r}</label>
                        <br/>
                    </React.Fragment>
                ))}
            </div>
        );

    };
    const AnswerMultipleChoiceComponent = (props) => {
        const {quiz} = props;
        const choices = decode(quiz.choices).split(",");

        return (
            <div>
                {choices.map((r, i) => (
                    <React.Fragment key={i}>
                        <input type="checkbox" name="answer"/>
                        &nbsp;
                        <label>{r}</label>
                        <br/>
                    </React.Fragment>
                ))}
            </div>
        );

    };

    const AnswerGapTextComponent = (props) => {
        const {quiz} = props;
        const choices = decode(quiz.choices).split(",");

        return (
            <div>
                {choices.map((r, i) => (
                    <React.Fragment key={i}>
                        <div>
                            <label>Ihre Antwort {i + 1}:</label>
                            <br/>
                            <input type="text"/>
                            <br/>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        );
    };


    const AnswerComponent = (props) => {
        const {quiz} = props
        let answerContent;

        switch (quiz.type) {
            case 'singleChoice':
                answerContent = ( <AnswerSingleChoiceComponent quiz={quiz} /> )
                break
            case 'multipleChoice':
                answerContent = ( <AnswerMultipleChoiceComponent quiz={quiz}/>)
                break
            case 'gapText':
                answerContent = ( <AnswerGapTextComponent quiz={quiz}/>)
                break
            default:
                answerContent = (<AnswerSingleChoiceComponent quiz={quiz}/>)
                break

        }

        return answerContent

    }

    const html = marked(decode(quiz.content));
    const isSingleChoice = quiz.type === 'singleChoice'
    const isGapText = quiz.type === 'gapText'
    return (

        <div className="card" style={{marginBottom: 20}}>
            <div className="card-header">Frage Nr. {props.quiz.id}</div>
           {/* <div className="card-body">
                <ReactMarkdown>{decode(quiz.content)}</ReactMarkdown>
            </div>
            <h5> Render the decoded string using dangerouslySetInnerHTML</h5>*/}
            <div className="card-body" dangerouslySetInnerHTML={{__html: html}}/>

            <div className="card-footer">

              {/*  {isSingleChoice ? (
                    <AnswerSingleChoiceComponent quiz={quiz}/>
                ) : (<AnswerMultipleChoiceComponent quiz={quiz}/>)}

                {isGapText ? (<AnswerGapTextComponent quiz={quiz}/>
                ) : (<AnswerGapTextComponent quiz={quiz}/>)

                }*/}

                <AnswerComponent quiz={quiz} />
            </div>
        </div>
    );
}
