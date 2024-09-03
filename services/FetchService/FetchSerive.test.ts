import { expect } from "chai";
import FetchService from "./FetchService";
import {
  spy,
  useFakeXMLHttpRequest,
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";

describe("FetchService", () => {
  const fetchService = new FetchService();
  const API_URL = "https://example.com/";

  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: Array<SinonFakeXMLHttpRequest>;

  beforeEach(() => {
    xhr = useFakeXMLHttpRequest();
    requests = new Array<SinonFakeXMLHttpRequest>();

    xhr.onCreate = xhrObj => {
      requests.push(xhrObj);
    };
  });

  afterEach(() => {
    xhr.restore();
  });

  it("Create FetchService and check instance", () => {
    expect(fetchService).to.be.instanceOf(FetchService);
  });

  it("Check functions", () => {
    expect(fetchService.get).to.be.a("function");
    expect(fetchService.put).to.be.a("function");
    expect(fetchService.post).to.be.a("function");
    expect(fetchService.delete).to.be.a("function");
  });

  it("GET function", () => {
    const callback = spy(fetchService, "request");
    const url = `${API_URL}api/data`;

    fetchService.get(url);
    expect(
      callback.calledWith(url, {
        method: "GET",
      })
    ).to.be.true;
  });

  it("POST function", () => {
    const url = `${API_URL}api/data`;
    const data = { test: "test-text" };

    fetchService.post(url, { data }).then(result => {
      expect(result.status).to.be.equals("200");
    });
  });
});
