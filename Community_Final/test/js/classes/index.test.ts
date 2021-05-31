import * as domainModel from "../../../public/js/classes"

describe('serviceDisplay test suite',()=>{
    let serviceDisplayT : domainModel.serviceDisplay
    beforeEach(()=>{
        serviceDisplayT = new domainModel.serviceDisplay()
    })
    afterEach(()=>{
        jest.clearAllMocks();
    })
    test('test ctrlEditDisplayHtml func',()=>{
        console.log("hello")
    })
})