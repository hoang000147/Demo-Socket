#!/bin/bash
sed "s/tagVersion/$1/g" socketdemo-deploy.yaml > socketdemo-deploy.yaml
