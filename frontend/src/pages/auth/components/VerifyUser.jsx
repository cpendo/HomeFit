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
  const token = sessionStorage.getItem("token");

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
      sessionStorage.removeItem("token");
      resetTimer();
      navigate("/auth");
    } catch (error) {
      await Swal.fire(
        error?.data?.title || "Verification Failed!",
        error?.data?.message,
        "error"
      );
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
    <div className="flex-1 flex flex-col justify-center items-center px-4">
      <div className="flex flex-col justify-center items-center text-center mb-2">
        <h1 className="uppercase font-secondary sm:text-5xl text-4xl tracking-tight">
          Check your <span className="text-brand">inbox</span>.
        </h1>
        <p className="text-base sm:text-lg text-ink/70 font-light pt-2 max-w-md">
          We sent a verification pin to your email. Enter it below to confirm
          your account.
        </p>
      </div>

      <form className="flex flex-col justify-center items-center gap-5 my-9 w-full max-w-md">
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

        <div className="w-full text-sm sm:text-base flex flex-row justify-between items-center text-ink/70">
          <div>
            Can&apos;t find the code?
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!resendAvailable}
              className={`ml-2 underline transition-opacity ${
                !resendAvailable
                  ? "text-mute cursor-not-allowed opacity-50"
                  : "text-brand hover:opacity-80"
              }`}
            >
              Resend
            </button>
          </div>
          <div className="font-mono text-mute">{formatTime(timeLeft)}</div>
        </div>

        <button
          type="button"
          onClick={handleVerifyUser}
          disabled={!isComplete}
          className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-full font-medium mt-4 transition-colors duration-300 ${
            isComplete
              ? "bg-ink text-paper hover:bg-brand cursor-pointer"
              : "bg-line text-mute cursor-not-allowed"
          }`}
        >
          {isVerifying ? "Verifying…" : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyAccount;
