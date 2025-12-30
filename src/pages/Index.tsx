import { Tabs } from "@/components/tabs/Tabs";
import MainLayout from "@/components/ui/MainLayout";
import WordpressPostsByCategory from "@/components/wp/WordpressPostsByCategory";
import YoutubePlaylist from "@/components/YoutubePlaylist";
import { AudioPlayerProvider } from "@/context/AudioPlayerProvider";
import { jogabilidadeEntity } from "@/data/jogabilidayEntity";

const Index = () => {
  const defaultTab = "dash-wp";

  return (
    <AudioPlayerProvider>
      <MainLayout>
        <Tabs.Root defaultValue={defaultTab}>
          <Tabs.List ariaLabel="feeds">
            {Object.entries(jogabilidadeEntity.wp).map(([key, value]) => {
              return (
                <Tabs.Trigger key={key} value={key}>
                  {value.title}
                </Tabs.Trigger>
              );
            })}
            {Object.entries(jogabilidadeEntity.youtube).map(([key, value]) => {
              return (
                <Tabs.Trigger key={key} value={key}>
                  {value.title}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>
          {Object.entries(jogabilidadeEntity.wp).map(([key, value]) => {
            return (
              <Tabs.Content key={key} value={key}>
                <WordpressPostsByCategory
                  title={value.title}
                  category={value.category}
                />
              </Tabs.Content>
            );
          })}
          {Object.entries(jogabilidadeEntity.youtube).map(([key, value]) => {
            return (
              <Tabs.Content key={key} value={key}>
                <YoutubePlaylist playlist={value} />
              </Tabs.Content>
            );
          })}
        </Tabs.Root>
      </MainLayout>
    </AudioPlayerProvider>
  );
};

export default Index;
