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
var config = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./env.json')));

const inventory    = require('./features/inventoryProxy');
const conversation = require('./features/conversation');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('API supported: GET /api/i/items ');
});

// ALl APIs declaration
router.get('/mode',(req,res) => {
  res.send({"mode":config.mode});
});
//app.use('/api/i',inventory);
if (config.mode == 'cyan') {
  router.post('/c/conversation',(req,res) => {conversation.itSupport(req,res)});
}

// inventory API
router.get('/i/items', (req,res) => {
  inventory.getItems(req,res);
  /*
      inventory.getItems(req.headers.token,function(data){
          res.send(data);
        });
  */
});
router.delete('/i/items/:id', (req,res) => {
      inventory.deleteItem(req,res);
});
router.put('/i/items', (req,res) => {
      inventory.saveItem(req,res);
});
router.post('/i/items', (req,res) => {
      inventory.newItem(req,res);
});

module.exports = router;
