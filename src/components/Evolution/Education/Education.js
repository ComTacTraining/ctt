import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateScrollingText } from "store/actions/ai";
import { getEducationPhrases } from "utils/education";

const Education = () => {
  const dispatch = useDispatch();
  const { faceToFaceCompleted, educationCompleted } = useSelector(
    state => state.ai
  );
  const {
    size,
    stories,
    occupancy,
    conditions,
    construction,
    entryEgress,
    survivability,
    fire,
    exhaust,
    flow,
    smoke,
    category
  } = useSelector(state => state.evolution);
  const { firstOnScene } = useSelector(state => state.user);

  useEffect(() => {
    if (faceToFaceCompleted && !educationCompleted) {
      const phrases = getEducationPhrases({
        firstOnScene,
        size,
        stories,
        occupancy,
        conditions,
        construction,
        entryEgress,
        survivability,
        fire,
        flow,
        exhaust,
        smoke,
        category
      });
      dispatch(updateScrollingText(phrases));
    }
  }, [
    faceToFaceCompleted,
    educationCompleted,
    firstOnScene,
    size,
    stories,
    occupancy,
    conditions,
    construction,
    entryEgress,
    survivability,
    fire,
    flow,
    exhaust,
    smoke,
    category,
    dispatch
  ]);

  return <div></div>;
};

export default Education;
