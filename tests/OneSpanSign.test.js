const OneSpanSign = require('../src/OneSpanSign').OneSpanSign;

const inputState = {
    apiKey: "demo123",
    apiUrl: "http://demo.com"
}

describe('OneSpanSign', () => {
    it("initialises an instance of OneSpanSign", () => {
        const oneSpan = new OneSpanSign(inputState.apiKey, inputState.apiUrl)
        expect(oneSpan).toBeInstanceOf(OneSpanSign)
    })

    it('throws error when passing no/incorrect number of arguments', () => {
        const oneSpan = new OneSpanSign()
        expect(oneSpan).toThrowError()
    })

})