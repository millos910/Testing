const request=require("supertest")
const app =require("../app")
const Genre = require("../models/Genre")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
require("../models")
const URL_MOVIES='/api/v1/movies'

// let genre
// let actor
// let director
//const movie
let movieId

//!se crea antes de ejecutar todo y generamos las relaciones de uno a muchos
// beforeAll(async()=>{
//     genre=await Genre.create({
//         name:'triller'
//     })
//     actor=await Actor.create({
//         firstName:'Bratt',
//         lastName:'Pitt',
//         nationality:'USA',
//         image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Brad_Pitt_2019_by_Glenn_Francis.jpg/640px-Brad_Pitt_2019_by_Glenn_Francis.jpg',
//         birthday: 1978
//     })
//     director=await Director.create({
//         firstName:'steven ',
//         lastName:'spielberg',
//         nationality:'USA',
//         image:'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/03/steven-spielberg-2975390.jpg',
//         birthday: 1964
//     })
//     movie={
//         name:'oppenhaimer',
//         image:'https://i.ytimg.com/vi/MVvGSBKV504/maxresdefault.jpg',
//         synopsis:'presenta la vida del destructor de mundos',
//         releaseYear:2023,
//         genreId:genre.id,
//         actorId:actor.id,
//         directorId:director.id
//     }
// })
const movie={
    name:'oppenhaimer',
    image:'https://i.ytimg.com/vi/MVvGSBKV504/maxresdefault.jpg',
    synopsis:'presenta la vida del destructor de mundos',
    releaseYear:2023
}






test("POST -> 'URL_MOVIES',should return status code 201 and res.body.name === movies.name",async()=>{
    const res=await request(app)
        .post(URL_MOVIES)
        .send(movie)
    movieId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("GET -> 'URL_MOVIES',should return status code 200 and res.body.toHaveLength === 1",async()=>{
    const res=await request(app)
        .get(URL_MOVIES)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})


test("GET ONE->'URL_MOVIES/:id', should return status code 200 and res.body.name === movie.name",async()=>{
    const res=await request(app)
        .get(`${URL_MOVIES}/${movieId}`)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})
test("PUT->'URL_MOVIES/:id', should return status code 200 and res.body.name === movieUpdate.name",async()=>{
    const movieUpdate={
        name:'BARBIE',
        image:'https://upload.wikimedia.org/wikipedia/commons/5/50/Barbie_%282023_movie_logo%29.png',
        synopsis:'se quien tu decidas ser',
        releaseYear:2023
    }
    const res=await request(app)
        .put(`${URL_MOVIES}/${movieId}`)
        .send(movieUpdate)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
})
//? anadir la relacion de los pivot 
test("POST -> 'URL_MOVIES/:id/genres',should return status code 200 and res.body === toHaveLength(1)",async()=>{
    const genre={
                name:'triller'
    }
    const createGenre=await Genre.create(genre)
    const res=await request(app)
        .post(`${URL_MOVIES}/${movieId}/genres`)
        .send([createGenre.id])
    console.log(res.body);    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].id).toBe(createGenre.id)

    await createGenre.destroy()
})
test("POST -> 'URL_MOVIES/:id/actors',should return status code 200 and res.body === toHaveLength(1)",async()=>{
    const actor={
        firstName:'Bratt',
        lastName:'Pitt',
        nationality:'USA',
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Brad_Pitt_2019_by_Glenn_Francis.jpg/640px-Brad_Pitt_2019_by_Glenn_Francis.jpg',
        birthday: 1978
    }
    const createActor=await Actor.create(actor)
    const res=await request(app)
        .post(`${URL_MOVIES}/${movieId}/actors`)
        .send([createActor.id])
    console.log(res.body);    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].id).toBe(createActor.id)
    await createActor.destroy()
})

test("POST -> 'URL_MOVIES/:id/directors',should return status code 200 and res.body === toHaveLength(1)",async()=>{
    const director={
        firstName:'steven ',
        lastName:'spielberg',
        nationality:'USA',
        image:'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/03/steven-spielberg-2975390.jpg',
        birthday: 1964
    }
    const createDirector=await Director.create(director)
    const res=await request(app)
        .post(`${URL_MOVIES}/${movieId}/directors`)
        .send([createDirector.id])
    console.log(res.body);    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].id).toBe(createDirector.id)
    await createDirector.destroy()
})


test("DELETE->'URL_MOVIES/:id', should return status code 204",async()=>{
    const res=await request(app)
        .delete(`${URL_MOVIES}/${movieId}`)
    //!cantidad de filtros a pasar     
    expect(res.status).toBe(204)
})