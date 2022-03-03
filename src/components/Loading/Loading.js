import { Circle } from "better-react-spinkit";

const Loading = () => {
  console.log("Loading....");
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <Circle color="#3cbc28" size={78} />
      </div>
    </center>
  );
};

export default Loading;
