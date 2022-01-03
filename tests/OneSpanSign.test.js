const OneSpanSign = require('../src/OneSpanSign').OneSpanSign;

const inputState = {
    apiKey: "demoKey",
    apiUrl: "http://demo.com"
}

describe('OneSpanSign', () => {
    it("initialises an instance of OneSpanSign", () => {
        const oneSpan = new OneSpanSign(inputState.apiKey, inputState.apiUrl)
        expect(oneSpan).toBeInstanceOf(OneSpanSign)
    })

    it('throws error when failing to pass new in the constructor', () => {
        expect(() => OneSpanSign(inputState.apiKey, inputState.apiUrl)).toThrow(TypeError)
    })

})