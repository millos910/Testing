const request=require("supertest")
const app =require("../app")
require("../models")
const URL_DIRECTORS='/api/v1/directors'

let directorsId

const director={
    firstName:'Christopher',
    lastName:'Noland',
    nationality:'UK',
    image:'https://www.infobae.com/new-resizer/iBYx670Ca6h06wnQAsJtuRbMcuM=/arc-anglerfish-arc2-prod-infobae/public/UPA63MXS4QU7QRDOENUATPCAXU.jpg',
    birthday: 1970
}

test("POST ->'URL_DIRECTORS', should return status code 201 and res.body.firstName === actors.firstName",async()=>{
    const res=await request(app)
        .post(URL_DIRECTORS)
        .send(director)

    directorsId=res.body.id    
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})


test("GET ->'URL_DIRECTORS', should return status code 200 and res.body.toHaveLength === 1",async()=>{
    const res=await request(app)
        .get(URL_DIRECTORS)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE->'URL_DIRECTORS/:id', should return status code 200 and res.body.firstName === actor.firstName",async()=>{
    const res=await request(app)
        .get(`${URL_DIRECTORS}/${directorsId}`)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("PUT->'URL_DIRECTORS/:id', should return status code 200 and res.body.firstName === directorUpdate.firstName",async()=>{
    const directorUpdate={
        firstName:'Guillermo',
        lastName:'del Toro',
        nationality:'MX',
        image:'https://i.blogs.es/ee899b/captura-de-pantalla-2023-06-15-a-las-13.06.56/450_1000.jpeg',
        birthday: 1964
    }
    const res=await request(app)
        .put(`${URL_DIRECTORS}/${directorsId}`)
        .send(directorUpdate)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
})


test("DELETE->'URL_DIRECTORS/:id', should return status code 204",async()=>{
    const res=await request(app)
        .delete(`${URL_DIRECTORS}/${directorsId}`)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(204)
})


