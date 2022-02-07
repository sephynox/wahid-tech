import * as React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

import App from "./App";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Market from "./routes/Market";
import BlogHome from "./routes/blog/BlogHome";
import NftHome from "./routes/nft/NftHome";
import ProjectHome from "./routes/project/ProjectHome";
import Article from "./routes/blog/Article";
import NftProfile from "./routes/nft/NftProfile";
import ProjectProfile from "./routes/project/ProjectProfile";
import NotFound from "./routes/NotFound";
import MarketHome from "./routes/market/MarketHome";
import MarketProfile from "./routes/market/MarketProfile";

export const PAGE_MARKETS = "financial-markets";
export const PAGE_BLOG = "technology-blog";
export const PAGE_NFTS = "nfts";
export const PAGE_PROJECTS = "projects";
export const PAGE_CONTACT = "contact";
export const PAGE_ABOUT = "about";

const Routes: React.FunctionComponent = (): JSX.Element => (
  <RouterRoutes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path={PAGE_ABOUT} element={<About />} />
      <Route path={PAGE_CONTACT} element={<Contact />} />
      <Route path={PAGE_MARKETS} element={<Market />}>
        <Route index element={<MarketHome />} />
        <Route path="asset/:type/:asset" element={<MarketProfile />} />
      </Route>
      <Route path={PAGE_PROJECTS}>
        <Route index element={<ProjectHome />} />
        <Route path="opensource/:project" element={<ProjectProfile />} />
      </Route>
      <Route path={PAGE_NFTS}>
        <Route index element={<NftHome />} />
        <Route path="asset/:name" element={<NftProfile />} />
      </Route>
      <Route path={PAGE_BLOG}>
        <Route index element={<BlogHome />} />
        <Route path="posts/:name" element={<Article />} />
      </Route>
      <Route path="*" element={NotFound} />
    </Route>
  </RouterRoutes>
);

export default Routes;
