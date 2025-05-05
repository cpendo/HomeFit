import { useGetProfileDataQuery } from "../../features/profiles/profilesApi";

const HomePage = () => {
  const { data, isLoading } = useGetProfileDataQuery();

  console.log(data);
  if (isLoading) return "loading...";
  return <div>HomePage </div>;
};

export default HomePage;