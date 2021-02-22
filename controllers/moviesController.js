const db = require('../database/models');

module.exports = {
    index : (req,res) => {
        res.render('movies')
    },
    list : (req,res) => {
        db.Pelicula.findAll()
        .then(peliculas => {
            return res.render('moviesList', {
                peliculas
            })
        })
        .catch(error => res.send(error))
    },
    show : (req,res) => {

    },
    create : (req,res) => {

    },
    store : (req,res) => {

    },
    edit : (req,res) => {

    },
    update : (req,res) => {

    },
    remove : (req,res) => {

    },
    search : (req,res) => {

    }
}