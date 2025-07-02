import React, { useState, useEffect } from "react";
import "./App.css";
import { Timer } from "lucide-react";
import axios from "axios";

const api_url = "https://api.api-ninjas.com/v1/quotes";

// Thoughts
//Fetch random sentence from the API
//Maybe start with hardcoded sentence for now? - Display it
//Create an input field - DONE
//Display a timer on screen - DONE
//Start the timer when the input is not empty - DONE
//Is the length of the input more than 0? Does it exist? Is it not empty? WHAT? DONE
//As soon as the sentence is complete stop the timer - DONE
//When input === sentence stop the timer - how will this be matched? Does it need to be capitalised and all that jazz? DONE
//Restart button, show the button when the sentence is complete? Start a new round? Fetch a new sentence? Would be nice to have it there all the time - DONE

//TODO
//turn off auto-fill in the input box
// Difficulty settings? Case sensitive? toLower() easy mode - exact match?
// fetch a random sentence from the API
//look into requestAnimationFrame
// anytime a letter goes green count it and anttime it goes red count it as an error then calculate the accuracy
//Next Button? Fetches a new one
// Refactor?
//Unit Tests

async function fetchQuote() {
  try {
    const response = await axios.get(api_url, {
      headers: {
        "X-Api-Key": process.env.REACT_APP_API_KEY || "",
        "Content-Type": "application/json",
      },
    });
    console.log("Quote data:", response.data);
    return (
      response.data[0]?.quote || "The quick brown fox jumps over the lazy dog"
    );
  } catch (error: any) {
    console.error(
      "Error fetching quote:",
      error.response?.data || error.message
    );
    console.error("Status:", error.response?.status);
    return "The quick brown fox jumps over the lazy dog";
  }
}

function Stopwatch({ time }: { time: number }) {
  // Convert milliseconds to MM:SS:CS format
  function formatTime(ms: number) {
    const totalCentiseconds = Math.floor(ms / 10);
    const minutes = Math.floor(totalCentiseconds / 6000);
    const seconds = Math.floor((totalCentiseconds % 6000) / 100);
    const centiseconds = totalCentiseconds % 100;

    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");
    const cs = centiseconds.toString().padStart(2, "0");

    return `${mm}:${ss}:${cs}`;
  }

  return (
    <div>
      <div>{formatTime(time)}</div>
    </div>
  );
}

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [finalWpm, setFinalWpm] = useState<number | null>(null);
  const [sentence, setSentence] = useState(
    "The quick brown fox jumps over the lazy dog"
  );
  const [loading, setLoading] = useState(false);

  // Fetch quote on component mount
  useEffect(() => {
    loadNewQuote();
  }, []);

  const loadNewQuote = async () => {
    setLoading(true);
    const quote = await fetchQuote();
    setSentence(quote);
    setLoading(false);
  };

  useEffect(() => {
    if (textInput.length > 0 && !isRunning && textInput !== sentence) {
      setIsRunning(true);
    }
    if ((textInput.length === 0 && isRunning) || textInput === sentence) {
      setIsRunning(false);
    }
  }, [textInput, isRunning, sentence]);

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Calculate WPM
  const minutes = time / 60000;
  const wordsTyped =
    textInput.trim().length === 0 ? 0 : textInput.trim().split(/\s+/).length;
  const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;

  useEffect(() => {
    if (textInput === sentence) {
      setIsRunning(false);
      setFinalWpm(wpm);
    }
  }, [textInput, sentence, wpm]);

  const restart = async () => {
    setTextInput("");
    setTime(0);
    setIsRunning(false);
    setFinalWpm(null);
    await loadNewQuote(); // Load a new quote on restart
  };

  return (
    <div className="dashboard-container">
      <h1 className="sentence-title">Test Your Typing Speed and Accuracy</h1>
      <div className="top-row">
        <div className="timer-container">
          <div className="timer-row">
            <Timer className="timer-icon" />
            <Stopwatch time={time} />
          </div>
        </div>

        <div className="words-per-minute-container">
          <p className="wpm-title">Words Per Minute</p>
          <p>{finalWpm !== null ? finalWpm : wpm}</p>
        </div>
      </div>

      <div className="type-test-container">
        {loading ? (
          <p className="test-sentence">Loading new quote...</p>
        ) : (
          <p className="test-sentence">
            {sentence.split("").map((char, i) => {
              let className = "test-sentence";
              if (textInput[i] !== undefined) {
                className =
                  textInput[i] === char ? "correct-letter" : "incorrect-letter";
              }
              return (
                <span key={i} className={className}>
                  {char}
                </span>
              );
            })}
          </p>
        )}
        <input
          className="input-box"
          value={textInput}
          type="text"
          name="inputBox"
          onChange={(e) => setTextInput(e.target.value)}
          disabled={loading}
          autoComplete="off"
          spellCheck="false"
        />
        <button className="restart-button" onClick={restart} disabled={loading}>
          {loading ? "Loading..." : "New Quote"}
        </button>
      </div>
    </div>
  );
}
