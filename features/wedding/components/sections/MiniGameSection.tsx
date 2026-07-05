'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { miniGameQuestions } from '../../constants/wedding';
import { WeddingIcons } from '../icons/WeddingIcons';

export function MiniGameSection() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = miniGameQuestions[questionIndex];

  if (!currentQuestion) return null;

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === currentQuestion.answerIndex) {
      setScore((prev) => prev + 1);
    }

    const isLastQuestion = questionIndex === miniGameQuestions.length - 1;

    if (isLastQuestion) {
      setFinished(true);
      return;
    }

    setQuestionIndex((prev) => prev + 1);
  };

  const resetGame = () => {
    setQuestionIndex(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <section id="mini-game" className="w-full px-5 pb-8 md:px-5 lg:h-full lg:px-0 lg:pb-0"> 
      <div className="flex h-full flex-col rounded-4xl border border-rose-100 bg-linear-to-br from-rose-50 to-emerald-50 p-5 shadow-sm md:p-7 lg:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-rose-500 shadow-sm">
          {finished ? <WeddingIcons.trophy /> : <WeddingIcons.game />}
        </div>

        <h2 className="mt-3 text-center font-serif text-3xl italic text-rose-500">
          Mini game
        </h2>

        {!finished ? (
          <>
            <p className="mt-3 text-center font-semibold text-stone-700">
              {currentQuestion.question}
            </p>

            <div className="mt-5 grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={option}
                  type="default"
                  onClick={() => handleAnswer(index)}
                  className="h-auto! min-h-11 whitespace-normal rounded-2xl! py-2!"
                >
                  {option}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-5 text-center">
            <p className="text-lg font-semibold text-stone-800">
              Bạn đúng {score}/{miniGameQuestions.length} câu
            </p>

            <p className="mt-2 text-sm text-stone-500">
              Dù đúng hay sai thì vẫn được mời ăn cưới nha.
            </p>

            <Button type="primary" onClick={resetGame} className="mt-5">
              Chơi lại
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}