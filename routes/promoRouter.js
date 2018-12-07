const express = require('express');
var Verify = require('./verify');

const promoRouter = express.Router();
promoRouter.use(express.json());
promoRouter.route('/')
.all((req, res, next) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  next();
})
.get(Verify.verifyOrdinaryUser, (req, res, next) => {
  res.end('Will send all the promotion to you!')
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req, res, next) => {
  res.end('Will add the promotion : '+ req.body.name +' with details:' + req.body.description);
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req, res, next) => {
  res.end('Deleting all promotion!')
})


promoRouter.route('/:promotionId')
.all((req, res, next) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  next();
})
.get(Verify.verifyOrdinaryUser, (req, res, next) => {
  res.end('Will send details of the promotion: '+ req.params.promotionId+' to you!')
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req, res, next) => {
  res.write('Updating the promotion:' + req.params.promotionId+ 'to you \n')
  res.end('Will update the promotion: '+ req.body.name+' with details:' + req.body.description);
})

exports.promoRouter = promoRouter;