const request=require("supertest")
const app =require("../app")
const URL_GENRES='/api/v1/genres'
const genre={
    name:'Comedy'
}
test("POST ->'/api/v1/genres', should return status code 201 and res.body.name ===genre.name",async()=>{
    const res=await request(app)
        .post(URL_GENRES)
        .send(genre)

    //!cantidad de filtros a pasar     
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("GET ->'/api/v1/genres', should return status code 201 and res.body.name ===genre.name",async()=>{
    const res=await request(app)
        .post(URL_GENRES)
        .send(genre)

    //!cantidad de filtros a pasar     
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})