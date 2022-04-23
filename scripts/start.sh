#!/bin/bash
cd /home/ubuntu/Pinch-Hitter-1/server

export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export S3_DOMAIN=$(aws ssm get-parameters --region ap-northeast-2 --names S3_DOMAIN --query Parameters[0].Value | sed 's/"//g')
export PORT=$(aws ssm get-parameters --region ap-northeast-2 --names PORT --query Parameters[0].Value | sed 's/"//g')
export NODE_ENV=$(aws ssm get-parameters --region ap-northeast-2 --names NODE_ENV --query Parameters[0].Value | sed 's/"//g')
export REACT_APP_SERVER_URI=$(aws ssm get-parameters --region ap-northeast-2 --names REACT_APP_SERVER_URI --query Parameters[0].Value | sed 's/"//g')
export PinchHitterUrl=$(aws ssm get-parameters --region ap-northeast-2 --names PinchHitterUrl --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start "npm run prod" --name app.js