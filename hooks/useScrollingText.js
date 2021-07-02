import { useState, useEffect } from "react";
import { options } from "utils/scrolling-text";
const START = -10000;

const useScrollingText = (canvasRef, text) => {
  const [sections, setSections] = useState([]);
  const [lines, setLines] = useState([]);
  const [startingPosition, setStartingPosition] = useState(START);
  const [endingPosition, setEndingPosition] = useState(START);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (Array.isArray(text)) {
      if (text.length > 0) {
        setSections(text);
      } else {
        setSections([]);
      }
    } else {
      setSections([text]);
    }
  }, [text]);

  useEffect(() => {
    const formatLines = () => {
      let tmpLines = [];
      // const canvas = canvasRef.current;
      // const ctx = canvas.getContext('2d');

      sections.forEach(section => {
        let words = section.toUpperCase().split(" ");
        let line = "";
        let space = "";
        while (words.length > 0) {
          let word = words.shift();
          // let width = ctx.measureText(line + space + word).width;
          let width = canvasRef.current
            .getContext("2d")
            .measureText(line + space + word).width;
          // if (width < canvas.width - options.padding * 2) {
          if (width < canvasRef.current.width - options.padding * 2) {
            line += space + word;
            space = " ";
          } else {
            if (space === "") {
              line += word;
            } else {
              words.unshift(word);
            }
            tmpLines.push(line);
            space = "";
            line = "";
          }
        }
        if (line !== "") {
          tmpLines.push(line);
        }
        tmpLines.push(" ");
      });
      tmpLines.pop();
      setLines(tmpLines);
    };

    if (sections.length > 0 && canvasRef.current) {
      formatLines();
    }
  }, [sections, canvasRef]);

  useEffect(() => {
    const setPositions = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.font = options.font;
      const lineHeight = options.fontSize + options.leading;
      const totalLines = lines.length + options.bleed;
      const end = -totalLines * lineHeight;
      setStartingPosition(canvas.height);
      setEndingPosition(end);
    };

    if (lines.length > 0) {
      setPositions();
    }
  }, [lines, canvasRef]);

  useEffect(() => {
    let requestId;
    let currentPosition = startingPosition;

    const render = () => {
      const canvas = canvasRef.current;
      if(canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = options.font;
        ctx.fillStyle = options.textColor;
        ctx.strokeStyle = options.outlineColor;
        let currX = 0;
        let currY = currentPosition;
        lines.forEach(line => {
          currX = Math.floor((canvas.width - ctx.measureText(line).width) / 2);
          currY += options.fontSize + options.leading;
          ctx.fillText(line, currX, currY);
          ctx.strokeText(line, currX, currY);
        });
        if (currentPosition > endingPosition) {
          currentPosition -= options.rate;
          requestId = requestAnimationFrame(render);
        } else {
          // setSections([]);
          // setLines([]);
          // setStartingPosition(START);
          // setEndingPosition(START);

          cancelAnimationFrame(requestId);
          setDone(true);
        }
      }
      
    };

    if (
      startingPosition !== START &&
      endingPosition !== START &&
      lines.length > 0
    ) {
      render();
    }

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [startingPosition, endingPosition, lines, canvasRef]);

  return done;
};

export default useScrollingText;
