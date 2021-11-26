#!/bin/bash

set -ex

TARGET=gs://figurl/vegalite-1

yarn build
gsutil -m cp -R ./build/* $TARGET/