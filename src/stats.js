/* eslint-disable no-unused-vars */

import { defaultOptions } from "./utils.js";

const defaultGetStatsOptions = {
  ...defaultOptions("/skynet/stats"),
};

export async function getStats(portalUrl, customOptions = {}) {
  const opts = { ...defaultGetStatsOptions, ...customOptions };

  throw new Error("Unimplemented");
}
