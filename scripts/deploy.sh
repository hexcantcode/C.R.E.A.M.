#!/bin/bash

# Hedge Vault Deployment Script
set -e

echo "🚀 Deploying Hedge Vault to Solana..."

# Configuration
NETWORK=${1:-devnet}
PROGRAM_NAME="hedge_vault"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Solana CLI is installed
if ! command -v solana &> /dev/null; then
    echo -e "${RED}❌ Solana CLI not found. Please install it first.${NC}"
    exit 1
fi

# Check if Anchor is installed
if ! command -v anchor &> /dev/null; then
    echo -e "${RED}❌ Anchor CLI not found. Please install it first.${NC}"
    exit 1
fi

# Set cluster
echo -e "${YELLOW}Setting cluster to: ${NETWORK}${NC}"
solana config set --url $NETWORK

# Build the program
echo -e "${YELLOW}Building program...${NC}"
anchor build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

# Get program keypair
PROGRAM_KEYPAIR="./target/deploy/${PROGRAM_NAME}-keypair.json"

if [ ! -f "$PROGRAM_KEYPAIR" ]; then
    echo -e "${RED}❌ Program keypair not found!${NC}"
    exit 1
fi

# Deploy
echo -e "${YELLOW}Deploying to ${NETWORK}...${NC}"
anchor deploy --provider.cluster $NETWORK

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully deployed to ${NETWORK}!${NC}"
    
    # Display program ID
    PROGRAM_ID=$(solana address -k $PROGRAM_KEYPAIR)
    echo -e "${GREEN}Program ID: ${PROGRAM_ID}${NC}"
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Deployment complete!${NC}"

