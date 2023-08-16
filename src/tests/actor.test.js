const request=require("supertest")
const app =require("../app")
require("../models")
const URL_ACTORS='/api/v1/actors'

let actorsId

const actor={
    firstName:'Jonny',
    lastName:'Deep',
    nationality:'USA',
    image:'https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2023/05/24/646d96d818140.jpeg',
    birthday: 1978
}

test("POST ->'URL_ACTORS', should return status code 201 and res.body.firstName === actors.firstName",async()=>{
    const res=await request(app)
        .post(URL_ACTORS)
        .send(actor)

    actorsId=res.body.id    
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})


test("GET ->'URL_ACTORS', should return status code 200 and res.body.toHaveLength === 1",async()=>{
    const res=await request(app)
        .get(URL_ACTORS)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE->'URL_ACTORS/:id', should return status code 200 and res.body.firstName === actor.firstName",async()=>{
    const res=await request(app)
        .get(`${URL_ACTORS}/${actorsId}`)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("PUT->'URL_ACTORS/:id', should return status code 200 and res.body.firstName === actorUpdate.firstName",async()=>{
    const actorUpdate={
        firstName:'Robert',
        lastName:'de Niro',
        nationality:'USA',
        image:'https://upload.wikimedia.org/wikipedia/commons/5/58/Robert_De_Niro_Cannes_2016.jpg',
        birthday: 1943
    }
    const res=await request(app)
        .put(`${URL_ACTORS}/${actorsId}`)
        .send(actorUpdate)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
})


test("DELETE->'URL_ACTORS/:id', should return status code 204",async()=>{
    const res=await request(app)
        .delete(`${URL_ACTORS}/${actorsId}`)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(204)
})


