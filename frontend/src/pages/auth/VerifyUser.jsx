import { useCodeInputs } from "../../hooks/useCodeInputs";
import { useResendTimer } from "../../hooks/useResendTimer";
import SidePanel from "./components/SidePanel";
import CodeInput from "./components/CodeInput";

import { FaDumbbell } from "react-icons/fa6";
import { useVerifyUserMutation } from "../../features/users/usersApi";
//import Swal from "sweetalert2";

const VerifyAccount = () => {
  const [verifyUser, { isLoading }] = useVerifyUserMutation();

  const { values, isComplete, handleChange, handleKeyDown, inputRefs } =
    useCodeInputs();
  const { timeLeft, formatTime, resendAvailable, resetTimer } =
    useResendTimer();

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("verify_token");
    const pin = values.join("");

    const response = await verifyUser({token, pin})
    console.log(response)


    if (resendAvailable) {
      // Trigger resend logic
      resetTimer();
    }
  }

  const handleResendCode = async () => {
    
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
            <h1 className="font-secondary sm:text-5xl text-4xl mb-2">
              Check your inbox
            </h1>
            <p className="sm:text-xl text-lg sm:text-start text-center">
              We have sent you a verification pin via email
            </p>
          </div>

          <form className="flex flex-col justify-center items-center gap-5 my-9" onSubmit={handleVerifyUser}>
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
              } `}
            >
              {isLoading ? "Verifying" : "Verify"}
            </button>
          </form>
        </div>
      </div>
      <SidePanel />
    </div>
  );
};

export default VerifyAccount;
