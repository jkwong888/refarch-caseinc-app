/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 /**
 This module defines the REST api for the front end, and implement some of the
 orchestration logic
  boyerje@us.ibm.com
*/

const express = require('express');
const router = express.Router();
// The application can be the front end to two different color compute model: Brown for integration focus and Orange for integration and cognitive. The mode attribute in the env.json set this
var fs = require('fs');
var path = require('path');
const inventory    = require('./features/inventoryProxy');
const conversation = require('./features/conversation');
const advisor = require('./features/advisor');

module.exports = function(app,config){
  app.get('/api', function(req, res){
    res.send('API supported: GET /api/i/items ');
  })
  app.get('/api/authenticated', isLoggedIn, function(req, res){
    var response = {
        authenticated: true,
    }
    res.status(200).json(response);
  })
  app.get('/api/mode', isLoggedIn, (req,res) => {
    res.send({"mode":config.getMode()});
  })
  if (config.getMode() == 'cyan') {
    app.post('/api/c/conversation',isLoggedIn,(req,res) => {
      conversation.itSupport(config,req,res)
    });
  }
  if (config.getMode() == 'cyan') {
    app.post('/api/advisor',isLoggedIn,(req,res) => {
      advisor.advise(config,req,res)
    });
  }
  app.get('/api/i/items', isLoggedIn, (req,res) => {
    inventory.getItems(config,req,res);
  })
  app.delete('/api/i/items/:id', isLoggedIn, (req,res) => {
    inventory.deleteItem(config,req,res);
  })
  app.put('/api/i/items', isLoggedIn, (req,res) => {
    inventory.saveItem(config,req,res);
  })
  app.post('/api/i/items', isLoggedIn, (req,res) => {
    inventory.newItem(config,req,res);
  })
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    res.status(401).send('unauthenticated');
}
