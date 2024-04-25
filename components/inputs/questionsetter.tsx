import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MinusCircle, PlusCircle } from "lucide-react";
import { H5 } from "../ui/textui";

const DetailsSetter = ({ questions, product, setProduct }: any) => {
  const handleQuestions = (e: any, i: number) => {
    const { name, value } = e.target;
    const newQuestions = [...questions];
    newQuestions[i][name] = value;
    setProduct({ ...product, questions: newQuestions });
  };

  const handleRemove = (i: number) => {
    if (questions.length > 0) {
      const newQuestions = [...questions];
      newQuestions.splice(i, 1);
      setProduct({ ...product, questions: newQuestions });
    }
  };
  console.log("product questions : ", product.questions);
  return (
    <div>
      {questions.length <= 0 ? (
        <Button
          type="button"
          variant="ghost"
          size="default"
          className="flex items-center gap-2"
          onClick={() => {
            setProduct({
              ...product,
              questions: [...questions, { question: "", answer: "" }],
            });
          }}
        >
          <PlusCircle /> <span>Add Questions</span>
        </Button>
      ) : (
        <H5>Questions</H5>
      )}
      {questions
        ? questions.map((detail: any, i: number) => (
            <div className="flex gap-4 items-center mt-2" key={i}>
              <Input
                type="text"
                name="question"
                placeholder="question"
                value={detail.question}
                onChange={(e) => handleQuestions(e, i)}
              />
              <Input
                type="text"
                name="answer"
                placeholder="answer"
                value={detail.answer}
                onChange={(e) => handleQuestions(e, i)}
              />

              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(i)}
                >
                  <MinusCircle />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setProduct({
                      ...product,
                      questions: [...questions, { question: "", answer: "" }],
                    });
                  }}
                >
                  <PlusCircle />
                </Button>
              </>
            </div>
          ))
        : null}
    </div>
  );
};

export default DetailsSetter;
