const express = require('express');
const mongoose = require('mongoose');
var Verify = require('./verify');
const Dishes = require('../models/dishes');
const dishRouter = express.Router();


dishRouter.use(express.json());
dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, (req, res, next) => {
  Dishes.find({})
    .populate('comments.postedBy') // 如果没有populate,则 comments.postedBy字段只是一个id字符
    .exec(function (err, dish) {
      if (err) throw err;
      res.json(dish);
    });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req, res, next) => {
  Dishes.create(req.body, (err, dish) => {
    if (err) throw err;
    console.log('Dish created!');
    const id = dish._id;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Added the dish with id:' + id);
  })
})
.delete([Verify.verifyOrdinaryUser, Verify.verifyAdmin], (req, res, next) => {
  Dishes.remove({}, (err, resp) => {
    if (err) throw err;
    res.json(resp);
  });
});

dishRouter.route('/:dishId')
.get((req, res, next) => {
  Dishes.findById(req.params.dishId, (err, dish) => {
    if (err) throw err;
    res.json(dish);
  })
})
.put((req, res, next) => {
  Dishes.findByIdAndUpdate(req.params.dishId, {
    $set: req.body
  }, {
    // new: bool - true to return the modified document rather than the original. defaults to false
    new: true
  }, (err, dish) => {
    if (err) throw err;
    res.json(dish);
  })
})
.delete((req, res, next) => {
  Dishes.findByIdAndRemove(req.params.dishId, (err, resp) => {
    if (err) throw err;
    res.json(resp);
  })
})

dishRouter.route('/:dishId/comments')
.get((req, res, next) => {
  Dishes.findById(req.params.dishId, (err, dish) => {
    if (err) throw err;
    res.json(dish.comments);
  })
})
.post((req, res, next) => {
  Dishes.findById(req.params.dishId, (err, dish) => {
    if (err) throw err;
    dish.comments.push(req.body);
    dish.save((err, dish) => {
      if (err) throw err;
      console.log('Updated Comments!');
      res.json(dish);
    })
  })
})
.delete((req, res, next) => {
  Dishes.findById(req.params.dishId, (err, dish) => {
    if (err) throw err;
    for (let i = (dish.comments.length -1); i >= 0; i--){
      dish.comments.id(dish.comments[i]._id).remove();
    }
    dish.save((err, result) => {
      if (err) throw err;
      res.writhHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Deleted all comments');
    })
  })
})

dishRouter.route('/:dishId/comments/:commentId')
.all(Verify.verifyOrdinaryUser)
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId)
      .populate('comments.postedBy')
      .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
      });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        req.body.postedBy = req.decoded._id;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
      if (dish.comments.id(req.params.commentId).postedBy
      != req.decoded._id) {
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
      }
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});


exports.dishRouter = dishRouter;