var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')

var _ = require('lodash')

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword
        var rs = _.filter(restaurants,function(n) { return (n.name.indexOf(keyword) > -1)});
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x
        var rs =  _.filter(restaurants,function(n) { 
            var goodFor = n.attributes["Good For"]; 
            if(goodFor) 
                return goodFor[x]; 
            else 
                return false;
        });
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x
        var rs = _.filter(restaurants,function(n) { 
            var ambience = n.attributes["Ambience"]; 
            if(ambience) 
                return ambience[x]; 
            else 
                return false;
        });
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x.replace("-", " ");
        var rs = _.filter(restaurants,function(n) { 
            var category = n["categories"]; 
            if(category)
                return (category.indexOf(x) > -1); 
            else 
                return false;
        });
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship
          var rs = _.filter(restaurants,function(n) { 
            if(relationship === "above")
                return n.stars >= number; 
            else if(relationship === "below")
                return n.stars <= number; 
            else 
                return false;
        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/q', function(req, res) {
                
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience    
        
        var firstFilter = restaurants;
        if(minStars){
              firstFilter = _.filter(restaurants,function(n) { 
                return n.stars >= minStars; 
            });
        } 

        var secondFilter = firstFilter;
        if(category){
        var secondFilter = _.filter(firstFilter,function(n) { 
            var categories = n["categories"]; 
            if(categories)
                return (categories.indexOf(category) > -1); 
            else 
                return false;
        });
        }
       var rs = secondFilter;
       if(ambience){
        var rs = _.filter(secondFilter,function(n) { 
            var ambienceObj = n.attributes["Ambience"]; 
            if(ambienceObj) 
                return ambienceObj[ambience]; 
            else 
                return false;
        });
    }

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}