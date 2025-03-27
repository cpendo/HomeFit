import { FaCirclePlay } from "react-icons/fa6";
import { Link } from "react-router";
import PropTypes from 'prop-types';

const WorkoutCard = ({ workout }) => {
  const {id, name, type, difficulty} = workout;
  return (
    <div className="bg-gray-300 w-70 p-5 card">
      <Link to={`/training/workout/${id}`}>
        <div className="card-bg h-38 w-full flex justify-center items-center">
          <FaCirclePlay className="size-20 play-button" />
        </div>

        <h3 className="font-secondary text-2xl mt-1">{name}</h3>

        <div className="text-sm tracking-tight flex flex-row mt-2 gap-2 ">
          <p className="bg-white px-2 rounded-2xl ">{difficulty}</p>
          <p className="bg-white px-2 rounded-2xl ">{type}</p>
        </div>
      </Link>
    </div>
  );
};

WorkoutCard.propTypes = {
 workout: PropTypes.object.isRequired
};

export default WorkoutCard;
