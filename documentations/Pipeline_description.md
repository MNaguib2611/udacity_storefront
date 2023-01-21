# This App  uses CircleCi as the Pipeline
- the pipeline is triggerred as son as new changes pushed to Github `main` branch

## The pipline setup
-  After the code is pushed to github , circleci installs `node` & `eb cli`
- In `./.circleci/config.yml`, `orbs` installs basic recipes and reproducible actions 

## The build step
- `npm run build` is called
- `npm run test` is called to make sure all unit tests are passing


## The deploy step
- `npm run build` is called
- `eb setenv name=$name` is used to set env variables of `AWS EBS` from the stored values in `Circleci enviroment variable`
- `npm run deploy` is called which in turns calls` eb deploy `command which takes all new changes and deploys them to `AWS EBS`


## Pipeline Diagram
This is the architecture of the application
<img src="./../deployment-images/Pipeline-diagram.png" alt="url" style="height: 400px; width:100%;"/>
