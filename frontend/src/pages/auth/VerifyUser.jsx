import { useState } from "react";
import { useCodeInputs } from "../../hooks/useCodeInputs";
import { useResendTimer } from "../../hooks/useResendTimer";
import SidePanel from "./components/SidePanel";
import CodeInput from "./components/CodeInput";

import { FaDumbbell } from "react-icons/fa6";
import { BiSolidEditAlt } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import * as yup from "yup";

const VerifyAccount = () => {
  const user = "johndoe@gmail.com";

  const emailSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const [userEmail, setUserEmail] = useState(user);
  const [emailEditable, setEmailEditable] = useState(false);

  const { values, isComplete, handleChange, handleKeyDown, inputRefs } =
    useCodeInputs();
  const { timeLeft, formatTime, resendAvailable, resetTimer } =
    useResendTimer();

  const handleChangeEmail = async () => {
    // Prevent submitting the same email
    if (userEmail === user) {
      return Swal.fire("No Changes", "You entered the same email.", "info");
    }

    try {
      await emailSchema.validate({ email: userEmail });

      Swal.fire({
        title: "Are you sure ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Yes! Edit my email",
      }).then((result) => {
        if (result.isConfirmed) {
          ///send new email to backend
          console.log("Changed Email to :" + userEmail);
        } else if (result.isDenied) {
          //reset to current email
          setUserEmail(user);
        }
      });
    } catch (error) {
      Swal.fire("Invalid Email", error.message, "error");
    }
  };

  const handleResendCode = async () => {
    // Call your resend function (e.g., API request)
    // await resendCode(); // <- You’ll need to define this

    // Reset the timer
    if (resendAvailable) {
      // Trigger resend logic
      resetTimer();
    }
  };

  return (
    <div className="h-dvh flex">
      <div className="h-full lg:w-1/2 w-full flex flex-col">
        <div className="flex items-center lg:p-3 p-1">
          <FaDumbbell className="sm:size-8 size-7 text-red-secondary rotate-90" />
          <p className="sm:text-4xl text-3xl font-secondary">Homefit</p>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-secondary sm:text-5xl text-4xl mb-2">Check your inbox</h1>
            <p className="sm:text-xl text-lg sm:text-start text-center">
              We have sent you a verification code via email
            </p>
          </div>

          <div className="flex justify-center sm:text-2xl text-base gap-2 sm:mt-2 mt-6">
            <input
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={!emailEditable}
              className={`text-center outline-0 py-1 border-black rounded-xl ${
                emailEditable ? "border-2 bg-gray-200" : "border-1"
              }`}
            />
            {emailEditable && (
              <button
                onClick={handleChangeEmail}
                className={`text-red-secondary sm:text-2xl text-xl ${
                  emailEditable ? "inline" : "hidden"
                }`}
              >
                <BsSendFill />
              </button>
            )}

            {emailEditable ? (
              <button
                onClick={() => {
                  setEmailEditable(false);
                  setUserEmail(user);
                }}
                className={`text-red-secondary sm:text-4xl text-2xl`}
              >
                <IoCloseSharp />
              </button>
            ) : (
              <button
                onClick={() => setEmailEditable(true)}
                className="text-red-secondary sm:text-3xl text-2xl"
              >
                <BiSolidEditAlt />
              </button>
            )}
          </div>

          <form className="flex flex-col justify-center items-center gap-5 my-9">
            <div className="flex flex-row sm:gap-3 gap-2">
              {values.map((val, index) => (
                <CodeInput
                  key={index}
                  value={val}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>

            <div className="w-full sm:text-lg text-sm flex flex-row justify-between items-center ">
              <div>
                Can&apos;t find the code?
                <button
                  onClick={handleResendCode}
                  disabled={!resendAvailable}
                  className={`ml-2 underline transition-opacity ${
                    !resendAvailable
                      ? "text-gray-400 cursor-not-allowed opacity-50"
                      : "text-red-secondary hover:opacity-80"
                  }`}
                >
                  Resend
                </button>
              </div>

              <div>{formatTime(timeLeft)}</div>
            </div>

            <button
              disabled={!isComplete}
              className={`w-full font-secondary text-2xl p-2 rounded-sm mt-4 ${
                isComplete
                  ? "bg-red-secondary text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
      <SidePanel />
    </div>
  );
};

export default VerifyAccount;
