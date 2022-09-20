#!/bin/bash

APP_NAMESPACE="prod"
APP_NAME="todo-app"

if [[ $(kubectl get namespaces | grep ${APP_NAMESPACE}) ]]; then
    echo "OK - Namespace called ${APP_NAMESPACE} already exist"
else
    kubectl create namespace ${APP_NAMESPACE}
fi

# Using built in codedeploy environmental variables to access the downloaded bundle
cd /opt/codedeploy-agent/deployment-root/${DEPLOYMENT_GROUP_ID}/${DEPLOYMENT_ID}/deployment-archive
pwd && ls -la

if [[ $(helm list -n ${APP_NAMESPACE} | grep ${APP_NAME}) ]]; then
    echo "${APP_NAME} exist in namespace ${APP_NAMESPACE}. Perfoming helm upgrade"
    helm upgrade ${APP_NAME} -n ${APP_NAMESPACE} .
else
    echo "${APP_NAME} does not exist in namespace ${APP_NAMESPACE}. Performing helm install"
    helm install ${APP_NAME} -n ${APP_NAMESPACE} .
fi
