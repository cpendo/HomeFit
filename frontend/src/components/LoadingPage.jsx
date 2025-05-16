import bouncingCircles from "../assets/bouncing-circles.svg"

const LoadingPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-red-50">
        <img src={bouncingCircles} alt="" className="size-30"/>
    </div>
  )
}

export default LoadingPage