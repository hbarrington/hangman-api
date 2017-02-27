# Hangman API
An API built on Express.js to service the [hangman paper and pencil guessing game](https://en.wikipedia.org/wiki/Hangman_(game)).

API specs available - https://documenter.getpostman.com/view/1162408/hangman-api/6YsWHS8

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c00339468a4d0c33422c)

UI built in React as a sample client.

Available for testing at http://hangman-api.com/

## How to Run
To just run the API:

    docker-compose up

To interact with the UI:

    docker-compose run -p 8080:8080 api /bin/bash

Inside the terminal you'll need to compile the react application:

    node_modules/webpack/bin/webpack.js
    node server.js

## Goals
The primary goal is exploration and refreshing myself on technologies I haven't used in 2 or 3 years.
* Explore AWS' Elastic Container Service (ECS) - I'm comfortable with kubernetes deployment pipelines but was curious about AWS container service. This is deployed and maintained on ECS.
* Compare Express.js from when I first worked with it in 2014 (at least a major version ago). The main questions were around simplified API and scalability.
* Explore D3.js - I've managed multiple developers as they've learned D3 for projects on our team. It can produce fantastic results but I've noticed a significant learning curve. I wanted to see for myself
* Play with React.js - I've used Ember a little and managed a *lot* of Ember projects. I like it a lot and wanted to compare with React (and eventually Angular). This seemed like a good project to try it on.
* Have an API/UI to play hangman on.

## Results
* Getting things pushed to ECS' Container Repository was easy - one extra step in my normal workflow that could easily be scripted.
* Configuring ECS was non-trivial but there was a lot of flexibility and power both in load balancing and scale-out.
  * Service Discovery within an ECS cloud isn't available OOTB. This is a big one if you're trying to host microservices. They suggest using a dedicated service ([Weave](https://www.weave.works/guides/service-discovery-and-load-balancing-with-weave-on-amazon-ecs-2/), etc.) or rolling your own using Route53 and a [go script](https://github.com/awslabs/service-discovery-ecs-dns). This is in sharp contrast to K8s who has this OOTB and it's easy to use. Instead I used an internal ELB for the service to work against and then passed the ELB's DNS name into the [task defintion via env variable](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions)

## Notes
* ECS requires lots of attributes for task definitions (their version of kubernetes' controllers) - a little bit of research gives a lot of power though
* Versioning (revisions) comes out of the box and the UI to create a new version is very accessible. I think this is a place where they beat K8s.
* *Adding multiple API servers and a load balancer is trivial (as you'd expect/want in a containerized environment)*
* ECS requires a decent amount of usage of other AWS services (EC2 obviously, ELB's in many cases, IAM roles, S3/storage, Route53 for service discovery probably etc.). No big surprise but will always be a negative when trying to avoid vendor lock-in.
* Task placement strategy is *very* cool. With options like AZ Balanced Spread and the ability to edit the criteria used in the strategy, there is some very nice scalability OOTB.

### Todos
* Refactor AJAX calls to not use jQuery and to be a easier to refactor per http://andrewhfarmer.com/react-ajax-best-practices/
* Right now static content (react) is hosted on the ECS containers and served by express. A CDN should be used instead and source content should be S3 or a lightweight nginx box.
* Implement a simple version of service discover - https://aws.amazon.com/blogs/compute/service-discovery-for-amazon-ecs-using-dns/)
  * Current implementation uses an internal classic ELB to give a DNS name that can then be passed to the docker image
* Provide a word length so users know how many letters are in the word or phrase


### Scalability
If one wanted to have 10,000's of games of hangman operating concurrently (who doesn't?) containerized ECS could get you there quickly.

Here's a test from loader showing 10,000 concurrent requests per second over a one minute period.
<a href="http://loader.io/reports/949459eb03a25209e693ff2037b374ce/results/0ad435385b3dede91dc6cded79192b9e" target="_blank" style="padding: 0 10px 10px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px;">View on loader.io</a>

A second test showing 6,000 concurrent requests for an API endpoint serviced by the database. Database scaling would need to be implemented for further optimization.
<a href="http://loader.io/reports/d0ebd801ce116e8f7ef7af988f2c7e0d/results/a8859ba9dad672a8df2050dce5bb8ef1" target="_blank" style="padding: 0 10px 10px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px;">View on loader.io</a>

### Using Postman and API documentation
TODO
