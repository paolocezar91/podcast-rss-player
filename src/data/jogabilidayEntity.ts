import { WordpressEntity } from "@/types/wp";
import { YoutubePlaylistEntity } from "@/types/youtube";

const jogabilidadeEntityWp: Record<string, WordpressEntity> = {
  "dash-wp": {
    category: 410,
    title: "Dash Podcast",
  },
  "vertice-wp": {
    category: 532,
    title: "Vértice",
  },
  "fora-da-caixa-wp": {
    category: 930,
    title: "Fora da Caixa",
  },
  "linha-quente-wp": {
    category: 929,
    title: "Linha Quente",
  },
  "jack-wp": {
    category: 716,
    title: "J.A.C.K.",
  },
};

const jogabilidadeEntityYoutube: Record<string, YoutubePlaylistEntity> = {
  "vertice-youtube": {
    title: "VÉRTICE - YouTube (VOD)",
    description: "O podcast de games e notícias do Jogabilidade.",
    image:
      "https://i.ytimg.com/pl_c/PLRW2pq5AgAVGjDiinNYKIPb7B6Cg4_M8H/studio_square_thumbnail.jpg?sqp=CJ2E7sgG-oaymwEICPABEPABSFqi85f_AwYI2OXuoAY=&rs=AOn4CLAtbN5HBIZFO6Um6ziXGeTqWAbNnQ&days_since_epoch=20409",
    url: "https://www.youtube.com/playlist?list=PLRW2pq5AgAVGjDiinNYKIPb7B6Cg4_M8H",
  },
  "jogabiliday-2025-youtube": {
    title: "Jogabiliday 2025 (VOD)",
    description:
      "Re-veja ou assista pela primeira vez todo o Jogabiliday 2025!",
    image:
      "https://i.ytimg.com/pl_c/PLRW2pq5AgAVGjDiinNYKIPb7B6Cg4_M8H/studio_square_thumbnail.jpg?sqp=CJ2E7sgG-oaymwEICPABEPABSFqi85f_AwYI2OXuoAY=&rs=AOn4CLAtbN5HBIZFO6Um6ziXGeTqWAbNnQ&days_since_epoch=20409",
    url: "https://www.youtube.com/playlist?list=PLRW2pq5AgAVG9R9oYWki7Ta6TZiA_pigc",
  },
};

export const jogabilidadeEntity = {
  wp: jogabilidadeEntityWp,
  youtube: jogabilidadeEntityYoutube,
};
