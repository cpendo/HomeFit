import CodeInput from "./CodeInput";
import { useCodeInputs } from "../../../hooks/useCodeInputs";
import { useResendTimer } from "../../../hooks/useResendTimer";
import {
  useResendPinMutation,
  useVerifyMutation,
} from "../../../features/users/usersApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VerifyAccount = () => {
  const token = sessionStorage.getItem("verify_token");

  const [verify, { isLoading: isVerifying }] = useVerifyMutation();
  const [resendPin] = useResendPinMutation();
  const navigate = useNavigate();

  const { values, isComplete, handleChange, handleKeyDown, inputRefs } =
    useCodeInputs();
  const { timeLeft, formatTime, resendAvailable, resetTimer } =
    useResendTimer();

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    const pin = values.join("");

    try {
      await verify({ token, pin }).unwrap();

      sessionStorage.removeItem("verify_token");
      resetTimer();
      navigate("/auth");
    } catch (error) {
      await Swal.fire("Verification Failed!", error?.data?.message, "error");

      if (error.status === 400 && error.data.redirect) {
        navigate("/auth");
      }
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await resendPin({ token }).unwrap();
      await Swal.fire(response.message, "", "success");

      resetTimer();
    } catch (error) {
      await Swal.fire("Resend Failed!", error?.data?.message, "error");

      if (error.status === 400 && error.data.redirect) {
        navigate("/auth");
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-secondary sm:text-5xl text-4xl mb-2">
          Check your inbox
        </h1>
        <p className="sm:text-xl text-lg sm:text-start text-center">
          We have sent you a verification pin via email
        </p>
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
              type="button"
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
          type="button"
          onClick={handleVerifyUser}
          disabled={!isComplete}
          className={`w-full font-secondary text-2xl p-2 rounded-sm mt-4 ${
            isComplete
              ? "bg-red-secondary text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          } `}
        >
          {isVerifying ? "Verifying" : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyAccount;
