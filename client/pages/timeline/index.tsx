import { useSelector } from '../../redux/store';

const Timeline = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  return (
    <div>
      {userDetails && <h2>Welcome {userDetails.name}</h2>}
      Timeline
    </div>
  );
};
export default Timeline;
