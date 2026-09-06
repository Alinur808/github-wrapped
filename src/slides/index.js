import IntroSlide from "./IntroSlide";
import AccountAgeSlide from "./AccountAgeSlide";
import RepoStatsSlide from "./RepoStatsSlide";
import LanguageSlide from "./LanguageSlide";
import TopRepoSlide from "./TopRepoSlide";
import FollowersSlide from "./FollowersSlide";
import ArchetypeSlide from "./ArchetypeSlide";
import { GRADIENTS } from "./gradients";

export const SLIDES = [
  { id: "intro", Component: IntroSlide, gradient: GRADIENTS[0] },
  { id: "age", Component: AccountAgeSlide, gradient: GRADIENTS[1] },
  { id: "repos", Component: RepoStatsSlide, gradient: GRADIENTS[2] },
  { id: "languages", Component: LanguageSlide, gradient: GRADIENTS[3] },
  { id: "top-repo", Component: TopRepoSlide, gradient: GRADIENTS[4] },
  { id: "followers", Component: FollowersSlide, gradient: GRADIENTS[5] },
  { id: "archetype", Component: ArchetypeSlide, gradient: GRADIENTS[6], isFinal: true },
];
