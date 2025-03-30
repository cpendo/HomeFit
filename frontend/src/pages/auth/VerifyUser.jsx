import { FaDumbbell } from "react-icons/fa6";
import spinner from "../../assets/fade-stagger-squares.svg";

import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router";
import { useVerifyUserQuery } from "../../features/users/usersApi";
import { useEffect } from "react";

const VerifyAccount = () => {
  const { token } = useParams();
  console.log(token);

  const { isLoading, isSuccess, isError } = useVerifyUserQuery(token, {
    skip: !token, // Ensures query doesn't run if token is missing
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) setTimeout(() => navigate("/login"), 1500);
  }, [isSuccess, navigate]);

  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <FaDumbbell className="size-28 text-red-secondary sm:size-32" />
      <h1 className="sm:text-4xl text-2xl uppercase font-secondary">
        Verify your Account
      </h1>
      {isLoading && <img src={spinner} alt="Loading..." className="size-40" />}
      {isError && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-red-600 mt-2 mb-4">Verification Failed. Try Again Later.</p>
          <Link to="/">
            <button className="bg-red-primary px-3 py-2 text-white text-2xl rounded-xs hover:bg-red-secondary">
              Home
            </button>
          </Link>
        </div>
      )}
      {isSuccess && (
        <p className="text-green-600">
          Verification Successful! Redirecting...
        </p>
      )}
    </div>
  );
};

export default VerifyAccount;
