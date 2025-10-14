import { useParams, useSearchParams } from "react-router-dom";

const AboutMe: React.FC = () => {
  const { aboutId, aboutMeId } = useParams<{ aboutId?: string; aboutMeId?: string }>();
  const [searchParams] = useSearchParams();

  const queryId = searchParams.get("id") ?? "N/A";
  const queryName = searchParams.get("name") ?? "N/A";

  return (
    <div>
      <hr />
      <h4>About Me: User ID: {aboutMeId}</h4>
      <p>
        Query: ID={queryId} name={queryName}
      </p>
    </div>
  );
};

export default AboutMe;