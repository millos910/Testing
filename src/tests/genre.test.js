const request=require("supertest")
const app =require("../app")
const URL_GENRES='/api/v1/genres'
let genreId

const genre={
    name:'Comedy'
}
test("POST ->'/api/v1/genres', should return status code 201 and res.body.name ===genre.name",async()=>{
    const res=await request(app)
        .post(URL_GENRES)
        .send(genre)

    genreId=res.body.id    
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("GET ->'/api/v1/genres', should return status code 200 and res.body.toHaveLength === 1",async()=>{
    const res=await request(app)
        .get(URL_GENRES)
        

    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE ->'URL_GENRES/:id', should return status code 200 and res.body.name === genre.name",async()=>{
    const res=await request(app)
        .get(`${URL_GENRES}/${genreId}`)
        

    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("PUT ->'URL_GENRES/:id', should return status code 200 and res.body.name === genreUpdate.name",async()=>{
    const genreUpdate={
        name:'drama'
    }


    const res=await request(app)
        .put(`${URL_GENRES}/${genreId}`)
        .send(genreUpdate)

    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
})


test("DELETE ->'URL_GENRES/:id', should return status code 204",async()=>{
    const res=await request(app)
        .delete(`${URL_GENRES}/${genreId}`)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(204)
})