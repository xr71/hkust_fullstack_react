const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://192.168.99.100:27017/conFusion';

const conn = mongoose.connect(url);

conn.then((db) => {
    console.log('Connected correctly to server');

    // var newDish = Dishes({
    //     name: "Uthapizza",
    //     description: "test"
    // })

    // newDish.save()
    //     .then((dish) => {
    //         console.log(dish);

    //         return Dishes.find({}).exec();
    //     })
    //     .then((dishes) => {
    //         console.log(dishes);

    //         return Dishes.remove({});
    //     })
    //     .then(() => {
    //         return mongoose.connection.close();
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    Dishes.create({
        name: "Uthapizza",
        description: "test"
    }).then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, { 
            $set: {
                description: "Updated test"
            }
        }, {
                new: true
        }).exec();

    }).then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: "I'm getting a sinking feeling",
            author: "Leo di Carpaccio"
        });

        return dish.save();
    }).then((dish) => {
        console.log(dish);

        return Dishes.remove({});
    }).then(() => {
        return mongoose.connection.close();
    }).catch((err) => {
        console.log(err);
    })

}).catch((err) => {
    console.log(err);
});
