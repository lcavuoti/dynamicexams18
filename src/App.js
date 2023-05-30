import React from "react";
import { useEffect, useState } from "react";
import SingleChoice from "./components/SingleChoice";
import Choice from "./components/Choice";
import "./App.css";

const myQuiz = [
  {
    id: 0,
    type: "singleChoice",
    content:
      "IyBLb25zdHJ1a3RvcmVuCkdlZ2ViZW4gaXN0IGRpZSBmb2xnZW5kZSBLbGFzc2U6CgpgYGBqYXZhCmNsYXNzIEJpa2UgewogIHByaXZhdGUgaW50IHBvd2VyOwp9CmBgYApXZWxjaGVyIGRlciBmb2xnZW5kZW4gVm9yc2NobMOkZ2UgZW50c3ByaWNodCBlaW5lbSBnw7xsdGlnZW4gS29uc3RydWt0b3IuCgotLS0KVm9yc2NobGFnIDE6CmBgYGphdmEKcHVibGljIGNsYXNzIEJpa2Ugewp9CmBgYAotLS0KVm9yc2NobGFnIDI6CmBgYGphdmEKcHVibGljIENhcigpIHsKICAgIHRoaXMucG93ZXIgPSAwOwp9CmBgYAotLS0KVm9yc2NobGFnIDM6CmBgYGphdmEKcHVibGljIHBvd2VyKCkgewp9CmBgYA==",
    choices:
      "IlZvcnNjaGxhZyAxIiwgCiAgICAgICAgIlZvcnNjaGxhZyAyIiwgCiAgICAgICAgIlZvcnNjaGxhZyAzIg==",
    solution: "MQ==",
  },
  {
    id: 1,
    type: "multipleChoice",
    content:
      "IyBLb25zdHJ1a3RvcmVuCkdlZ2ViZW4gaXN0IGRlciBmb2xnZW5kZSBLb25zdHJ1a3RvcjoKCmBgYGphdmEKcHVibGljIFhZWlVpKFN0cmluZyBzdGF0ZSwgaW50IG5vZGUpIHsKCXRoaXMuc3RhdGUgPSBzdGF0ZTsKCXRoaXMubm9kZSA9IG5vZGU7Cn0KYGBgCsOcYmVybGVnZW4gU2llIHNpY2ggd2llIGRpZSBFaWdlbnNjaGFmdGVuIGRlciBLbGFzc2UgZGVmaW5pZXJ0IHNlaW4gbcO8c3Nlbiwgd2VubiBkaWVzZXIgS29uc3RydWt0b3IgU2lubiBtYWNoZW4gc29sbC4gU2NocmVpYmVuIFNpZSBkaWUgS2xhc3NlIGF1Zi4KCi0tLQpWb3JzY2hsYWcgMToKYGBgamF2YQpwcml2YXRlIFN0cmluZyBzdGF0ZTsKcHJpdmF0ZSBpbnQgbm9kZTsKYGBgCi0tLQpWb3JzY2hsYWcgMjoKYGBgamF2YQpwcml2YXRlIFN0cmluZyBzdGF0ZTsKcHJpdmF0ZSBTdHJpbmcgbm9kZTsKYGBgCi0tLQpWb3JzY2hsYWcgMzoKYGBgamF2YQpwcml2YXRlIGludCBzdGF0ZTsKcHJpdmF0ZSBTdHJpbmcgbm9kZTsKYGBg",
    choices: "WyJQaXp6YSIsICJSQU0iLCAiUk9NIl0=",
    solution: "WzEsMl0=",
  },
  {
    id: 2,
    type: "multipleChoice",
    content:
      "IyBLb25zdHJ1a3RvcmVuCkRlZmluaWVyZW4gU2llIGbDvHIgZGllIGZvbGdlbmRlIEtsYXNzZSBlaW5lbiBLb25zdHJ1a3RvciBvaG5lIFBhcmFtZXRlcjoKCmBgYGphdmEKY2xhc3MgQmljeWNsZSB7Cn0KYGBg",
    choices: "bnVsbA==",
    solution:
      "WwogICAgICAgICJwdWJsaWMgQmljaWNsZSgpIHt9IiwKICAgICAgICAicHVibGljIEJpY2ljbGUoKSIKICAgIF0=",
  },
  {
    id: 3,
    type: "gapText",
    content:
      "IyBFbmdsaXNoIFRleHQKVmVydm9sbHN0w6RuZGlnZW4gU2llIGRlbiBUZXh0LCBpbmRlbSBTaWUgZGllIHBhc3NlbmRlbiBXw7ZydGVyIGJlaSBkZW4gTMO8Y2tlbiBlaW5zZXR6ZW4uCkdlZ2ViZW4gaXN0IGRlciBmb2xnZW5kZSBUZXh0OgoKKDEpIGlzIHRoZSBwcm9jZXNzIG9mIGNvbnZlcnRpbmcgc3Bva2VuIHdvcmRzIGludG8gd3JpdHRlbiB0ZXh0LiBJdCdzIGEgY3J1Y2lhbCBza2lsbCBmb3IgYW55b25lIHdobyBuZWVkcyB0byB0YWtlICgyKSBvciBtYWtlICgzKSBvZiBpbXBvcnRhbnQgaW5mb3JtYXRpb24uIFRoZXJlIGFyZSBzZXZlcmFsIGRpZmZlcmVudCAoNCkgZm9yIGRvaW5nIHRoaXMsIGluY2x1ZGluZyBzaG9ydGhhbmQgYW5kIHR5cGluZy4gT25lIG9mIHRoZSBtb3N0IGltcG9ydGFudCB0aGluZ3MgdG8gcmVtZW1iZXIgd2hlbiAoNSkgaXMgdG8gc3RheSBmb2N1c2VkIGFuZCBhdm9pZCBkaXN0cmFjdGlvbnMuIFdpdGggZW5vdWdoIHByYWN0aWNlLCBhbnlvbmUgY2FuIGJlY29tZSBwcm9maWNpZW50IGluIHRoaXMgc2tpbGwgYW5kIHVzZSBpdCB0byB0aGVpciBhZHZhbnRhZ2UgaW4gYSB2YXJpZXR5IG9mICg2KS4=",
    choices:
      "WwogICAgICAicTE7VHJhbnNjcmlwdGlvbiIsIAogICAgICAicTI7bm90ZXMiLAogICAgICAicTM7cmVjb3JkcyIsCiAgICAgICJxNDttZXRob2RzIiwKICAgICAgInE1O3RyYW5zY3JpYmluZyIsCiAgICAgICJxNjtmaWVsZHMiCiAgICBd",
    solution:
      "WwogICAgICAicTE7VHJhbnNjcmlwdGlvbiIsIAogICAgICAicTI7bm90ZXMiLAogICAgICAicTM7cmVjb3JkcyIsCiAgICAgICJxNDttZXRob2RzIiwKICAgICAgInE1O3RyYW5zY3JpYmluZyIsCiAgICAgICJxNjtmaWVsZHMiCiAgICBd",
  },
];

export default function App() {
  /*  const questions = [
    process.env.PUBLIC_URL + "/questions/question-000001.md",
    process.env.PUBLIC_URL + "/questions/question-000002.md",
    process.env.PUBLIC_URL + "/questions/question-000003.md",
  ];*/
  const [questionNr, setQuestionNr] = useState(0);
  // const [filename, setFilename] = useState(questions[questionNr]);
  const [quiz, setQuiz] = useState(myQuiz);

  useEffect(() => {
    setQuiz(myQuiz);
    console.log(quiz[questionNr].type);
    // setFilename(myQuiz[questionNr]);
  }, [questionNr]);

  /* useEffect(() => {
    setFilename(questions[questionNr]);
  }, [questionNr]);
*/
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>clip interactive GmbH - Dynamic Exam</h1>
        </div>

        <div className="col-sm-12">
          {
            /* quiz.map((q, idx) => (
              <Choice number={idx} filename={filename} />
            ))
*/

            quiz[questionNr].type === "singleChoice" ? (
              <Choice quiz={quiz[questionNr]} />
            ) : (
              <Choice quiz={quiz[questionNr]} />
            )
          }

          <button
            className={"btn btn-secondary"}
            onClick={() => setQuestionNr((questionNr + 1) % quiz.length)}
          >
            weiter
          </button>
        </div>
      </div>
    </div>
  );
}
