import { test } from '@playwright/test';
import { ContactPage } from '../../pageObjects/contact.po';
import { request } from 'http';
import {LoginPage} from '../../pageObjects/login.po';
const contactTestData =require('../../fixture/contactFixture.json');
const {authenticateUser,createEntity,getEntity,validateEntity,deleteEntity} =require('../../utils/helper.spec.js');



test.beforeEach(async ({ page }) => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/contactList')
});

test.describe('Contact Testcases',()=>{
    test('Contact Add test',async({page,request})=>{
        const contact = new ContactPage(page);
        contact.contactAdd(contactTestData.firstName,contactTestData.lastName,contactTestData.dob,contactTestData.email,contactTestData.phone,contactTestData.address.streetAddress,contactTestData.address.city,contactTestData.address.state,contactTestData.address.postal,contactTestData.address.country)
        contact.verifyAdd(contactTestData.firstName,contactTestData.lastName,contactTestData.dob,contactTestData.email,contactTestData.phone,contactTestData.address.streetAddress,contactTestData.address.city,contactTestData.address.state,contactTestData.address.postal,contactTestData.address.country)
        contact.viewContact()
    })

    test('Contact Edit Test',async({page,request})=>{
        const Data ={
            "firstname": "Palden",
            "lastname": "Sherpa",
            "birthdate": "2004-06-30",
            "phone": "1234567890",
            "street1": "Dhalko",
            "City": "ktm",
            "stateProvince": "3",
            "postalCode": "44600",
            "country": "nepal",
        };
        const contact =new ContactPage(page);
        accessToken =await authentciateUser(contactTestData.validUser.userName,contactTestData.validUser.password,{request});
        await createEntity(Data, accesToken,'/contacts', {request});
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        await contact.validateContactCreated(contactTestData.contactEdit.firstName,contactTestData.contact.lastName,contactTestData.contact.password);
    })

    test.only('Contact Delete Test',async({page,request})=>{
        const Data ={
            "firstname": "Palden",
            "lastname": "Sherpa",
            "birthdate": "2004-06-30",
            "phone": "1234567890",
            "street1": "Dhalko",
            "City": "ktm",
            "stateProvince": "3",
            "postalCode": "44600",
            "country": "nepal",
        };
        const contact =new ContactPage(page);
        accessToken =await authenticateUser(contactTestData.validUser.userName,contactTestData.validUser.password,{request});
        await createEntity(Data, accesToken,'/contacts', {request});
        page.reload();
        await contact.viewContact();
        const id =await getEntity(accessToken, '/contacts','200',{request});
        await contact.contactDelete();
        await validateEntity(accessToken,`/contacts/$id`,'404',{request});
    })
});
test.afterEach(async({page})=>{
    await page.close();
});
