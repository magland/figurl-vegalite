#!/bin/bash

set -ex

TARGET=gs://figurl/vegalite-2

yarn build
gsutil -m cp -R ./build/* $TARGET/