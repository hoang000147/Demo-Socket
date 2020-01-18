#!/bin/bash
sed "s/tagVersion/$1/g" socketdemo.yaml > socketdemo-deploy.yaml
