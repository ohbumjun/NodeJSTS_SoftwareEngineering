"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../public/js/classes");
jest.mock("../../../public/js/classes");
describe('serviceDisplay test suite', () => {
    let serviceDisplayMock = {
        ctrlEditDisplayHtml: jest.fn(),
        hello: jest.fn()
    };
    beforeEach(() => {
        serviceDisplayMock = new classes_1.serviceDisplay();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('ctrlEditDisplayHtml to be called', () => {
        expect(serviceDisplayMock.hello).toBeCalled();
    });
});
