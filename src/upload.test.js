import axios from "axios";

import { upload, uploadDirectory } from "./index";

jest.mock("axios");

const portalUrl = "https://siasky.net";
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

describe("uploadFile", () => {
  const filename = "bar.txt";
  const file = new File(["foo"], filename, {
    type: "text/plain",
  });

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request with FormData", () => {
    upload(portalUrl, file, {});

    expect(axios.post).toHaveBeenCalledWith(
      `${portalUrl}/skynet/skyfile`,
      expect.any(FormData), // TODO: Inspect data contents.
      undefined
    );
  });

  it("should send register onUploadProgress callback if defined", () => {
    upload(portalUrl, file, { onUploadProgress: jest.fn() });

    expect(axios.post).toHaveBeenCalledWith(
      `${portalUrl}/skynet/skyfile`,
      expect.any(FormData), // TODO: Inspect data contents.
      {
        onUploadProgress: expect.any(Function),
      }
    );
  });

  it("should send base-64 authentication password if provided", () => {
    upload(portalUrl, file, { APIKey: "foobar" });

    expect(axios.post).toHaveBeenCalledWith(
      `${portalUrl}/skynet/skyfile`,
      expect.any(FormData), // TODO: Inspect data contents.
      undefined
    );
  });

  it("should return skylink on success", async () => {
    const data = await upload(portalUrl, file);

    expect(data).toEqual({ skylink });
  });
});

describe("uploadDirectory", () => {
  const blob = new Blob([], { type: "image/jpeg" });
  const filename = "i-am-root";
  const directory = {
    "i-am-not/file1.jpeg": new File([blob], "i-am-not/file1.jpeg"),
    "i-am-not/file2.jpeg": new File([blob], "i-am-not/file2.jpeg"),
    "i-am-not/me-neither/file3.jpeg": new File([blob], "i-am-not/me-neither/file3.jpeg"),
  };

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request with FormData", () => {
    uploadDirectory(portalUrl, directory, filename, {});

    expect(axios.post).toHaveBeenCalledWith(
      `${portalUrl}/skynet/skyfile?filename=${filename}`,
      expect.any(FormData), // TODO: Inspect data contents.
      undefined
    );
  });

  it("should send register onUploadProgress callback if defined", () => {
    uploadDirectory(portalUrl, directory, filename, { onUploadProgress: jest.fn() });

    expect(axios.post).toHaveBeenCalledWith(`${portalUrl}/skynet/skyfile?filename=${filename}`, expect.any(FormData), {
      onUploadProgress: expect.any(Function),
    });
  });

  it("should return single skylink on success", async () => {
    const data = await uploadDirectory(portalUrl, directory, filename);

    expect(data).toEqual({ skylink });
  });
});
