#!/bin/bash

# List all deployments and filter for preview deployments
deployments=$(vercel ls ronnie-blog | grep -E 'https?://.*\.vercel\.app')

# Iterate over each deployment and remove it
for deployment in $deployments; do
  vercel remove $deployment
done
