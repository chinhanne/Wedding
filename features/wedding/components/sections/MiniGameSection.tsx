'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { miniGameQuestions } from '../../constants/wedding';
import { WeddingIcons } from '../icons/WeddingIcons';

export function MiniGameSection() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);

  const currentQuestion = miniGameQuestions[questionIndex];

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  if (!currentQuestion) return null;

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;

    const isCorrect = optionIndex === currentQuestion.answerIndex;
    const isLastQuestion = questionIndex === miniGameQuestions.length - 1;

    setSelectedAnswer(optionIndex);

    transitionTimerRef.current = window.setTimeout(() => {
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      if (isLastQuestion) {
        setFinished(true);
      } else {
        setQuestionIndex((prev) => prev + 1);
      }

      setSelectedAnswer(null);
      transitionTimerRef.current = null;
    }, 700);
  };

  const resetGame = () => {
    setQuestionIndex(0);
    setScore(0);
    setFinished(false);
    setSelectedAnswer(null);
  };

  return (
    <section id="mini-game" className="w-full min-w-0 max-w-full lg:h-full">
      <div className="section-card flex w-full max-w-full min-w-0 lg:h-full flex-col justify-between p-3.5 sm:p-6 overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center mb-2">
          <p className="font-script text-2xl sm:text-3xl text-rose-500">
            Thử thách vui
          </p>
          <h2 className="section-title text-2xl sm:text-3xl font-bold tracking-tight">
            Bạn Hiểu Tụi Mình Bao Nhiêu?
          </h2>
          <p className="mt-0.5 text-sm text-stone-500 font-normal">
            Trả lời nhanh các câu hỏi trắc nghiệm dễ thương nha
          </p>
        </div>

        {!finished ? (
          <div className="my-1 flex flex-1 flex-col justify-between w-full min-w-0">
            {/* Question Card */}
            <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-3 sm:p-4 text-center shadow-xs w-full max-w-full overflow-hidden break-words">
              <span className="inline-block rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                Câu {questionIndex + 1} / {miniGameQuestions.length}
              </span>
              <p className="mt-1.5 font-playfair text-base sm:text-lg font-bold text-stone-800 break-words">
                {currentQuestion.question}
              </p>
            </div>

            {/* Answer Options */}
            <div className="my-2.5 grid gap-2 w-full min-w-0">
              {currentQuestion.options.map((option, index) => {
                const isCorrectAnswer =
                  selectedAnswer !== null &&
                  index === currentQuestion.answerIndex;
                const isWrongSelection =
                  selectedAnswer === index &&
                  index !== currentQuestion.answerIndex;

                return (
                  <Button
                    key={option}
                    type="default"
                    disabled={selectedAnswer !== null}
                    onClick={(event) => {
                      event.currentTarget.blur();
                      handleAnswer(index);
                    }}
                    className={`mini-game-option h-auto! min-h-11! justify-between! rounded-xl! px-3! sm:px-3.5! py-2.5! text-left! text-base! font-medium! w-full! max-w-full! overflow-hidden! ${
                      isCorrectAnswer ? 'is-correct' : ''
                    } ${isWrongSelection ? 'is-wrong' : ''}`}
                  >
                    <span className="font-medium text-stone-800 text-base truncate min-w-0 flex-1">{option}</span>
                    {isCorrectAnswer && (
                      <span className="font-bold text-emerald-600 shrink-0 ml-1">✓ Đúng</span>
                    )}
                    {isWrongSelection && (
                      <span className="font-bold text-rose-600 shrink-0 ml-1">× Chưa đúng</span>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Progress feedback */}
            <div className="rounded-xl bg-rose-50/40 p-2 text-center text-sm font-semibold text-stone-700 w-full" aria-live="polite">
              {selectedAnswer === null ? (
                <span>Chọn 1 đáp án để tiếp tục ✨</span>
              ) : selectedAnswer === currentQuestion.answerIndex ? (
                <span className="text-emerald-600 font-bold">Chính xác! Tuyệt vời quá 🎉</span>
              ) : (
                <span className="text-rose-600 font-bold">Tiếc quá! Đáp án xanh mới chính xác nha 🌸</span>
              )}
            </div>
          </div>
        ) : (
          <div className="my-auto text-center py-4 w-full">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-2xl text-rose-500 shadow-inner">
              <WeddingIcons.heart />
            </div>

            <h3 className="font-playfair text-xl font-bold text-stone-800">
              Hoàn Thành Thử Thách!
            </h3>

            <p className="mt-1 text-base font-bold text-rose-600">
              Bạn đã trả lời đúng {score} / {miniGameQuestions.length} câu hỏi
            </p>

            <p className="mt-1 text-sm text-stone-600 max-w-sm mx-auto leading-relaxed break-words">
              {score >= miniGameQuestions.length - 1
                ? 'Đúng là bạn thân chí cốt! Tụi mình rất xúc động và cảm ơn bạn nhiều lắm!'
                : 'Dù đúng hay sai thì bạn vẫn luôn là vị khách quý tuyệt vời nhất của tụi mình nha!'}
            </p>

            <Button
              type="primary"
              onClick={resetGame}
              className="
                mt-4!
                h-10!
                rounded-full!
                bg-gradient-to-r!
                from-rose-500!
                to-pink-500!
                px-6!
                text-base!
                font-bold!
                shadow-md!
              "
            >
              Chơi Lại Lần Nữa
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
