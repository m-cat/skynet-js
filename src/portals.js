/* eslint-disable no-unused-vars */

import { defaultOptions } from "./utils.js";

const defaultGetPortalsOptions = {
  ...defaultOptions("/skynet/portals"),
};

const defaultUpdatePortalsOptions = {
  ...defaultOptions("/skynet/portals"),
};

export async function getPortals(portalUrl, customOptions = {}) {
  const opts = { ...defaultGetPortalsOptions, ...customOptions };

  throw new Error("Unimplemented");
}

export async function updatePortals(portalUrl, additions, removals, customOptions = {}) {
  const opts = { ...defaultUpdatePortalsOptions, ...customOptions };

  throw new Error("Unimplemented");
}
