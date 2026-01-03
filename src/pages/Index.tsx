import MainLayout from "@/components/ui/MainLayout";
import { AudioPlayerProvider } from "@/context/AudioPlayerProvider";
import { Jogabilidade } from "./Jogabilidade";

const Index = () => {
  return (
    <AudioPlayerProvider>
      <MainLayout>
        <Jogabilidade />
        {/* <NNVidas /> */}
      </MainLayout>
    </AudioPlayerProvider>
  );
};

export default Index;
