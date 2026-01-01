import Collapsible from "@/components/ui/collapsible/Collapsible";
import CollapsibleContent from "@/components/ui/collapsible/CollapsibleContent";
import CollapsibleTrigger from "@/components/ui/collapsible/CollapsibleTrigger";
import MainLayout from "@/components/ui/MainLayout";
import { Tabs } from "@/components/ui/Tabs";
import Thumbnail from "@/components/ui/Thumbnail";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import WordpressPostsByCategory from "@/components/wp/WordpressPostsByCategory";
import YoutubePlaylist from "@/components/YoutubePlaylist";
import { AudioPlayerProvider } from "@/context/AudioPlayerProvider";
import { jogabilidadeEntity } from "@/data/jogabilidayEntity";
import { Gamepad, Podcast, Youtube } from "lucide-react";

const Index = () => {
  const defaultTab = "dash-wp";

  return (
    <AudioPlayerProvider>
      <MainLayout>
        <Tabs.Root defaultValue={defaultTab}>
          <Tabs.List className="overflow-auto w-[80px]" ariaLabel="feeds">
            BiliD
            <Collapsible className="flex flex-col items-center w-full">
              <Tooltip content="Feed Games" position="right">
                <CollapsibleTrigger>
                  <Gamepad />
                </CollapsibleTrigger>
              </Tooltip>
              <CollapsibleContent className="flex flex-col gap-2 mt-1">
                {Object.entries(jogabilidadeEntity["wp-games"]).map(
                  ([key, value]) => {
                    return (
                      <Tabs.Trigger className="w-20 h-20" key={key} value={key}>
                        <Thumbnail
                          className="w-20 h-20"
                          image={[""]}
                          alt={value.title}
                        />
                      </Tabs.Trigger>
                    );
                  }
                )}
              </CollapsibleContent>
            </Collapsible>
            <hr className="border-solid border-foreground border-b-1" />
            <Collapsible className="flex flex-col items-center">
              <Tooltip
                className="p-3"
                content="Feed Não-Games"
                position="right"
              >
                <CollapsibleTrigger>
                  <Podcast />
                </CollapsibleTrigger>
              </Tooltip>
              <CollapsibleContent className="flex flex-col gap-2 mt-1">
                {Object.entries(jogabilidadeEntity["wp-nao-games"]).map(
                  ([key, value]) => {
                    return (
                      <Tabs.Trigger className="w-20 h-20" key={key} value={key}>
                        <Thumbnail
                          className="w-20 h-20"
                          image={[""]}
                          alt={value.title}
                        />
                      </Tabs.Trigger>
                    );
                  }
                )}
              </CollapsibleContent>
            </Collapsible>
            <hr className="border-solid border-foreground border-b-1" />
            <Collapsible className="flex flex-col items-center">
              <Tooltip className="p-3" content="VODs YouTube" position="right">
                <CollapsibleTrigger>
                  <Youtube />
                </CollapsibleTrigger>
              </Tooltip>
              <CollapsibleContent className="flex flex-col gap-2 mt-1">
                {Object.entries(jogabilidadeEntity.youtube).map(
                  ([key, value]) => {
                    return (
                      <Tabs.Trigger className="w-20 h-20" key={key} value={key}>
                        <Thumbnail
                          className="w-20 h-20"
                          image={[""]}
                          alt={value.title}
                        />
                      </Tabs.Trigger>
                    );
                  }
                )}
              </CollapsibleContent>
            </Collapsible>
          </Tabs.List>
          {Object.entries(jogabilidadeEntity["wp-games"]).map(
            ([key, value]) => {
              return (
                <Tabs.Content key={key} value={key}>
                  <WordpressPostsByCategory
                    title={value.title}
                    category={value.category}
                  />
                </Tabs.Content>
              );
            }
          )}
          {Object.entries(jogabilidadeEntity["wp-nao-games"]).map(
            ([key, value]) => {
              return (
                <Tabs.Content key={key} value={key}>
                  <WordpressPostsByCategory
                    title={value.title}
                    category={value.category}
                  />
                </Tabs.Content>
              );
            }
          )}
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
