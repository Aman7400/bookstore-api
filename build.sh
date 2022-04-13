#!/usr/bin/env bash

if test -d "dist";
then rm -r "dist" && tsc;
else tsc;
fi;