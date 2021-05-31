import {serviceDisplay} from "../../../public/js/classes"

jest.mock("../../../public/js/classes")

describe('serviceDisplay test suite',()=>{
    let serviceDisplayMock : serviceDisplay= {
        ctrlEditDisplayHtml : jest.fn(),
        hello : jest.fn()
    }
    beforeEach(()=>{
        serviceDisplayMock = new serviceDisplay()
    })
    afterEach(()=>{
        jest.clearAllMocks();
    })
    test('ctrlEditDisplayHtml to be called',()=>{
        expect(serviceDisplayMock.hello).toBeCalled()
    })
    
})