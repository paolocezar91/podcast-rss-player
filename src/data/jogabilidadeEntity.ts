import { WordpressEntity } from "@/types/wp";
import { YoutubePlaylistEntity } from "@/types/youtube";

const jogabilidadeGamesEntityWp: WordpressEntity[] = [
  {
    id: "dash-wp",
    category: 410,
    title: "Dash Podcast",
    image: "https://placehold.co/48?text=Dash",
    description:
      "Cada edição aborda um tema específico: seja um jogo, uma franquia, um desenvolvedor, um conceito ou o que nos der na telha!",
  },
  {
    id: "vertice-wp",
    category: 532,
    title: "Vértice",
    image: "https://placehold.co/48?text=Vértice",
    description: "Discutimos as principais notícias e lançamentos.",
  },
];
const jogabilidadeNaoGamesEntityWp: WordpressEntity[] = [
  {
    id: "fora-da-caixa-wp",
    category: 930,
    title: "Fora da Caixa",
    image: "https://placehold.co/48?text=Fora+da+Caixa",
    description:
      "Tudo que não é vídeo game é pauta aqui: filmes, livros, quadrinhos ou simplesmente anedotas do cotidiano.",
  },
  {
    id: "linha-quente-wp",
    category: 929,
    title: "Linha Quente",
    image: "https://placehold.co/48?text=Linha+Quente",
    description:
      "Respondemos as mais (menos) importantes perguntas de nossos ouvintes nesse podcast sem nenhum filtro.",
  },
  {
    id: "jack-wp",
    category: 716,
    title: "JACK",
    image: "https://placehold.co/48?text=JACK",
    description:
      "O Jogabilidade Anime Club Knights funciona como um clube do livro, só que com animes e mangás.",
  },
];
const jogabilidadeEntityYoutube: YoutubePlaylistEntity[] = [
  {
    id: "vertice-youtube",
    title: "VÉRTICE - YouTube (VOD)",
    image: "https://placehold.co/48?text=Vertice+(VOD)",
    description: "O podcast de games e notícias do Jogabilidade.",
    url: "https://www.youtube.com/playlist?list=PLRW2pq5AgAVGjDiinNYKIPb7B6Cg4_M8H",
  },
  {
    id: "jogabiliday-2025-youtube",
    title: "Jogabiliday 2025 (VOD)",
    image: "https://placehold.co/48?text=Jogabiliday+(VOD)",
    description:
      "Re-veja ou assista pela primeira vez todo o Jogabiliday 2025!",
    url: "https://www.youtube.com/playlist?list=PLRW2pq5AgAVG9R9oYWki7Ta6TZiA_pigc",
  },
];

export const jogabilidadeEntity = {
  title: "Jogabilidade",
  parentUrl: "https://jogabilida.de",
  image: "https://placehold.co/48?text=BiliD",
  feeds: {
    "wp-games": {
      title: "Games",
      image: "https://placehold.co/48?text=Feed+Games",
      entity: jogabilidadeGamesEntityWp,
    },
    "wp-nao-games": {
      title: "Não Games",
      image: "https://placehold.co/48?text=Feed+Não+Games",
      entity: jogabilidadeNaoGamesEntityWp,
    },
    youtube: {
      title: "VODs",
      image: "https://placehold.co/48?text=YouTube+(VOD)",
      entity: jogabilidadeEntityYoutube,
    },
  },
};
