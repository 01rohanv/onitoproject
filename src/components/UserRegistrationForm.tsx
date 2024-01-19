import React from "react";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setData, setStep, setUserData } from "../redux/userSlice";

const UserRegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  const { step, userData, storeData } = useSelector(
    (state: RootState) => state.user
  );

  console.log(storeData, "storeData");

  const hanleSubmitStep1 = (data: any) => {
    dispatch(setData(data));
    dispatch(setStep(2));
  };
  const hanleSubmitStep2 = (data: any) => {
    let payload = {
      ...storeData,
      address: data?.address,
      state: data?.state,
      city: data?.city,
      country: data?.country,
      pincode: data?.pincode,
    };
    dispatch(setUserData([...userData, payload]));
    dispatch(setStep(1));
  };
  return (
    <div>
      {step === 1 && <Step1Form onSubmit={hanleSubmitStep1} />}
      {step === 2 && <Step2Form onSubmit={hanleSubmitStep2} />}
    </div>
  );
};

export default UserRegistrationForm;
