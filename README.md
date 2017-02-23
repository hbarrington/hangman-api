# Hangman API
An API built on Express.js (Node.js) to service the [hangman paper and pencil guessing game](https://en.wikipedia.org/wiki/Hangman_(game)).

Available for testing at http://52.36.17.22/

API specs available - https://documenter.getpostman.com/view/1162408/hangman-api/6YsWHS8
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c00339468a4d0c33422c)

## Goals
The primary goal is exploration and refreshing myself on technologies I haven't used in 2 or 3 years.
* Explore AWS' Elastic Container Service (ECS) - I'm comfortable with kubernetes deployment pipelines but was curious about AWS container service. This is deployed and maintained on ECS.
* Compare Express.js from when I first worked with it in 2014 (at least a major version ago). The main questions were around simplified API and scalability.
* Explore D3.js - I've managed multiple developers as they've learned D3 for projects on our team. It can produce fantastic results but I've noticed a significant learning curve. I wanted to see for myself
* Play with React.js - I've used Ember a little and managed a *lot* of Ember projects. I like it a lot and wanted to compare with React (and eventually Angular). This seemed like a good project to try it on.
* Have an API/UI to play hangman on.

## Notes
* ECS requires lots of attributes for task definitions (their description of kubernetes' controllers) - a little bit of research gives a lot of power though
* versioning (revisions) comes out of the box and the UI to create a new version is very easy. I think this is a place where they beat k8s
* *adding multiple API servers and a load balancer is trivial (as you'd expect in a containerized environment)*
* ECS requires a decent amount of usage of other AWS services (EC2 obviously, ELB's probably, IAM roles, S3/storage, etc.). No big surprises but will always be a negative comparing with open source/non-proprietary tooling.
* Task placement strategy is *very* cool. With options like AZ Balanced Spread and the ability to edit the criteria used in the strategy, there is some very nice scalability OOTB.
* Right now static content (react) is hosted on the ECS containers and served by express. A CDN should be used instead and source content should be S3 or a lightweight nginx box. 

## Results
* Getting things pushed to ECS' Container Repository was easy - one extra step in my normal workflow that could easily be scripted.
*

### Scalability
If one wanted to have 10,000's of games of hangman operating concurrently (who doesn't?) containerized ECS could get you there quickly. *Testing info goes here*

### Using Postman and API documentation
