import { expect } from "chai";
import FetchService from "./FetchService";

describe("FetchService", () => {

    it("Create FetchService and check instance",()=>{
        const fetchService = new FetchService();
        expect(fetchService).to.be.instanceOf(FetchService);
    })
});
