import { useState } from "react";
import { CHOICES, ROUNDS, verdict } from "../../data/game.js";
import { useReducedMotion } from "../../hooks/useMediaQuery.js";
import { confettiBurst } from "../../lib/fx.js";
import { cx } from "../../lib/cx.js";
import Button from "../ui/Button.jsx";
import Ghost from "../ui/Ghost.jsx";
import Reveal from "../ui/Reveal.jsx";
import s from "./Game.module.css";

const TOTAL = ROUNDS.length;

export default function Game() {
  const [phase, setPhase] = useState("intro");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [picked, setPicked] = useState(null);
  const [fact, setFact] = useState("");
  const reduced = useReducedMotion();

  const round = ROUNDS[index];
  const meter = ((answered ? index + 1 : index) / TOTAL) * 100;

  const start = () => {
    ROUNDS.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
    setIndex(0);
    setScore(0);
    setAnswered(false);
    setPicked(null);
    setFact("");
    setPhase("play");
  };

  const onChoice = (pick) => {
    if (answered) return;
    const correct = pick === round.answer;
    setAnswered(true);
    setPicked(pick);
    if (correct) setScore((value) => value + 1);
    setFact((correct ? "✦ Correct — " : "✖ Not quite — ") + round.fact);
  };

  const onNext = () => {
    if (index === TOTAL - 1) {
      setPhase("end");
      if (score >= TOTAL - 2) confettiBurst(110, reduced);
    } else {
      setIndex((value) => value + 1);
      setAnswered(false);
      setPicked(null);
      setFact("");
    }
  };

  const [verdictTitle, verdictLine] = verdict(score, TOTAL);

  return (
    <section className="section" id="game">
      <Ghost>08</Ghost>
      <Reveal className={s.panel}>
        <div className={s.halo} aria-hidden="true" />

        {phase === "intro" ? (
          <div className={s.intro}>
            <p className="eyebrow">✦ Guess the planet · mission briefing ✦</p>
            <h2 className="section__title">
              Can you tell Earth from <span className="grad grad--hyper">its twins?</span>
            </h2>
            <p className="section__lede">Twelve photos. Three worlds. Some of these are Earth in disguise.</p>
            <Button size="big" magnetic onClick={start} id="gameStart" aria-label="Start the game">
              ▶ Start the game
            </Button>
            <p className={s.hint}>+100 PTS PER CORRECT · STREAK BONUS · NO SECOND CHANCES</p>
          </div>
        ) : null}

        {phase === "play" ? (
          <div className={s.play}>
            <div className={s.hud}>
              <span>
                Round {index + 1} / {TOTAL}
              </span>
              <span className={s.meter}>
                <i style={{ width: `${meter}%` }} />
              </span>
              <span className={s.score}>Score {score}</span>
            </div>
            <div className={s.stage}>
              <img key={index} className={s.isFlip} src={round.src} alt={round.alt} />
              <span className={s.scan} aria-hidden="true" />
            </div>
            <p className={s.question}>Which world is this?</p>
            <div className={s.choices}>
              {CHOICES.map((choice) => {
                const correct = answered && choice.pick === round.answer;
                const wrong = answered && choice.pick === picked && picked !== round.answer;
                return (
                  <button
                    key={choice.pick}
                    type="button"
                    data-pick={choice.pick}
                    disabled={answered}
                    className={cx(correct && s.isCorrect, wrong && s.isWrong)}
                    onClick={() => onChoice(choice.pick)}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>
            <p className={s.fact} aria-live="polite">
              {fact}
            </p>
            {answered ? (
              <Button className={s.next} magnetic onClick={onNext} id="gameNext">
                {index === TOTAL - 1 ? "See results →" : "Next →"}
              </Button>
            ) : null}
          </div>
        ) : null}

        {phase === "end" ? (
          <div className={s.end}>
            <h2 className="section__title">{verdictTitle}</h2>
            <p className={s.finalScore}>
              {score} / {TOTAL}
            </p>
            <p className="section__lede">{verdictLine}</p>
            <Button magnetic onClick={start}>
              ↻ Play again
            </Button>
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}
