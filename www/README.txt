---
Log of happenings for WhereDat----

1. Weekend of 24th July worked on getting the gaainfo details into a JSON format....
Easy getting the google string containing the LatLng for each club in the county.
This needs to be parsed to pull out the values and generated an INSERT script.

Was hoping to use MOSA.SQLDB js functions to insert this into the database....proving trickier than origianlly thought.

No gain to be doing this work, get the database populated anywhich way....



2. Managed to Create the tables manually and INSERTed Galway, Clare and Limerick - just add a ; to the end of each line to Sqlite can run a load of INSERTS and commit them properly.
