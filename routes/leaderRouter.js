const express = require('express');

const leaderRouter = express.Router();

leaderRouter.use(express.json());
leaderRouter.route('/')
.all((req, res, next) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  next();
})
.get((req, res, next) => {
  res.end('Will send all the leaderShip to you!')
})
.post((req, res, next) => {
  res.end('Will add the leaderShip : '+ req.body.name +' with details:' + req.body.description);
})
.delete((req, res, next) => {
  res.end('Deleting all leaderShip!')
})
.get((req, res, next) => {
  res.end('Will send details of the leaderShip: '+ req.params.leaderShipId+' to you!')
});

leaderRouter.route('/:leaderShipId')
.all((req, res, next) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  next();
})
.get((req, res, next) => {
  res.end('Will send details of the leaderShip: '+ req.params.leaderShipId+' to you!')
})
.put((req, res, next) => {
  res.write('Updating the leaderShip:' + req.params.leaderShipId+ 'to you \n')
  res.end('Will update the leaderShip: '+ req.body.name+' with details:' + req.body.description);
})

module.exports = leaderRouter;