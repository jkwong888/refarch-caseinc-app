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
const express = require('express');
const router = express.Router();
var request = require('request');

/**
Conversation delegates to the Conversation Broker Micro Service.
*/
module.exports = {
  itSupport : function(config,req,res){
    request({
      method: 'POST',
      url: config.getConversationBrokerUrl(),
        timeout: 10000,
      json: true,
      body: req.body
    }, function (error, response, body) {
      console.log("@@ in conversation proxy "+JSON.stringify(response,null,2));
      if (error) {
        console.log(error);
        res.status(500).send([{"text":"Error contacting Conversation broker"}]);
      }
      res.send(body);
    });
  }
};
