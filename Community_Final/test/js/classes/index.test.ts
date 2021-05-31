import {serviceDisplay} from "../../../public/js/classes"

describe('serviceDisplay test suite',()=>{
    let serviceDisplayT : serviceDisplay
    beforeEach(()=>{
        serviceDisplayT = new serviceDisplay()
    })
    afterEach(()=>{
        jest.clearAllMocks();
    })
    test('test ctrlEditDisplayHtml func',()=>{
        console.log("hello")
    })
})