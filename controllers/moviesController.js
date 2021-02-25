const db = require('../database/models');
const {Op} = require('sequelize');

const moment = require('moment');

module.exports = {
    index : (req,res) => {
        res.render('movies')
    },
    list : (req,res) => {
        let peliculas = db.Pelicula.findAll({
            order : [
                ['title', 'ASC']
            ]
        })
        let cantidad = db.Pelicula.count();

        let top = db.Pelicula.findAll({
            order : [
                ['rating','DESC']
            ],
            limit : 10
        })

        Promise.all([peliculas,cantidad,top])
        .then(([peliculas,cantidad,top]) => {
            return res.render('moviesList', {
                peliculas,
                cantidad,
                top
            })
        })
        .catch(error => console.log(error))
    },
    show : (req,res) => {
        db.Pelicula.findByPk(req.params.id)
        .then(pelicula => {
            return res.render('moviesShow',{
                pelicula,
                estreno : moment(pelicula.release_date).format('d MMMM YYYY')
            })
        })
        .catch(error => res.send(error))

    },
    create : (req,res) => {
        db.Genero.findAll()
        .then(generos => {
            return res.render('moviesAdd',{
                generos
            })
        })
        .catch(error => res.send(error))
    },
    store : (req,res) => {
        const {title, rating, awards, release_date, length, genre_id} = req.body;
        db.Pelicula.create({
            title : title.trim(),
            rating : +rating,
            awards: +awards,
            release_date,
            length: +length,
            genre_id : +genre_id
        })
        .then(() => {
            return res.redirect('/movies/list')
        })
        .catch(error => res.send(error))
    },
    edit : (req,res) => {
        let pelicula = db.Pelicula.findByPk(req.params.id)
        let generos = db.Genero.findAll()
        Promise.all([pelicula,generos])
        .then(([pelicula, generos])=>{
            return res.render('moviesEdit',{
                pelicula,
                generos
            })
        })
        .catch(error => res.send(error))
    },
    update : (req,res) => {

    },
    remove : (req,res) => {

    },
    search : (req,res) => {
       db.Pelicula.findAll({
           where : {
               title : {
                   [Op.like] : `%${req.query.busqueda}%`
               }
           }
       })
       .then(peliculas => {
           return res.render('moviesResult',{
               peliculas
           })
       })
       .catch(error => res.send(error))
    }
}