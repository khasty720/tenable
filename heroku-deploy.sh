#!/bin/bash

heroku apps:destroy tenable-challenge --confirm tenable-challenge
heroku apps:create tenable-challenge
heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2
git push heroku master
