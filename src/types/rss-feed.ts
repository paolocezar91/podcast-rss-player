export interface RSSFeedModel {
  rss: {
    channel: Channel;
  };
}

export interface Channel {
  author: string;
  title: string;
  description: string;
  category: { _text: string }[];
  donate: {
    _href: string;
    __text: string;
  };
  link: string;
  image?:
    | {
        url: string;
        title: string;
        link: string;
        _href: string;
      }
    | {
        url: string;
        title: string;
        link: string;
        _href: string;
      }[];
  item: Array<PodcastFeedItem>;
}

export interface PodcastFeedItem {
  category: string[];
  description: string;
  duration: string;
  enclosure: {
    _url: string;
    url: string;
    type: string;
    length: string;
  };
  link: string;
  pubDate: string;
  title: string;
}
