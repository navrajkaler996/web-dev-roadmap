import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
const ProgressStepBar = () => {
  return (
    <ProgressSteps
      activeStepIconBorderColor="#2BC0E4"
      //   progressBarColor="#2BC0E4"
      activeLabelColor="#000"
      labelFontFamily="font-family-1">
      <ProgressStep
        nextBtnStyle={{ display: "none" }}
        label="Beginner"></ProgressStep>
      <ProgressStep
        nextBtnStyle={{ display: "none" }}
        label="Intermediate"></ProgressStep>
      <ProgressStep
        nextBtnStyle={{ display: "none" }}
        label="Advanced"></ProgressStep>
    </ProgressSteps>
  );
};

export default ProgressStepBar;
