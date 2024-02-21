
import express from 'express';
import * as healthzController from '../controllers/healthz-controller.js';


const router = express.Router();

router.all('/healthz', (req, res, next) => {
  console.log(req.body, Object.keys(req.body).length, req.query);
  res.set('cache-control', 'no-cache');
    if (req.method !== 'GET') {
      healthzController.methodNotAllowed(req, res);
    } 
    else if (req.headers['content-type'] || Object.keys(req.query).length > 0) {
        healthzController.badRequest(req, res);
      }else {
      next();
    }
  });
  
router.route('/healthz').get(healthzController.healthzCheck);

export default router;