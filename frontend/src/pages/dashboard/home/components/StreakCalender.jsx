import { DayPicker } from 'react-day-picker'
import "react-day-picker/style.css";

const StreakCalender = () => {
  return (
    <div className="w-full flex justify-center py-2 bg-white rounded-sm ">
        <DayPicker
          mode="single"
          selected={new Date()}
          disabled //use this to disable days in the past and future
          className="text-base"
        />
      </div>
  )
}

export default StreakCalender