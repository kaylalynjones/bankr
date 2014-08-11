#!/bin/bash

mongoimport --drop --db $1 --collection accounts --file ../../db/accounts.json --jsonArray
mongoimport --drop --db $1 --collection transfers --file ../../db/transfers.json --jsonArray
mongoimport --drop --db $1 --collection transactions --file ../../db/transactions.json --jsonArray
