import Notification from "./components/Notification";
import Options from "./components/Options";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <div className="h-screen ">
      <div className="flex justify-center items-center">
        <div className="bg-white flex justify-center items-center w-[550px] mt-10 h-11 rounded-md shadow-md border-2 border-black">
          <p className="text-black">Video Chat</p>
        </div>
      </div>

      <VideoPlayer />
      <Options>
        <Notification />
      </Options>
    </div>
  );
}

export default App;
