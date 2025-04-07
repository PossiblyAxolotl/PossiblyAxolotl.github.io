# Level file documentation
## File format
All files are stored as plain text as "filename.soko.txt". *(the soko part is unnecessary and simply there for identification)*

Levels are made by adding characters to the text file. Each line should be the same width, except for the last line which contains the level title.

Ex.:
```
.@.
...
OOO
...
#&#
Cool puzzle
```

## Level elements
Depending on the character you use, a different element will show up in the level.

|Tile|Character|Description|
|----|---------|-----------|
|Blank|.|Empty tile, place it in every blank space and ensure there aren't spaces at the end of lines.|
|Wall|#|Moving objects (player, blocks) can't pass through these.|
|Ice|%|Moving objects that land on ice will keep moving unless there is a wall or block ahead.|
|Block|O|Objects pushable by the player.|
|Target|X|All targets must be covered by blocks in order to finish the level.|
|Player|@|There can only be one player, movable with WASD/IJKL/Arrows|
|Exit|&|There should only be up to one exit. The player must be over the exit in order to finish the level.|

## Loading
In order to load a level simply drag and drop the text file over the game window.