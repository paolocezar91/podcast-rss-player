import Collapsible from "@/components/ui/collapsible/Collapsible";
import CollapsibleContent from "@/components/ui/collapsible/CollapsibleContent";
import CollapsibleTrigger from "@/components/ui/collapsible/CollapsibleTrigger";
import { Tabs } from "@/components/ui/Tabs";
import Thumbnail from "@/components/ui/Thumbnail";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import WordpressPostsByCategory from "@/components/wp/WordpressPostsByCategory";
import YoutubePlaylist from "@/components/YoutubePlaylist";
import { jogabilidadeEntity } from "@/data/jogabilidadeEntity";

export function Jogabilidade() {
  const { title, feeds, image } = jogabilidadeEntity;
  const defaultTab = "dash-wp";

  return (
    <Tabs.Root defaultValue={defaultTab}>
      <Tabs.List className="overflow-auto px-2" ariaLabel="feeds">
        <div className="flex flex-col items-center gap-2">
          <Thumbnail image={image} alt={title} className="w-20 h-20 px-1" />
          <span className="text-sm font-bold">Feeds</span>
        </div>
        <Collapsible defaultOpen className="flex flex-col items-center">
          <Tooltip content={feeds["wp-games"].title} position="right">
            <CollapsibleTrigger>
              <span className="text-sm font-semibold">
                {jogabilidadeEntity.feeds["wp-games"].title}
              </span>
            </CollapsibleTrigger>
          </Tooltip>
          <CollapsibleContent className="flex flex-col gap-2 mt-1">
            {feeds["wp-games"].entity.map((value) => {
              return (
                <Tooltip key={value.id} content={value.title} position="right">
                  <Tabs.Trigger className="w-20 h-20" value={value.id}>
                    <Thumbnail
                      className="w-20 h-20 px-1"
                      image={value.image ?? ""}
                      alt={value.title}
                    />
                  </Tabs.Trigger>
                </Tooltip>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
        <hr className="border-solid border-foreground border-b-1" />
        <Collapsible className="flex flex-col items-center">
          <Tooltip content={feeds["wp-nao-games"].title} position="right">
            <CollapsibleTrigger>
              <span className="text-sm font-semibold">
                {jogabilidadeEntity.feeds["wp-nao-games"].title}
              </span>
            </CollapsibleTrigger>
          </Tooltip>
          <CollapsibleContent className="flex flex-col gap-2 mt-1">
            {feeds["wp-nao-games"].entity.map((value) => {
              return (
                <Tooltip key={value.id} content={value.title} position="right">
                  <Tabs.Trigger className="w-20 h-20" value={value.id}>
                    <Thumbnail
                      className="w-20 h-20 px-1"
                      image={value.image ?? ""}
                      alt={value.title}
                    />
                  </Tabs.Trigger>
                </Tooltip>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
        <hr className="border-solid border-foreground border-b-1" />
        <Collapsible className="flex flex-col items-center">
          <Tooltip
            className="p-3"
            content={jogabilidadeEntity.feeds.youtube.title}
            position="right"
          >
            <CollapsibleTrigger>
              <span className="text-sm font-semibold">
                {jogabilidadeEntity.feeds.youtube.title}
              </span>
            </CollapsibleTrigger>
          </Tooltip>
          <CollapsibleContent className="flex flex-col gap-2 mt-1">
            {feeds.youtube.entity.map((value) => {
              return (
                <Tooltip key={value.id} content={value.title} position="right">
                  <Tabs.Trigger className="w-20 h-20" value={value.id}>
                    <Thumbnail
                      className="w-20 h-20 px-1"
                      image={value.image ?? ""}
                      alt={value.title}
                    />
                  </Tabs.Trigger>
                </Tooltip>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      </Tabs.List>
      {feeds["wp-games"].entity.map((value) => {
        return (
          <Tabs.Content key={value.id} value={value.id}>
            <WordpressPostsByCategory model={value} />
          </Tabs.Content>
        );
      })}
      {feeds["wp-nao-games"].entity.map((value) => {
        return (
          <Tabs.Content key={value.id} value={value.id}>
            <WordpressPostsByCategory model={value} />
          </Tabs.Content>
        );
      })}
      {feeds.youtube.entity.map((value) => {
        return (
          <Tabs.Content key={value.id} value={value.id}>
            <YoutubePlaylist playlist={value} />
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
